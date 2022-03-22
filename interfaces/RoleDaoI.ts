import Role from "../models/role/Role";

/**
 * @file Declares API for Tuits related data access object methods
 */
export default interface RoleDaoI {

    createRole (uid: string): Promise<Role>;
    updateRole (uid: string,val: number): Promise<any>;

};