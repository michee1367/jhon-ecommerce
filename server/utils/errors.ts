
export function getUnAuthorizationError(message:string) 
{
    let error = {
      "statusCode": 401,
      "statusMessage": "unauthorization error",
      "data" : {
        "message": message
      }
    }

    return createError(error) 
    
}
