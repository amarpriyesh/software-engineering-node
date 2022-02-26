import mongoose, {Schema} from "mongoose";
import Like from "../models/Like";

/**
 * @typedef LikeSchema Represents followers
 * @property tuit represents tuit
 * @property likedBy represents the user
 * @property followDate  reprents date of following.
 */
const LikeSchema = new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "likes"});
export default LikeSchema;