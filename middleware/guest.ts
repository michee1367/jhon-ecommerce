import { useUserConnectStore } from "@/stores/user";

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (process.server) return

    const userStore = useUserConnectStore()
    
    
    //console.log(userStore.user)
    ///projects/register/main
    if (userStore.user.value) {
        return navigateTo('/')
    }
    try {
      await userStore.load()
      
    } catch (error) {
      
    }

    if (userStore.user.value) {
        return navigateTo('/')
    }
    console.log(userStore.user.value)

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