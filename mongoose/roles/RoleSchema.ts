import mongoose, {Schema} from "mongoose";
import Role from "../../models/role/Role";
const RoleSchema = new mongoose.Schema<Role>({
    user: {type: Schema.Types.ObjectId, ref: "UserModel"},
    allowTuits: {type: Number, default: 1}}, {collection: "roles"});

export default RoleSchema;