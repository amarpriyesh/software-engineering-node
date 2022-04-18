import UnlikeDaoI from "../interfaces/UnlikeDaoI";
import UnlikeModel from "../mongoose/dislikes/UnlikeModel";
import Unlike from "../models/unlikes/Unlike";
import {Request, Response} from "express";

/**
 * Defining unlike Dao
 */
export default class UnlikeDao implements UnlikeDaoI {
    private static unlikeDao: UnlikeDao | null = null;
    public static getInstance = (): UnlikeDao => {
        if(UnlikeDao.unlikeDao === null) {
            UnlikeDao.unlikeDao = new UnlikeDao();
        }
        return UnlikeDao.unlikeDao;
    }
    private constructor() {}

    /**
     * The below function finds all users that unliked the tuit.
     * @param tid
     */
    findAllUsersThatUnlikedTuit = async (tid: string): Promise<Unlike[]> =>
        UnlikeModel
            .find({tuit: tid})
            .populate("unlikedBy")
            .exec();

    /**
     * The below function finds all tuits unliked by the user.
     * @param uid
     */
    findAllTuitsUnlikedByUser = async (uid: string): Promise<Unlike[]> =>
        UnlikeModel
            .find({likedBy: uid})
            .populate({
                path: "tuit",
                populate: {
                    path: "postedBy"
                }
            })
            .exec();
    /**
     * The below method is used for a user to unlike a tuit.
     * @param uid
     * @param tid
     */
    userUnikesTuit = async (uid: string, tid: string): Promise<any> =>
        UnlikeModel.create({tuit: tid, unlikedBy: uid});

    /**
     * The below method finds the user that unliked the tuit.
     * @param uid
     * @param tid
     */
    findUserUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        UnlikeModel.findOne({tuit: tid, unlikedBy: uid});

    /**
     * User deletes unlike tuit record.
     * @param uid
     * @param tid
     */
    userRemoveUnikesTuit = async (uid: string, tid: string): Promise<any> =>
        UnlikeModel.deleteOne({tuit: tid, unlikedBy: uid});

    /**
     * The below method counts the unliked tuit.
     * @param tid
     */
    countHowManyUnLikedTuit = async (tid: string): Promise<any> =>
        UnlikeModel.count({tuit: tid});
}