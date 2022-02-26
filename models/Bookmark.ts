import User from "./User";
import Tuit from  "./Tuit";

export default interface Bookmark {
    bookmarkedTuit: Tuit,
    bookmarkedBy: User,
    bookmarkDate: Date,
};