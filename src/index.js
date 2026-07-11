import connectDB from "./db/index.js";
// require('dotenv').config()
import dotenv from "dotenv";
import dns from "dns";
import { app } from "./app.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config({
  path: "./.env",
});

connectDB()
.then(()=>{
  app.listen(process.env.PORT || 8000 , ()=>{
    console.log(`Server is running at port: ${process.env.PORT}`)
  })
})
.catch((err)=>{
  console.log(`Mongodb failed !! ${err}`);
  
})
