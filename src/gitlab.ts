import KoaRouter from "koa-router";
import dingtalk, {  }  from "@alicloud/dingtalk"
import { Config }  from "@alicloud/openapi-client"
import config from "./config"

const clientConfig = new Config()
clientConfig.accessKeyId = config.dingtalk.accessKeyId
clientConfig.accessKeySecret = config.dingtalk.accessKeySecret
const client = new dingtalk.im_1_0.default(clientConfig)

const gitlabKindHanlderMap: Record<string, (data: any) => Promise<void>> = {
  pipeline: async (data) => {
    const request = new dingtalk.im_1_0.SendInteractiveCardRequest()
    request.cardTemplateId = "pipeline_template"
    const cardData = new dingtalk.im_1_0.SendInteractiveCardRequestCardData()
    request.cardData = cardData
    cardData.cardParamMap = {
      mergeRequestTitle: data.merge_request.title,
      username: data.user.username,
      projectId: data.project.id,
      jobId: data.builds[0].id
    }
    const resoponse = await client.sendInteractiveCard(request)
    console.log(resoponse);
  },
  merge_request: async (data) => {
    const request = new dingtalk.im_1_0.SendMessageRequest()
    request.messageType = "markdown"
    request.message = ``
    const resoponse = client.sendMessage(request)
    console.log(resoponse);
  }
}

const createGitlabHandler =  (router: KoaRouter) => {
  router.get("/gitlab/devops/webhook", async (ctx) => {
    const body = ctx.request.body || {}
    await gitlabKindHanlderMap[body.object_kind]?.(body)
    ctx.body = "success"
  })
}

export default createGitlabHandler