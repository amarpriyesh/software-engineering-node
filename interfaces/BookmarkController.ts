import {Request, Response} from "express";
import {Schema} from "mongoose";
import User from "../models/User";
import Follow from "../models/Bookmark";

export default interface FollowController {
    findBookmark(req: Request, res: Response): void;
    bookmark(req: Request, res: Response): void;
    unBookmark(req: Request, res: Response): void;
    recentBookmark(req: Request, res: Response): void;

}
