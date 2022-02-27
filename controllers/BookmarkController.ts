import {Request, Response, Express} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkController";

/**
 * The below clas srepresents bookmark controller which implements BookmarkControllerI interface.
 */
export default class BookmarkController implements BookmarkControllerI {
    app: Express;
    bookmarkDao: BookmarkDao;

    /**
     * The below represents BookmarkController constructor.
     * @param app Express
     * @param bookmarkDao Bookmark data access object.
     */
    constructor(app: Express, bookmarkDao: BookmarkDao) {
        this.app = app;
        this.bookmarkDao = bookmarkDao;
        this.app.post('/api/users/:uid/bookmarks/:tid', this.bookmark);
        this.app.delete('/api/users/:uid/unBookmarks/:tid', this.unBookmark);
        this.app.get("/api/users/:uid/bookmarks",this.findBookmark);
        this.app.get("/api/users/:uid/recentBookmarks",this.recentBookmark);

    }


    /**
     * The below method helps to find the book mark.
     * @param uid user id.
     */
    findBookmark=(req: Request, res: Response) =>
        this.bookmarkDao.findBookmark(req.params.uid)
            .then(follow => res.json(follow));
    /**
     * The below method helps to find the recent book mark.
     * @param uid user id.
     */
    recentBookmark=(req: Request, res: Response) =>
        this.bookmarkDao.recentBookmark( req.params.uid)
            .then(follow => res.json(follow));

    /**
     * The below method helps to  create book mark.
     */
    bookmark=(req: Request, res: Response) =>
        this.bookmarkDao.bookmark( req.params.uid,req.params.tid)
            .then(follow => res.json(follow));


    /**
     * The below method helps to  delete book mark.
     */
    unBookmark=(req: Request, res: Response) =>
        this.bookmarkDao.unBookmark( req.params.uid,req.params.tid)
            .then(follow => res.json(follow));




}

