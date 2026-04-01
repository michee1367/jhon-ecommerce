import Axios, { AxiosError } from "axios";
import https from "https";
import { EventHandlerRequest, H3Event } from "h3";

const rolesAuth = [
]

const instance = Axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
});


export default defineEventHandler(async (event) => {
    let sessionData = await useSession(event, config)
    let user = sessionData.data.user
    //console.log("################")
        
    if (!user) {
        throw createError({
        statusCode: 401,
        statusMessage: "unauthorized"
        });
    }
    
    let body = await readBody(event)

    console.log("########################")
    console.log("########################")
    console.log(user)
    console.log("########################")
    console.log("########################")

    let data = {
      names : user.names,
      id : user.id,
      phone : user.phone,
      project_id : body.project_id,
      email : user.email,
      jwt_token : user.jwt_token,
      roles : user.roles
    }
    //data.access_token =undefined
    //data.refresh_token =undefined
    
    //data.roles = undefined
    //console.log(data)
    let updated = {...sessionData.data}  
    updated.user = {...data}
    
    //updated.access_token = access_token
    await sessionData.update(updated)
    data.jwt_token = null
    //data.access_token =undefined

    return  {
        user: data
    }
})