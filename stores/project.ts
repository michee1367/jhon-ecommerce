import axios, { AxiosError } from 'axios'
import { defineStore } from 'pinia'

//choose_project

export const useProjectStore = defineStore(
  'project-store',
  () => {
    let projects = ref([])
    let currentProject = ref(null)
    let currentProjectId = ref(null)
    let currentUser = ref(null)
    
    let pending = ref(false)
    let loaded = ref(false)
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
    async function loadUser() {
        try {
            let {data} = await axios.get(
                '/api/user',
                {
                    headers:{
                        "Content-Type":"application/json",
                        "Accept":"application/json"
                    }
                }
            )

            currentUser.value = data?.user


            if (currentUser.value?.project_id) {
                currentProjectId.value = currentUser.value?.project_id                
            }
            
        } catch (error) {

            console.log(error)

        }
    }

    async function loadProjects() 
    {
        pending.value = true
        
        try
        { 
            if(loaded.value || projects.value.length) {
                pending.value = false
                return
            }

            if (!currentUser.value) {
                await loadUser()
            }

            if (!currentUser.value) {
                pending.value = false
                return
            }

            if(projects.value.length) {
                pending.value = false
                return
            }

            let { data } = await axios.get(
                    `/api/models/records/projets_user/save?user_id=${currentUser.value.id}&per_page=200`,
                    {
                        headers:{
                            "Content-Type":"application/json",
                            "Accept":"application/json"
                        }
                    }
            )
            console.log("#################################")
            console.log(data?.data)
            console.log("#################################")
            //projects.value = data?.data
            projects.value = data?.data.map(
                (projetUser:any) => {
                    return projetUser?.project
                }
            )

            loaded.value = true

            console.log(projects.value)
            
            pending.value = false
            if (currentUser.value?.project_id) {
                currentProjectId.value = currentUser.value?.project_id   
                let project = projects.value.find(project => project.id == currentUser.value?.project_id)
                currentProject.value = project             
            }


            
        } catch (error) 
        {
            //useNuxtApp().$toast.error("Mot de passe incorrect ou soit vous n'etes pas authorisé");
            //console.log(error)
            //catchError(error)  
            pending.value = false               
        }
        
    }

    async function chooseProject(projectId:string) 
    {
        try 
        {
            pending.value = true  
            await loadProjects()
            let project = projects.value.find(project => project.id == projectId)

            if (!project) {
                pending.value = false  
                return null
            }

            let {data} = await axios.post(
                '/api/choose_project',
                {
                    project_id:projectId
                },
                {
                    headers:{
                        "Content-Type":"application/json",
                        "Accept":"application/json"
                    }
                }
            )
            await loadUser()
            currentProject.value = project
            pending.value = false  
            return currentProject.value
            
        } catch (error) 
        {
            pending.value = false  
            return null
            //useNuxtApp().$toast.error("Mot de passe incorrect ou soit vous n'etes pas authorisé");
            //console.log(error)
            //catchError(error)               
        }
        
    }

    function clear() {
        projects.value = []
        currentProject.value = null
        currentUser.value = null
        
        pending.value = false
        loaded.value = false
    }

  
    return { currentProject, pending, projects, loaded, chooseProject, loadProjects, clear }
  }  
)