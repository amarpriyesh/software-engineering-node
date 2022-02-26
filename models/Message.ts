import User from "./User";

export default interface Message {
    to: User,
    from: User,
    sentOn: Date,
    message: string
};