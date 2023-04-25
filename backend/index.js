const express = require("express");
require("./db/config");



const app = express();


app.get("/", async (req, res) => {
 
    res.send("hello, i am here!");


});



app.listen(5000, () => {
  console.log("Running port num at 5000");
});
