import KoaRouter from "koa-router";
import axios from "axios";
import config from "./config";
import { RobotCallbackData, RobotCallbackDataContent } from "./types";

const createRobotHandler = (router: KoaRouter) => {
  router.post("/dingtalk/robot/callback", async (ctx) => {
    const body = ctx.request.body as RobotCallbackData
    const content = JSON.parse(body.content) as RobotCallbackDataContent
    const projectId = content.params.projectId
    const jobId = content.params.jobId
    if (content.params.action === "resolve") {
      axios.request({
        method: "POST",
        url: `${config.gitlab.origin}/api/v4/projects/${projectId}/jobs/${jobId}/play`,
        headers: {
          "PRIVATE-TOKEN": ""
        }
      })
    } else {
      axios.request({
        method: "POST",
        url: `${config.gitlab.origin}/api/v4/projects/${projectId}/jobs/${jobId}/cancel`,
        headers: {
          "PRIVATE-TOKEN": ""
        }
      })
    }
  })
}

export default createRobotHandler