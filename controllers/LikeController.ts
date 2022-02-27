import {Request, Response, Express} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import LikeDao from "../daos/LikeDao";
import LikeControllerI from "../interfaces/LikeController";


/**
 * The below class represents Like Controller  which implements LikeControllerI interface.
 */
export default class LikeController implements LikeControllerI {
    app: Express;
    LikeDao: LikeDao;

    /**
     * LikeController constructor
     * @param app Express
     * @param LikeDao like object.
     */
    constructor(app: Express, LikeDao: LikeDao) {
        this.app = app;
        this.LikeDao = LikeDao;
        this.app.post('/api/users/:uid/likes/:tid', this.createLike);
        this.app.delete('/api/users/:uid/likes/:tid', this.deleteLike);
        this.app.get("/api/users/:uid/likes",this.findLike);
        this.app.get("/api/tuits/:tid/likes",this.findAllUsersThatLikedTuit);

    }

    /**
     * The below method helps user to find users who liked a tuit.
     */
    findAllUsersThatLikedTuit=(req: Request, res: Response) =>
        this.LikeDao.findAllUsersThatLikedTuit( req.params.tid)
            .then(Like => res.json(Like));


    /**
     * The below method helps user to find  liked a tuit.
     */
    findLike=(req: Request, res: Response) =>
        this.LikeDao.findLike( req.params.uid)
            .then(Like => res.json(Like));


    /**
     * The below method helps user to like a tuit.
     */
    createLike=(req: Request, res: Response) =>
        this.LikeDao.createLike( req.params.uid,req.params.tid)
            .then(Like => res.json(Like));



    /**
     * The below method helps user to delete a tuit.
     */
    deleteLike = (req: Request, res: Response) =>
        this.LikeDao.deleteLike( req.params.uid,req.params.tid)
            .then(Like => res.json(Like));

}

