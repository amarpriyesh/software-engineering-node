/**
 * @file Controller RESTful Web service API for likes resource
 */
import {Express, Request, Response} from "express";
import UnlikeDao from "../daos/UnlikeDao";
import LikeDao from "../daos/LikeDao";
import UnlikeControllerI from "../interfaces/UnlikeControllerI";
import TuitDao from "../daos/TuitDao";

/**
 * @class TuitController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/likes to retrieve all the tuits liked by a user
 *     </li>
 *     <li>GET /api/tuits/:tid/likes to retrieve all users that liked a tuit
 *     </li>
 *     <li>POST /api/users/:uid/likes/:tid to record that a user likes a tuit
 *     </li>
 *     <li>DELETE /api/users/:uid/unlikes/:tid to record that a user
 *     no londer likes a tuit</li>
 * </ul>
 * @property {UnlikeDao} UnlikeDao Singleton DAO implementing likes CRUD operations
 * @property {LikeController} LikeController Singleton controller implementing
 * RESTful Web service API
 */
export default class DislikeController implements UnlikeControllerI {
    private static UnlikeDao: UnlikeDao = UnlikeDao.getInstance();
    private static tuitDao: TuitDao = TuitDao.getInstance();
    private static dislikeController: DislikeController | null = null;
    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return TuitController
     */
    public static getInstance = (app: Express): DislikeController => {
        if(DislikeController.dislikeController === null) {
            DislikeController.dislikeController = new DislikeController();
            app.get("/api/users/:uid/dislikes", DislikeController.dislikeController.findAllTuitsUnlikedByUser);
            app.get("/api/tuits/:tid/dislikes", DislikeController.dislikeController.findAllUsersThatUnlikedTuit);
            app.put("/api/users/:uid/dislikes/:tid", DislikeController.dislikeController.userTogglesTuitUnlikes);
        }
        return DislikeController.dislikeController;
    }

    private constructor() {}

    /**
     * Retrieves all users that liked a tuit from the database
     * @param {Request} req Represents request from client, including the path
     * parameter tid representing the liked tuit
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the user objects
     */


findAllUsersThatUnlikedTuit = (req: Request, res: Response) =>
    DislikeController.UnlikeDao.findAllUsersThatUnlikedTuit(req.params.tid)
            .then(likes => res.json(likes));

    /**
     * Retrieves all tuits liked by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user liked the tuits
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the tuit objects that were liked
     */
    findAllTuitsUnlikedByUser
= (req: Request, res: Response) => {
        const uid = req.params.uid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;

       DislikeController.UnlikeDao.findAllTuitsUnlikedByUser(userId).then(likes => {
                const likesNonNullTuits = likes.filter(like => like.tuit);
                const tuitsFromLikes = likesNonNullTuits.map(like => like.tuit);
                res.json(tuitsFromLikes);
            });
    }


    /**
     * @param {Request} req Represents request from client, including the
     * path parameters uid and tid representing the user that is liking the tuit
     * and the tuit being liked
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new likes that was inserted in the
     * database
     */
    userTogglesTuitUnlikes = async (req: Request, res: Response) => {
        const UnlikeDao = DislikeController.UnlikeDao;
        const tuitDao = DislikeController.tuitDao;
        const likeDao = LikeDao.getInstance();
        const uid = req.params.uid;
        const tid = req.params.tid;
        // @ts-ignore
        const profile = req.session['profile'];
        const userId = uid === "me" && profile ?
            profile._id : uid;
        try {
            const userAlreadyUnLikedTuit = await UnlikeDao.findUserUnlikesTuit(userId, tid);
            const howManyUnLikedTuit = await UnlikeDao.countHowManyUnLikedTuit(tid);
            const userAlreadyLikedTuit = await likeDao.findUserLikesTuit(userId, tid);
            const howManyLikedTuit = await likeDao.countHowManyLikedTuit(tid);
            let tuit = await tuitDao.findTuitById(tid);
            if (userAlreadyUnLikedTuit) {
                await UnlikeDao.userRemoveUnikesTuit(userId, tid);
                tuit.stats.dislikes = howManyUnLikedTuit - 1;
            } else {
                if(userAlreadyLikedTuit) {
                    await likeDao.userUnlikesTuit(userId, tid);
                    tuit.stats.likes = howManyLikedTuit - 1;
                }
                await DislikeController.UnlikeDao.userUnikesTuit(userId, tid);
                tuit.stats.dislikes = howManyUnLikedTuit + 1;
            };
            await tuitDao.updateLikes(tid, tuit.stats);
            res.sendStatus(200);
        } catch (e) {
            res.sendStatus(404);
        }
    }
};