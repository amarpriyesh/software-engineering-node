import mongoose, {Schema} from "mongoose";
import Bookmark from "../models/Bookmark";

/**
 * @typedef BookmarkSchema Represents bookmarks
 * @property bookmarkedTuit tweets that have been book marked
 * @property bookmarkedBy represents the user
 * @property bookmarkDate  reprents date.
 */
const BookmarkSchema = new mongoose.Schema<Bookmark>({
    bookmarkedTuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    bookmarkedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    bookmarkDate: {type: Date, default: Date.now},
}, {collection: "bookmarks"});
export default BookmarkSchema;