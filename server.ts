import TuitDao from "./daos/TuitDao";
import FollowDao from "./daos/FollowDao";

const mongoose = require('mongoose');
//
//mongoose.connect('mongodb://127.0.0.1:27017/tuiter');
/**
 * Database connection string.
 */
const mongoString = "mongodb+srv://priyesh:priyesh@cluster0.urb4j.mongodb.net/tuiter?retryWrites=true&w=majority" ;

import UserController from "./controllers/UserController";
import express, {Request, Response} from 'express';
import UserDao from "./daos/UserDao";
import TuitController from "./controllers/TuitController";
import FollowController from "./controllers/FollowController";
import BookmarkController from "./controllers/BookmarkController";
import BookmarkDao from "./daos/BookmarkDao";
import MessageController from "./controllers/MessageController";
import MessageDao from "./daos/MessageDao";
import LikeController from "./controllers/LikeController";
import LikeDao from "./daos/LikeDao";
//userDao: UserDao;

const app = express();
app.use(express.json());

mongoose.connect(mongoString, {useNewUrlParser: true})

mongoose.connection.on("error", function() {
    console.log("Not Connected priyesh ")
})

mongoose.connection.on("open", function() {
    console.log("Connected to MongoDB database.")
})

app.get('/hello', (req: Request, res: Response) =>
    res.send('Hello World!'));

app.get('/add/:a/:b', (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b));

app.get('/', (req: Request, res: Response) =>
    res.send('Welcome!!!\nPlease use below link to see see the Tuits and Users\n' +
        '<html><a>https://soft-eng-priyesh.herokuapp.com/users\n</a>' +
        '<a>https://soft-eng-priyesh.herokuapp.com/users</a></html>'));

/**
 * New controller object passing app and data access object to the controller.
 */
new  UserController(app,new UserDao);

/**
 * New controller object passing app and data access object to the controller.
 */
new TuitController(app,new TuitDao);

/**
 * New controller object passing app and data access object to the controller.
 */
new FollowController(app,new FollowDao);

/**
 * New controller object passing app and data access object to the controller.
 */
new BookmarkController(app,new BookmarkDao);

/**
 * New controller object passing app and data access object to the controller.
 */
new MessageController(app,new MessageDao);

/**
 * New controller object passing app and data access object to the controller.
 */
new LikeController(app,new LikeDao);

/**
 * Definition of port.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);