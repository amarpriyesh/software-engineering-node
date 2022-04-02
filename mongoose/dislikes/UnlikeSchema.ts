import mongoose, {Schema} from "mongoose";
import Unlike from "../../models/unlikes/Unlike";

const UnLikeSchema = new mongoose.Schema<Unlike>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    unlikedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "unlikes"});
export default UnLikeSchema;