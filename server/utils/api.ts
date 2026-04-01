import { EventHandlerRequest, H3Event } from "h3";
import util from "util";

export function getContenteType(event: H3Event<EventHandlerRequest>) 
{  
    let contentType = "application/json"
    let contentTypeServer = getHeader(event, 'content-type')

    if (contentTypeServer) {
      /**
       */
      let contentTypeBuff: string = contentTypeServer
  
      contentType = contentTypeBuff.toLocaleLowerCase().search("multipart/form-data") >= 0 ? "multipart/form-data" : "application/json"
    }
  
    return contentType
}


export function getIsMultipart(event: H3Event<EventHandlerRequest>) {
  
    let contentTypeBuff = getContenteType(event)
    return contentTypeBuff.toLocaleLowerCase().search("multipart/form-data") >= 0
}

  
  