import FollowModel from "../mongoose/FollowModel";
import Follow from "../models/Follow";
import FollowDaoI from "../interfaces/FollowDao";

import UserModel from "../mongoose/UserModel";
import User from "../models/User";
import { Schema } from "mongoose";

/**
 * The following class represents data access object for follow.
 */
export default class FollowDao implements FollowDaoI {

    /**
     * the below method is used to find user followers
     * @param uid represents user
     */
    async findFollowers(uid: string): Promise<Follow[]> {
        return await FollowModel.find({userFollowed: uid}).populate("userFollowing").exec();
    }

    /**
     * the below method helps to find recent followers.
     * @param uid user
     */
    async recentFollowers(uid: string): Promise<Follow[]> {
        return await FollowModel.find({userFollowed: uid}).where({followDate : { $gt:(Date.now()-60000)}}).populate("userFollowing").exec();
    }

    /**
     * The below method helps to find the users being followed by the first useer.
     * @param uid
     */
    async findFollow(uid: string): Promise<Follow[]> {
        return await FollowModel.find({userFollowing: uid}).populate("userFollowed").exec();
    }

    /**
     * The below method create followers
     * @param uid1 user1
     * @param uid2 user2
     */
    async createFollow(uid1: string, uid2: string): Promise<Follow> {
        return await FollowModel.create({userFollowed: uid2, userFollowing: uid1});
    }

    /**
     * The below method delete followers
     * @param uid1 user1
     * @param uid2 user2
     */
    async deleteFollow(uid1: string, uid2: string): Promise<any> {
        return await FollowModel.deleteOne({userFollowed: uid2, userFollowing: uid1})
    }
}

