const express = require("express");
const app = express();
const userRouter = require("./router/user.router");
const port = 1000;

app.use(express.json());

app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.json({
    message:
      "User :: signup :: login :: forgot password :: reset password",
  });
});

app.listen(port, () => {
  console.log("Port is listing :", port);
});
