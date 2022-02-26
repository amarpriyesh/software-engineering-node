import MessageModel from "../mongoose/MessageModel";
import Message from "../models/Message";
import MessageDaoI from "../interfaces/MessageDao";

import UserModel from "../mongoose/UserModel";
import User from "../models/User";
import { Schema } from "mongoose";

export default class MessageDao implements MessageDaoI {
    async findMessageUser(uid1: string, uid2:string): Promise<Message[]> {
        return await MessageModel.find({from: uid1, to : uid2}).populate("message").exec();
    }
    async findMessage(uid: string): Promise<Message[]> {
        return await MessageModel.find({from: uid}).populate("message").exec();
    }
    async recentMessage(uid: string): Promise<Message[]> {
        return await MessageModel.find({from: uid}).where({MessageDate : { $gt:(Date.now()-60000)}}).populate("userMessageing").exec();
    }

    async createMessage(uid1: string, uid2: string, message: string): Promise<Message> {
        return await MessageModel.create({to: uid2, from: uid1, message: message });
    }

    async deleteMessage(uid1: string, uid2: string): Promise<any> {
        return await MessageModel.deleteMany({from: uid1, to: uid2})
    }
}