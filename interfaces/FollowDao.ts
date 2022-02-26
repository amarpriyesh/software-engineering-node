import User from "../models/User";
import Follow from "../models/Follow";
import {Schema} from "mongoose";

export default interface FollowDao {
    findFollowers(uid: string): Promise<Follow[]>;
    findFollow(uid: string): Promise<Follow[]>;
    createFollow(uid1: string,uid2:string): Promise<Follow>;
    deleteFollow(uid1: string, uid2: string): Promise<any>;
    recentFollowers(uid: string): Promise<Follow[]>;
}
