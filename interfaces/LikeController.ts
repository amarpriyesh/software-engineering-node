import {Request, Response} from "express";
import {Schema} from "mongoose";
import User from "../models/User";
import Like from "../models/Like";

export default interface LikeController {
    findAllUsersThatLikedTuit(req: Request, res: Response): void;
    findLike(req: Request, res: Response): void;
    createLike(req: Request, res: Response): void;
    deleteLike(req: Request, res: Response): void;

}