export interface RobotCallbackData {
  corpId: string
  outTrackId: string
  userId: string
  content: string
}

export interface RobotCallbackDataContent {
  cardPrivateData: {
    actionIds: string[]
  }
  params: {
    action: "reject" | "resolve"
    jobId: string
    projectId: string
  }
}