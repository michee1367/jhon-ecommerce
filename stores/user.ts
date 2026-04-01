import axios, { AxiosError } from 'axios'
import { defineStore } from 'pinia'

export const useUserConnectStore = defineStore(
  'user-connect-store',
  () => {
    let userCurrent = ref()
    let userOld = ref()
    let username = ref('')
    let password = ref('')
    let user = computed(() => {
        return userCurrent
    })
    let pending = ref(false)
    let errorLogin = ref(new AxiosError)
    
    //const doubleCount = computed(() => count.value * 2)
    function catchError(errorLogin: unknown) 
    {
        if (errorLogin instanceof AxiosError) {
            if (errorLogin.response?.status == 401) {
                //useNuxtApp().$toast.error("Les identifiants incorect");
            }else{
                //useNuxtApp().$toast.error(errorLogin.message);
            }
            
        }else{
            //useNuxtApp().$toast.error("Problème de connexion");

        }

    }

    async function loginNormal(payload:any) 
    {
        userOld.value = userCurrent.value
        pending.value = true
        try 
        {
            let { data } = await axios.post(
                    '/api/login',
                    payload,
                    {
                        headers:{
                            "Content-Type":"application/json",
                            "Accept":"application/json"
                        }
                    }
            )
            userCurrent.value = data
            pending.value = false
            clear()
            await navigateTo('/')
            
        } catch (error) 
        {
            //useNuxtApp().$toast.error("Mot de passe incorrect ou soit vous n'etes pas authorisé");
            //console.log(error)
            //catchError(error)  
            pending.value = false               
        }
        
    }

    async function login(token:string) 
    {
        userOld.value = userCurrent.value
        pending.value = true
        try 
        {
            let { data } = await axios.post(
                    '/api/login',
                    {
                        token:token,
                    },
                    {
                        headers:{
                            "Content-Type":"application/json",
                            "Accept":"application/json"
                        }
                    }
            )
            userCurrent.value = data
            pending.value = false
            clear()
            await navigateTo('/')
            
        } catch (error) 
        {
            //useNuxtApp().$toast.error("Mot de passe incorrect ou soit vous n'etes pas authorisé");
            //console.log(error)
            //catchError(error)  
            pending.value = false               
        }
        
    }

    watch(pending, async (newPending, oldPending) => {
        if (!newPending && oldPending) {
          
        }
    })

    function clear() {
        username.value = ''
        password.value = ''        
    }
    function clearUser() {
        userCurrent.value = null   
    }

    async function load() 
    {
        if (userCurrent.value) {
            return userCurrent
        }
        userOld.value = userCurrent.value
        pending.value = true
        try 
        {
            let { data } = await axios.get(
                    '/api/user',
                    {
                        headers:{
                            "Content-Type":"application/json",
                            "Accept":"application/json"
                        }
                    }
            )
            userCurrent.value = data
            pending.value = false
            clear()
            
        } catch (error) 
        {
            //console.log(error)
            //useNuxtApp().$toast.info("Vous n'êtes pas connecté");
            //catchError(error)  
            pending.value = false               
        }
        //let res = await fetch('/api/user')
        //userCurrent.value = await res.json()
        //pending.value = false
        //error.value?.status
    }
    async function logout() 
    {
        try 
        {
            let { data } = await axios.get(
                    '/api/logout',
                    {
                        headers:{
                            "Content-Type":"application/json",
                            "Accept":"application/json"
                        }
                    }
            )
            userCurrent.value = undefined
            pending.value = false
            clear()
            //useNuxtApp().$toast.info("Vous êtes déconnecté");
            
            
        } catch (error) 
        {
            console.log(error)
            //useNuxtApp().$toast.error("Erreur de déconnexion");
            //catchError(error)  
            //pending.value = false               
        }
        //let res = await fetch('/api/user')
        //userCurrent.value = await res.json()
        //pending.value = false
        //error.value?.status
    }
  
    return { user, pending, username, password, loginNormal, logout, login, load, clear, clearUser }
  }  
)