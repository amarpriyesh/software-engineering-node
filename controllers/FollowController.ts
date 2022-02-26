import {Request, Response, Express} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowController";


/**
 * The below clas srepresents Follow Controller  which implements FollowControllerI interface.
 */
export default class FollowController implements FollowControllerI {
    app: Express;
    followDao: FollowDao;

    constructor(app: Express, followDao: FollowDao) {
        this.app = app;
        this.followDao = followDao;
        this.app.post('/api/users/:uid1/follows/:uid2', this.createFollow);
        this.app.delete('/api/users/:uid1/follows/:uid2', this.deleteFollow);
        this.app.get("/api/users/:uid/follows",this.findFollow);
        this.app.get("/api/users/:uid/followers",this.findFollowers);
        this.app.get("/api/users/:uid/recentFollowers",this.recentFollowers);

    }

    findFollowers=(req: Request, res: Response) =>
    this.followDao.findFollowers( req.params.uid)
.then(follow => res.json(follow));

    recentFollowers=(req: Request, res: Response) =>
        this.followDao.recentFollowers( req.params.uid)
            .then(follow => res.json(follow));

    findFollow=(req: Request, res: Response) =>
        this.followDao.findFollow( req.params.uid)
            .then(follow => res.json(follow));


    createFollow=(req: Request, res: Response) =>
        this.followDao.createFollow( req.params.uid1,req.params.uid2)
            .then(follow => res.json(follow));




    deleteFollow = (req: Request, res: Response) =>
        this.followDao.deleteFollow( req.params.uid1,req.params.uid2)
            .then(follow => res.json(follow));

}

