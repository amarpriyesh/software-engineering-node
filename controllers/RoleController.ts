/**
 * @file Controller RESTful Web service API for tuits resource
 */
import RoleDao from "../daos/RoleDao";
import Role from "../models/role/Role";
import {Express, Request, Response} from "express";
import RoleControllerI from "../interfaces/RoleControllerI";

/**
 * @class TuitController Implements RESTful Web service API for tuits resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/tuits to create a new tuit instance for
 *     a given user</li>
 *     <li>GET /api/tuits to retrieve all the tuit instances</li>
 *     <li>GET /api/tuits/:tid to retrieve a particular tuit instances</li>
 *     <li>GET /api/users/:uid/tuits to retrieve tuits for a given user </li>
 *     <li>PUT /api/tuits/:tid to modify an individual tuit instance </li>
 *     <li>DELETE /api/tuits/:tid to remove a particular tuit instance</li>
 * </ul>
 * @property {RoleDao} RoleDao Singleton DAO implementing tuit CRUD operations
 * @property {TuitController} tuitController Singleton controller implementing
 * RESTful Web service API
 */
export default class RoleController implements RoleControllerI {
    private static RoleDao: RoleDao = RoleDao.getInstance();
    private static roleController: RoleController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return TuitController
     */
    public static getInstance = (app: Express): RoleController => {
        if(RoleController.roleController === null) {
            RoleController.roleController = new RoleController();

            app.post("/api/roles/:uid", RoleController.roleController.createRole);
            app.put("/api/roles/:uid/:val1", RoleController.roleController.updateRole);

        }
       return RoleController.roleController;
    }

    private constructor() {}


    /**
     * @param {Request} req Represents request from client, including body
     * containing the JSON object for the new tuit to be inserted in the
     * database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new tuit that was inserted in the
     * database
     */
    createRole = (req: Request, res: Response) =>
        RoleController.RoleDao.createRole(req.params.uid)
            .then((role: Role) => res.json(role));

    /**
     * @param {Request} req Represents request from client, including path
     * parameter tid identifying the primary key of the tuit to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a tuit was successful or not
     */
    updateRole = (req: Request, res: Response) =>
        RoleController.RoleDao.updateRole(req.params.uid, Number(req.params.val1))
            .then((status) => res.send(status));


};
