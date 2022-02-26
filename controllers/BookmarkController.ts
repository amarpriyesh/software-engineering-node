import {Request, Response, Express} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarkControllerI from "../interfaces/BookmarkController";

export default class BookmarkController implements BookmarkControllerI {
    app: Express;
    bookmarkDao: BookmarkDao;

    constructor(app: Express, bookmarkDao: BookmarkDao) {
        this.app = app;
        this.bookmarkDao = bookmarkDao;
        this.app.post('/api/users/:uid/bookmarks/:tid', this.bookmark);
        this.app.delete('/api/users/:uid/unBookmarks/:tid', this.unBookmark);
        this.app.get("/api/users/:uid/bookmarks",this.findBookmark);
        this.app.get("/api/users/:uid/recentBookmarks",this.recentBookmark);

    }



    findBookmark=(req: Request, res: Response) =>
        this.bookmarkDao.findBookmark(req.params.uid)
            .then(follow => res.json(follow));

    recentBookmark=(req: Request, res: Response) =>
        this.bookmarkDao.recentBookmark( req.params.uid)
            .then(follow => res.json(follow));

    bookmark=(req: Request, res: Response) =>
        this.bookmarkDao.bookmark( req.params.uid,req.params.tid)
            .then(follow => res.json(follow));


    unBookmark=(req: Request, res: Response) =>
        this.bookmarkDao.unBookmark( req.params.uid,req.params.tid)
            .then(follow => res.json(follow));




}

