import {Request, Response} from "express";
import {Schema} from "mongoose";
import User from "../models/User";
import Message from "../models/Message";

export default interface MessageController {
    findMessage(req: Request, res: Response): void;
    findMessageReceived(req: Request, res: Response): void;
    findMessageUser(req: Request, res: Response): void;
    createMessage(req: Request, res: Response): void;
    deleteMessage(req: Request, res: Response): void;
    recentMessage(req: Request, res: Response): void;

}
