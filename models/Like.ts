import User from "./User";
import Tuit from "./Tuit";

/**
 * The below represents like model and structure.
 */
export default interface Like {
    tuit: Tuit,
    likedBy: User,
};