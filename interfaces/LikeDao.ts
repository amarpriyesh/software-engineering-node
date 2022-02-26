import User from "../models/User";
import Like from "../models/Like";
import {Schema} from "mongoose";

export default interface LikeDao {
    findAllUsersThatLikedTuit(tid: string): Promise<Like[]>;
    findLike(uid: string): Promise<Like[]>;
    createLike(uid1: string,uid2:string): Promise<Like>;
    deleteLike(uid1: string, uid2: string): Promise<any>;

}
