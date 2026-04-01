export default defineEventHandler(async (event) => 
{
    let sessionData = await useSession(event, config)

    await sessionData.clear()

    return  {
        message: "Ok"
    }
})