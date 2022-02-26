import MessageModel from "../mongoose/MessageModel";
import Message from "../models/Message";
import MessageDaoI from "../interfaces/MessageDao";

import UserModel from "../mongoose/UserModel";
import User from "../models/User";
import { Schema } from "mongoose";

/**
 * The following class represents message data access object.
 */
export default class MessageDao implements MessageDaoI {

    /**
     * The below method helps user to find a message sent to another user.
     */
    async findMessageUser(uid1: string, uid2:string): Promise<Message[]> {
        return await MessageModel.find({from: uid1, to : uid2}).populate("message").exec();
    }

    /**
     * The below method helps user to find a message sent by a user.
     */
    async findMessage(uid: string): Promise<Message[]> {
        return await MessageModel.find({from: uid}).populate("message").exec();
    }

    /**
     * The below method helps user to find a message that has been received.
     */
    async findMessageReceived(uid: string): Promise<Message[]> {
        return await MessageModel.find({to: uid}).populate("message").exec();
    }

    /**
     * The below method helps user to find a recent messages.
     */
    async recentMessage(uid: string): Promise<Message[]> {
        return await MessageModel.find({from: uid}).where({MessageDate : { $gt:(Date.now()-60000)}}).populate("userMessageing").exec();
    }


    /**
     * The below method helps user to create messages.
     */
    async createMessage(uid1: string, uid2: string, message: string): Promise<Message> {
        return await MessageModel.create({to: uid2, from: uid1, message: message });
    }

    /**
     * The below method helps user to delete messages.
     */
    async deleteMessage(uid1: string, uid2: string): Promise<any> {
        return await MessageModel.deleteMany({from: uid1, to: uid2})
    }
}