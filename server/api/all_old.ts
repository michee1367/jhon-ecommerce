let config = {
  password:"passwordF4L4%Pgd978vLpy^KFN*A4qg!zkoAnT3!jmA",
  maxAge: 60 * 60 * 24 * 1000,
  name:"main"
}
import { EventHandlerRequest, H3Event, MultiPartData } from "h3";
import Axios, { AxiosError } from "axios";
import https from "https";
const instance = Axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

export default defineEventHandler(async (event) => 
{
  let data = await meProxy(event)
  return data
})

async function meProxy(event: H3Event<EventHandlerRequest>) {
  let method = event.method
  let originalUrl = event.path
  let sessionData = await useSession(event, config)
  //console.log(sessionData.data)
  let user = sessionData.data.user
  //let access_token = sessionData.data.access_token
  //console.log(access_token)
  
  //console.log(user)

  if (!user) {
      throw createError({
          "statusCode": 401,
          "statusMessage": "unauthorization",
          "data" : {}
      })
  }
  
  let headers = {
      ["Authorization"]: "Bearer " + user.jwt_token,
      ["Accept"]: "application/json",
      //["Content-Type"]: getContenteType(event),
  }
  let resAxios = null

  //console.log("##################")
  //console.log(headers)
  //console.log("#############")

  //let url = `http://127.0.0.1:5000` + originalUrl.slice(4)
  let url = `${process.env.API_URL}` + originalUrl.slice(4)

  //console.log("##################")
  //console.log(url)
  //console.log(process.env)
  //onsole.log("#############")
  try {
    if 
    (
      !!["POST", "PUT", "PATCH"].find(methodIt => method.toUpperCase() == methodIt)
    ) 
    {
      //console.log(await readBody(event))
      resAxios = await instance.request(
        {
          method,
          data: await readBody(event),
          headers,
          url
        }
      )
    }
    else 
    {
      resAxios = await instance.request(
        {
          method,
          //data:req.body,
          headers,
          url
        }
      )

    }

    let data = resAxios.data
    //AxiosResponse

    if (resAxios.status >= 500) {

      throw new Error("Server Error")

    }
    setResponseStatus(event, resAxios.status)
    return data

  } catch (error) {
    //console.log("#####################oooo###############")
    console.log(error)
    let err = createError({
      "statusCode": 500,
      "statusMessage": "Server error",
      "data" : {
          "messageDetail": error?.message,
          "messageBrut": error?.message
      }
    })
    
    throw err

  }
}
