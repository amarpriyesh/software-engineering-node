import LikeModel from "../mongoose/LikeModel";
import Like from "../models/Like";
import LikeDaoI from "../interfaces/LikeDao";

import UserModel from "../mongoose/UserModel";
import User from "../models/User";
import { Schema } from "mongoose";

/**
 * The following class represents like data access object.
 */
export default class LikeDao implements LikeDaoI {

    /**
     * The below method finds all the users who liked the tuit
     * @param tid tuit id.
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel
            .find({tuit: tid})
            .populate("likedBy")
            .exec();


    /**
     * The below method finds all th eliked tuits by the  user.
     * @param uid user
     */
    async findLike(uid: string): Promise<Like[]> {
        return await LikeModel.find({likedBy: uid}).populate("tuit").exec();
    }

    /**
     * The below method tags a like on the tuit by the user.
     * @param uid user
     * @param tid tuit
     */
    async createLike(uid: string, tid: string): Promise<Like> {
        return await LikeModel.create({likedBy: uid, tuit: tid});
    }

    /**
     * The below method helps user to unlike the tuit
     * @param uid user
     * @param tid tuit
     */
    async deleteLike(uid: string, tid: string): Promise<any> {
        return await LikeModel.deleteMany({likedBy: uid, tuit: tid})
    }
}

