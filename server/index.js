import express from "express";
import dontenv from "dotenv";
import cors from "cors";
import connectDb from "./config/Db.js";
import userRoutes from "./routes/UserReg.js";
import cmsRouter from "./routes/cmsRouter.js";
import adminRouter from "./routes/adminRouter.js";



const app = express();
//Middle Ware

app.use(express.json())
app.use(cors())

// routes
app.use("/api", userRoutes);
app.use("/api",cmsRouter)
app.use("/api/admin", adminRouter)

dontenv.config()
const port = process.env.PORT

app.listen(port,()=>{
    console.log("Server Running")
    connectDb()
})