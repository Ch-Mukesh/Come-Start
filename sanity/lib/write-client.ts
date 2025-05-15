import { createClient } from "@sanity/client"
import { token,projectId,dataset,apiVersion } from "../env"

export const writeClient = createClient({
    projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion,
})

if(!writeClient.config().token) {
    throw new Error("Missing write token")
}

