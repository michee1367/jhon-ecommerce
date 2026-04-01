
export default defineEventHandler(async (event) => {
    
    let sessionData = await useSession(event, config)
    let user = sessionData.data.user

    if (!user) 
    {
        throw getUnAuthorizationError("User not found")
    }
    let data = {... user}
    data.jwt =undefined
    return  {
        user: data
    }
})