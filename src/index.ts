import express from "express";
import { connect } from "mongoose";
import { json } from "body-parser";
import { todoRouter } from "./routes/todo";
import { swaggerDocs } from "./swagger";

const app = express();
app.use(json());
app.use(todoRouter);

(async () => {
  const DB_URL = 'mongodb+srv://root:test1234@sandbox.b3yop.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  await connect(DB_URL);
})();

app.listen(3000, () => {
  console.log('server is listening on port 3000. URL: http://localhost:3000/');
  swaggerDocs(app, "3000");
});
