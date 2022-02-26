import {Request, Response} from "express";
import {Schema} from "mongoose";
import User from "../models/User";
import Follow from "../models/Follow";

export default interface FollowController {
    findFollowers(req: Request, res: Response): void;
    findFollow(req: Request, res: Response): void;
    createFollow(req: Request, res: Response): void;
    deleteFollow(req: Request, res: Response): void;
    recentFollowers(req: Request, res: Response): void;

}
