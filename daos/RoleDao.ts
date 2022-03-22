/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */

import Role from "../models/role/Role";
import RoleDaoI from "../interfaces/RoleDaoI";
import RoleModel from "../mongoose/roles/RoleModel";

/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao Private single instance of UserDao
 */
export default class RoleDao implements RoleDaoI{
    private static roleDao: RoleDao | null = null;
    public static getInstance = (): RoleDao => {
        if(RoleDao.roleDao === null) {
            RoleDao.roleDao = new RoleDao();
        }
        return RoleDao.roleDao;
    }
    private constructor() {}

    createRole = async (uid: string): Promise<Role> =>
        RoleModel.create({ user: uid});
    updateRole = async (uid: string, val: number): Promise<any> =>
        RoleModel.updateOne(
            {user: uid},
            {$set: {allowTuits:val}});

    findRole = async (uid: string): Promise<any> =>
        RoleModel.findOne({user: uid});

}