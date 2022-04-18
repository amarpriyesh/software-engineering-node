import Like from "../models/unlikes/Unlike";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface UnlikeDaoI {
    /**
     * The below method finds the user  who unliked the tuit.
     * @param tid
     */
    findAllUsersThatUnlikedTuit (tid: string): Promise<Like[]>;

    /**
     * The below method finds the tuit unliked by the user.
     * @param uid
     */
    findAllTuitsUnlikedByUser (uid: string): Promise<Like[]>;

    /**
     * The below method is used to remove an unliked tuit.
     * @param tid
     * @param uid
     */
    userRemoveUnikesTuit (tid: string, uid: string): Promise<any>;

    /**
     * The below method is used to create an unlike.
     * @param tid
     * @param uid
     */
   userUnikesTuit (tid: string, uid: string): Promise<Like>;
};