import {Request, Response, Express} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageController";


/**
 * The below class represents Like Message  which implements MessageControllerI interface.
 */
export default class MessageController implements MessageControllerI {
    app: Express;
    MessageDao: MessageDao;

    /**
     * Message Constructor
     * @param app Express
     * @param MessageDao MessageDao
     */
    constructor(app: Express, MessageDao: MessageDao) {
        this.app = app;
        this.MessageDao = MessageDao;
        this.app.post('/api/users/:uid1/messages/:uid2', this.createMessage);
        this.app.delete('/api/users/:uid1/messages/:uid2', this.deleteMessage);
        this.app.get("/api/users/:uid1/messages/:uid2",this.findMessageUser);
        this.app.get("/api/users/:uid/Messages",this.findMessage);
        this.app.get("/api/users/Messages/:uid",this.findMessageReceived);
        this.app.get("/api/users/:uid/recentMessages",this.recentMessage);

    }

    /**
     * The below method helps user to find a message.
     */
    findMessage=(req: Request, res: Response) =>
        this.MessageDao.findMessage( req.params.uid)
            .then(Message => res.json(Message));

    /**
     * The below method helps user to find received message.
     */
    findMessageReceived=(req: Request, res: Response) =>
        this.MessageDao.findMessage( req.params.uid)
            .then(Message => res.json(Message));

    /**
     * The below method helps user to find received message.
     */
    recentMessage=(req: Request, res: Response) =>
        this.MessageDao.recentMessage( req.params.uid)
            .then(Message => res.json(Message));

    findMessageUser=(req: Request, res: Response) =>
        this.MessageDao.findMessageUser( req.params.uid1,req.params.uid2)
            .then(Message => res.json(Message));

    /**
     * The below method helps user to create message.
     */
    createMessage=(req: Request, res: Response) =>
        this.MessageDao.createMessage( req.params.uid1,req.params.uid2,req.body.message)
            .then(Message => res.json(Message));


    /**
     * The below method helps user to delete a message.
     */
    deleteMessage = (req: Request, res: Response) =>
        this.MessageDao.deleteMessage( req.params.uid1,req.params.uid2)
            .then(Message => res.json(Message));

}

