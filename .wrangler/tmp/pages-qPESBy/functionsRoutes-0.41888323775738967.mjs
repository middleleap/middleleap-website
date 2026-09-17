import { onRequest as __api_propose_ts_onRequest } from "/home/user/middleleap-website/functions/api/propose.ts"

export const routes = [
    {
      routePath: "/api/propose",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_propose_ts_onRequest],
    },
  ]