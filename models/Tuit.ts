import User from "./User";

/**
 * @typedef Tuit Represents Tuits
 * @property tuit represents the tuit
 * @property postedOn reprents date of posting tweet.
 */
export default class Tuit {
    private tuit: string = '';
    private postedOn: Date = new Date();
    private postedBy: User | null = null;
}

