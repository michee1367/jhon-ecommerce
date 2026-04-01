import { useUserConnectStore } from "@/stores/user";

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.server) return

    const userStore = useUserConnectStore()
    console.log(userStore.user)
    if (!userStore.user.value) {
        //console.log("OK")
        try {

            await userStore.load()
            
        } catch (error) {
            
        }
    }

    if (!userStore.user.value) {
        //return navigateTo('/login')
        if (process.client) {
          window.location.href = '/login' // ✅ redirection externe réelle
        }
        return abortNavigation() 
    }
    console.log("################################################")

    /*if (to.params.id === '1') {
      return abortNavigation()
    }
    // In a real app you would probably not redirect every route to `/`
    // however it is important to check `to.path` before redirecting or you
    // might get an infinite redirect loop
    if (to.path !== '/') {
      return navigateTo('/')
    }*/
  })