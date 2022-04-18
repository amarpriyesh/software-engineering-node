import {Request, Response} from "express";

export default interface UnlikeControllerI {
    /**
     * The below method is used to find all users that unliked the tuit.
     * @param req
     * @param res
     */
    findAllUsersThatUnlikedTuit (req: Request, res: Response): void;

    /**
     * The below method finds all tuits unliked by the user.
     * @param req
     * @param res
     */
    findAllTuitsUnlikedByUser (req: Request, res: Response): void;

    /**
     * The below method toggles the unlike button.
     * @param req
     * @param res
     */
    userTogglesTuitUnlikes (req: Request, res: Response): void;
};