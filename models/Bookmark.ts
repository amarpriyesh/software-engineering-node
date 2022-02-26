import User from "./User";
import Tuit from  "./Tuit";

/**
 * The below bookmark model.
 */
export default interface Bookmark {
    bookmarkedTuit: Tuit,
    bookmarkedBy: User,
    bookmarkDate: Date,
};