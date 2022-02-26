import User from "../models/User";
import UserModel from "../mongoose/UserModel";
import UserDaoI from "../interfaces/UserDao";



/**
 * The following class represents the user data access object.
 */
export default class UserDao implements UserDaoI {

    /**
     * The below method help to find  all the users.
     */
    async findAllUsers(): Promise<User[]> {
        return await UserModel.find();
    }

    /**
     * The below method help to find user by user id.
     */
    async findUserById(userid: string): Promise<any> {
        return await UserModel.findById({_id: userid});
    }

    /**
     * The below method helps to create new user.
     */
    async createUser(user: User): Promise<any> {
        return await UserModel.create(user);
    }

    /**
     * The below method helps to delete a  user.
     */
    async deleteUser(uid: string):  Promise<any> {
        return await UserModel.deleteOne({_id: uid});
    }
    async updateUser(uid: string, user: User): Promise<any> {
        return await UserModel.updateOne({_id: uid}, {$set: user});
    }
}
