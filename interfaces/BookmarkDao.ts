import User from "../models/User";
import Follow from "../models/Bookmark";
import {Schema} from "mongoose";
import {Request, Response} from "express";
import Bookmark from "../models/Bookmark";

export default interface FollowDao {
    findBookmark(uid: string): Promise<Bookmark[]>;
    bookmark(uid1: string,uid2:string): Promise<Bookmark>;
    unBookmark(uid1: string, uid2: string): Promise<any>;
    recentBookmark(uid: string): Promise<Bookmark[]>;

}
