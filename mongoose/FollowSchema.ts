import mongoose, {Schema} from "mongoose";
import Follow from "../models/Follow";

/**
 *The following object defines follow schema to store attributes related to follow relationship.
 */
const FollowSchema = new mongoose.Schema<Follow>({
    userFollowed: {type: Schema.Types.ObjectId, ref: "UserModel"},
    userFollowing: {type: Schema.Types.ObjectId, ref: "UserModel"},
    followDate: {type: Date, default: Date.now},
}, {collection: "follows"});
export default FollowSchema;