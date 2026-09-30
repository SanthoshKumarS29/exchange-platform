import express from "express";
import dontenv from "dotenv";
import cors from "cors";



const app = express();
//Middle Ware

app.use(express.json())
app.use(cors())

dontenv.config()
const port = process.env.PORT

app.listen(port,()=>{
    console.log("Server Running")
})