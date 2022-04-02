import Like from "../models/unlikes/Unlike";

/**
 * @file Declares API for Likes related data access object methods
 */
export default interface UnlikeDaoI {
    findAllUsersThatUnlikedTuit (tid: string): Promise<Like[]>;
    findAllTuitsUnlikedByUser (uid: string): Promise<Like[]>;
    userRemoveUnikesTuit (tid: string, uid: string): Promise<any>;
   userUnikesTuit (tid: string, uid: string): Promise<Like>;
};