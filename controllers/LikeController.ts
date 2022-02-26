import {Request, Response, Express} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import LikeDao from "../daos/LikeDao";
import LikeControllerI from "../interfaces/LikeController";

export default class LikeController implements LikeControllerI {
    app: Express;
    LikeDao: LikeDao;

    constructor(app: Express, LikeDao: LikeDao) {
        this.app = app;
        this.LikeDao = LikeDao;
        this.app.post('/users/:uid/likes/:tid', this.createLike);
        this.app.delete('/users/:uid/likes/:tid', this.deleteLike);
        this.app.get("/users/:uid/likes",this.findLike);
        this.app.get("/tuits/:tid/likes",this.findAllUsersThatLikedTuit);

    }

    findAllUsersThatLikedTuit=(req: Request, res: Response) =>
        this.LikeDao.findAllUsersThatLikedTuit( req.params.tid)
            .then(Like => res.json(Like));


    findLike=(req: Request, res: Response) =>
        this.LikeDao.findLike( req.params.uid)
            .then(Like => res.json(Like));


    createLike=(req: Request, res: Response) =>
        this.LikeDao.createLike( req.params.uid,req.params.tid)
            .then(Like => res.json(Like));




    deleteLike = (req: Request, res: Response) =>
        this.LikeDao.deleteLike( req.params.uid,req.params.tid)
            .then(Like => res.json(Like));

}

