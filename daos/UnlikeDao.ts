import UnlikeDaoI from "../interfaces/UnlikeDaoI";
import UnlikeModel from "../mongoose/dislikes/UnlikeModel";
import Unlike from "../models/unlikes/Unlike";
import {Request, Response} from "express";
export default class UnlikeDao implements UnlikeDaoI {
    private static unlikeDao: UnlikeDao | null = null;
    public static getInstance = (): UnlikeDao => {
        if(UnlikeDao.unlikeDao === null) {
            UnlikeDao.unlikeDao = new UnlikeDao();
        }
        return UnlikeDao.unlikeDao;
    }
    private constructor() {}

    findAllUsersThatUnlikedTuit = async (tid: string): Promise<Unlike[]> =>
        UnlikeModel
            .find({tuit: tid})
            .populate("unlikedBy")
            .exec();

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
    userUnikesTuit = async (uid: string, tid: string): Promise<any> =>
        UnlikeModel.create({tuit: tid, unlikedBy: uid});

    findUserUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        UnlikeModel.findOne({tuit: tid, unlikedBy: uid});

    userRemoveUnikesTuit = async (uid: string, tid: string): Promise<any> =>
        UnlikeModel.deleteOne({tuit: tid, unlikedBy: uid});
    countHowManyUnLikedTuit = async (tid: string): Promise<any> =>
        UnlikeModel.count({tuit: tid});
}