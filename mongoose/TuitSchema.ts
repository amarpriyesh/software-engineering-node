import mongoose from "mongoose";
import User from "../models/User";

/**
 * @typedef TuitSchema Represents Tuits
 * @property tuit represents the tuit
 * @property postedOn reprents date of posting tweet.
 */
const TuitSchema = new mongoose.Schema({
    tuit: {type: String, required: true},
    postedOn: {type: Date, default: Date.now},
    postedBy: {type: String, required: true}

}, {collection: 'tuits'});
export default TuitSchema;