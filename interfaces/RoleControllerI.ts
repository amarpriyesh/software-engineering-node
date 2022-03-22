import {Request, Response} from "express";
import Role from "../models/role/Role";

export default interface RoleControllerI {
    createRole (req: Request, res: Response): void;
    updateRole (req: Request, res: Response): void;
};