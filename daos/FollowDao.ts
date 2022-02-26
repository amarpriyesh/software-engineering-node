import FollowModel from "../mongoose/FollowModel";
import Follow from "../models/Follow";
import FollowDaoI from "../interfaces/FollowDao";

import UserModel from "../mongoose/UserModel";
import User from "../models/User";
import { Schema } from "mongoose";

export default class FollowDao implements FollowDaoI {
    async findFollowers(uid: string): Promise<Follow[]> {
        return await FollowModel.find({userFollowed: uid}).populate("userFollowing").exec();
    }
    async recentFollowers(uid: string): Promise<Follow[]> {
        return await FollowModel.find({userFollowed: uid}).where({followDate : { $gt:(Date.now()-60000)}}).populate("userFollowing").exec();
    }

    async findFollow(uid: string): Promise<Follow[]> {
        return await FollowModel.find({userFollowing: uid}).populate("userFollowed").exec();
    }


    async createFollow(uid1: string, uid2: string): Promise<Follow> {
        return await FollowModel.create({userFollowed: uid2, userFollowing: uid1});
    }

    async deleteFollow(uid1: string, uid2: string): Promise<any> {
        return await FollowModel.deleteMany({userFollowed: uid2, userFollowing: uid1})
    }
}

