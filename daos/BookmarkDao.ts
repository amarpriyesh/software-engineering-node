import BookmarkModel from "../mongoose/BookmarkModel";
import Bookmark from "../models/Bookmark";
import BookmarkDaoI from "../interfaces/BookmarkDao";

import UserModel from "../mongoose/UserModel";
import User from "../models/User";
import { Schema } from "mongoose";

/**
 * The below class represents bookmarks data access object and implements methods of interface BookmarkDaoI.
 */
export default class BookmarkDao implements BookmarkDaoI {

    /**
     * The below method helps to find the book mark.
     * @param uid user id.
     */
    async findBookmark(uid: string): Promise<Bookmark[]> {
        return await BookmarkModel.find({bookmarkedBy: uid}).populate("bookmarkedTuit").exec();
    }

    /**
     * The below method helps to find the book mark.
     * @param uid user id.
     */
    async recentBookmark(uid: string): Promise<Bookmark[]> {
        return await BookmarkModel.find({bookmarkedBy: uid}).where({bookmarkDate: { $gt:(Date.now()-60000)}}).populate("bookmarkedTuit").exec();
    }

    /**
     * The below method creates bookmark
     * @param uid user
     * @param tid tuit
     */
    async bookmark(uid: string, tid: string): Promise<Bookmark> {
        return await BookmarkModel.create({bookmarkedBy: uid, bookmarkedTuit: tid});
    }

    /**
     * The below method deletes a bookmark
     * @param uid user id
     * @param tid tuit id
     */
    async unBookmark(uid: string, tid: string): Promise<any> {
        return await BookmarkModel.deleteMany({bookmarkedBy: uid, bookmarkedTuit: tid})
    }


}

