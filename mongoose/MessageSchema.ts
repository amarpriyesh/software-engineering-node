import mongoose, {Schema} from "mongoose";
import Message from "../models/Message";

/**
 * @typedef MessageSchema Represents followers
 * @property from represents the user
 * @property to the user
 * @property message represents messages
 * @property sentOn reprents date of following.
 */
const MessageSchema = new mongoose.Schema<Message>({
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    from: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: {type: Date, default: Date.now},
    message: {type: String, default: ""},
}, {collection: "messages"});
export default MessageSchema;