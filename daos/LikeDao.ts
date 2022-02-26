import LikeModel from "../mongoose/LikeModel";
import Like from "../models/Like";
import LikeDaoI from "../interfaces/LikeDao";

import UserModel from "../mongoose/UserModel";
import User from "../models/User";
import { Schema } from "mongoose";

export default class LikeDao implements LikeDaoI {
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();


    async findLike(uid: string): Promise<Like[]> {
        return await LikeModel.find({likedBy: uid}).populate("tuit").exec();
    }


    async createLike(uid: string, tid: string): Promise<Like> {
        return await LikeModel.create({likedBy: uid, tuit: tid});
    }

    async deleteLike(uid: string, tid: string): Promise<any> {
        return await LikeModel.deleteMany({likedBy: uid, tuit: tid})
    }
}

