import User from "./User";

/**
 * @typedef Message Represents Message class
 * @property from represents the user
 * @property to the user
 * @property message represents messages
 * @property sentOn reprents date it was sent.
 */
export default interface Message {
    to: User,
    from: User,
    sentOn: Date,
    message: string
};