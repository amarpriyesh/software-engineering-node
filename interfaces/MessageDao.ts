import User from "../models/User";
import Message from "../models/Message";
import {Schema} from "mongoose";

export default interface MessageDao {
    findMessage(uid: string): Promise<Message[]>;
    findMessageReceived(uid: string): Promise<Message[]>;
    findMessageUser(uid1: string, uid2 :string): Promise<Message[]>;
    createMessage(uid1: string,uid2:string,message:string): Promise<Message>;
    deleteMessage(uid1: string, uid2: string): Promise<any>;
    recentMessage(uid: string): Promise<Message[]>;
}