import Axios, { AxiosError } from "axios";

export const config = {
    password:"passwordF4L4%Pgd978vLpy^KFN*A4qg!zkoAnT3!jmA",
    maxAge: 60 * 60 * 24 * 1000,
    name:"main"
}

export function catchError(err:AxiosError) {
    let status = 500
    let error = {}
    console.log(err.response?.data)
    
  if (
    !!err.response &&
    !!err.response.status &&
    err.response.status >= 500
  ) 
  {
    error = {
      "statusCode": err.response.status,
      "statusMessage": err.message,
      "statusDetail": err.response?.data,
    }

  }
  else if (
    !!err.response &&
    !!err.response.status &&
    401 == err.response.status
  ) 
  {

    //console.log(err.response);
    //console.log(err.response)
    let data = err.response.data
    let messageDetail = null
    if (data instanceof Object) {
        messageDetail = data["hydra:description"]
        
    }else {
        let messageDetail = null

    }
    error = {
      "statusCode": err.response.status,
      "statusMessage": "Client error",
      "data" : {
        "messageDetail": messageDetail,
        "messageBrut": err.response.data
      }
    }

  }
  else if (
    !!err.response &&
    !!err.response.status &&
    err.response.status >= 400
  ) 
  {
    let data = err.response.data
    console.log(err.response)
    let messageDetail = null

    if (data instanceof Object) {
        messageDetail = data["hydra:description"]
        
    }else {
        let messageDetail = null

    }
    error = {
      "statusCode": err.response.status,
      "statusMessage": "Client error",
      "data" : {
        "messageDetail": messageDetail,
        "messageBrut": err.response.data
      }
    }
  } else {
    
    error = {
        "statusCode": err.response?.status,
        "statusMessage": err.message,
        "statusDetail": err.response?.data,
      }
  }
  throw createError({
      "statusCode": error?.statusCode,
      "statusMessage": error?.statusMessage,
      "data" : error?.statusDetail
  })
  //console.log(error)
  return error
}

export interface User {
    readonly jwt_token : string
    readonly id : string
    readonly project_id : string
    readonly phone : string
    readonly nom : string
    readonly post_nom : string
    readonly prenom : string
    readonly roles : Array<string>
}

export interface RequestBodyLogin {
    readonly token : string
}
export interface RequestData {
    user : User
    body : RequestBodyLogin
}