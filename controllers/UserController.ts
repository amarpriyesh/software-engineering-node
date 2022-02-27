import {Request, Response, Express} from "express";
import UserDao from "../daos/UserDao";
import UserControllerI from "../interfaces/UserController";

/**
 *
 * The below class represents  User  Controller  which implements UserControllerI interface.
 *
 */
export default class UserController implements UserControllerI {
    app: Express;
    userDao: UserDao;

    /**
     * The below represents UserController
     * @param app Express
     * @param userDao UserDao
     */
    constructor(app: Express, userDao: UserDao) {
        this.app = app;
        this.userDao = userDao;
        this.app.get('/api/users', this.findAllUsers);
        this.app.get('/api/users/:userid', this.findUserById);
        this.app.post('/api/users', this.createUser);
        this.app.delete('/api/users/:userid', this.deleteUser);
        this.app.put('/api/users/:userid', this.updateUser);
    }

    /**
     * The below method helps to find all the users.
     */
    findAllUsers = (req: Request, res: Response) =>
        this.userDao.findAllUsers()
            .then(users => res.json(users));

    /**
     * The below method helps to find users by user id.
     */
    findUserById = (req: Request, res: Response) =>
        this.userDao.findUserById(req.params.userid)
            .then(user => res.json(user));

    /**
     * The below method helps to create a user.
     */
    createUser = (req: Request, res: Response) =>
        this.userDao.createUser(req.body)
            .then(user => res.json(user));

    /**
     * The below method helps to delete a user.
     */
    deleteUser = (req: Request, res: Response) =>
        this.userDao.deleteUser(req.params.userid)
            .then(status => res.json(status));

    /**
     * The below method helps to update a user.
     */
    updateUser = (req: Request, res: Response) =>
        this.userDao.updateUser(req.params.userid, req.body)
            .then(status => res.json(status));
}
