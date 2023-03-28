const express = require("express");
const cors = require("cors");
const { productRoute } = require("./routes/productRoute");
const { userRoute } = require("./routes/userRoute");
const { connection } = require("./connection/connection");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/product", productRoute);
app.use("/users", userRoute);


app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log(error)
    }
})
