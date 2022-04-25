import Koa from "koa";
import KoaRouter from "koa-router";
import koaBody from "koa-body";
import createGitlabHandler from "./gitlab";
import createRobotHandler from "./robot";

const app = new Koa()
const router = new KoaRouter()

createGitlabHandler(router)
createRobotHandler(router)

app.use(koaBody({}))
app.use(router.routes())

app.listen("4567", () => {
  console.log(`server listen on: http://127.0.0.1:4567`);
})
