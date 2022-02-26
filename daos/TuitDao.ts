import TuitModel from "../mongoose/TuitModel";
import Tuit from "../models/Tuit";
import TuitDaoI from "../interfaces/TuitDao";
import UserModel from "../mongoose/UserModel";
import User from "../models/User";


/**
 * The following class represents the tuit data access object.
 */
export default class TuitDao implements TuitDaoI{


    async findAllTuits  (): Promise<any> {
        return await TuitModel.find()};
   async  findTuitsByUser  (uid: string): Promise<any> {
       return await  TuitModel.find({postedBy: uid})};

   async findTuitById (uid: string): Promise<any> {
       return await  TuitModel.findById(uid)
            .populate("postedBy")
            .exec()};
    async createTuit ( uid: string,tuit: string): Promise<Tuit> {
    return await TuitModel.create({postedBy: uid , tuit:tuit})};

    async updateTuit  (uid: string, tuit: Tuit): Promise<any>{
        return await   TuitModel.updateOne(
            {_id: uid},
            {$set: tuit})};
    async deleteTuit  (uid: string): Promise<any> {
        return await  TuitModel.deleteOne({_id: uid})};
}
