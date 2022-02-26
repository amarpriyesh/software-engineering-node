import mongoose, {Schema} from "mongoose";
import Follow from "../models/Follow";

/**
 * @typedef FollowSchema Represents followers
 * @property userFollowing represents the user
 * @property userFollowed represents the user
 * @property followDate  reprents date of following.
 */
const FollowSchema = new mongoose.Schema<Follow>({
    userFollowed: {type: Schema.Types.ObjectId, ref: "UserModel"},
    userFollowing: {type: Schema.Types.ObjectId, ref: "UserModel"},
    followDate: {type: Date, default: Date.now},
}, {collection: "follows"});
export default FollowSchema;
