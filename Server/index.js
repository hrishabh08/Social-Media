//import packages
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path"
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import authroutes from "./routes/auth.js"
import userroutes from "./routes/user.js"
import postroutes from "./routes/posts.js"
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/posts.js"

//configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config(); //so we can use .env files

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }))
app.use(cors());

//set the directory of the place the assests will be stored 
//in case stored locally
app.use("/assets", express.static(path.join(__dirname, 'public/assets')))
//store locally

//configurations of multer package
//from github of multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage })

/*ROUTES WITH UPLOAD FUNCTION */
//register
app.post("/auth/register", upload.single("picture"), register)
//FOR UPLOADING POSTS
app.post("/posts", verifyToken, upload.single("picture"), createPost)


//for all other routes
app.use("/auth", authroutes);
app.use("/user", userroutes)
app.use("/posts", postroutes)


//MOONGOOSE SETUP
mongoose.set('strictQuery', true);
const PORT = process.env.PORT || 5001; //direcly uisng the port(EACCES error)
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
).then(() => {
    app.listen(PORT, () => { console.log(`Server port: ${PORT}`) })
})
    .catch((error) => { console.log(`${error} did not connnect to database`) })

