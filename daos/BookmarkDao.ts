import BookmarkModel from "../mongoose/BookmarkModel";
import Bookmark from "../models/Bookmark";
import BookmarkDaoI from "../interfaces/BookmarkDao";

import UserModel from "../mongoose/UserModel";
import User from "../models/User";
import { Schema } from "mongoose";

export default class BookmarkDao implements BookmarkDaoI {
    async findBookmark(uid: string): Promise<Bookmark[]> {
        return await BookmarkModel.find({bookmarkedBy: uid}).populate("bookmarkedTuit").exec();
    }
    async recentBookmark(uid: string): Promise<Bookmark[]> {
        return await BookmarkModel.find({bookmarkedBy: uid}).where({bookmarkDate: { $gt:(Date.now()-60000)}}).populate("bookmarkedTuit").exec();
    }

    async bookmark(uid: string, tid: string): Promise<Bookmark> {
        return await BookmarkModel.create({bookmarkedBy: uid, bookmarkedTuit: tid});
    }

    async unBookmark(uid: string, tid: string): Promise<any> {
        return await BookmarkModel.deleteMany({bookmarkedBy: uid, bookmarkedTuit: tid})
    }


}

