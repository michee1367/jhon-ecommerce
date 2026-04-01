<template>
  <div class="page-body home-page-wrapper d-flex align-items-center">
      <div class="container-xl">
        <div class="row">
          <div class="col-md">
            <h1 class="navbar-brand navbar-brand-autodark">
              <a href="/">
                <img src="/img/logo.svg" width="110" height="32" alt="Tabler" class="navbar-brand-image">
              </a>
            </h1>
          </div>
          <div class="col-md-auto">
            <NuxtLink href="/logout" class="btn btn-primary px-3 py-0">Deconnection</NuxtLink>
            <NuxtLink 
              href="/undefined/modules/7_settings" 
              class="btn px-3 mx-2 py-0"
              v-if="isAdmin()"
              >
                Admin
              </NuxtLink>
          </div>
        </div>
        <div class="row row-cards mt-5 d-flex justify-content-center" v-if="projectStore.pending">
          <div class="col-md-4">
            <LoaderPage />
          </div>
        </div>

        <div class="row row-cards mt-5 d-flex justify-content-center" v-if="!projectStore.pending">
          <div class="col-md-6">

            <ProjectsList @project_choose="goto($event)"/>

          </div>
        </div>

        <div class="row row-cards mt-5 d-flex justify-content-center" v-if="false">
          
          <div class="col-md-4" v-for="resource in ressources" :key="resource.name">
            <a class="card card-link card-border-primary home-card" href="#" @click.prevent="goto(resource?.module_id)">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-md-auto">
                        <span class="avatar rounded">{{ resource?.module_name[0] }}</span>
                      </div>
                      <div class="col-md">
                        <div class="font-weight-medium">{{ resource?.module_name }}</div>
                      </div>
                    </div>
                  </div>
            </a>

          </div>
          
        </div>
      </div>
  </div>

</template>
<script setup>
import  axios from "axios"
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
const router = useRouter()
const org = route.params.org
const { getAll } = useApi()
const ressources = ref([])
const user = ref(null)
const moduleId = route.params.module
const moduleName = ref(null)
import { useUserConnectStore } from "@/stores/user";

import { useProjectStore } from "@/stores/project";
import * as userManager from '@/tools/user';
const projectStore = useProjectStore()
const userStore = useUserConnectStore()


definePageMeta({
  layout: false,
  middleware: ['auth']
})
onMounted(async () => {
  projectStore.currentProject
  await load()
})

const goto = (ev) => {
  console.log('########################')
  console.log(ev?.project?.id)
  if (ev?.project?.id) {
    router.push(`/${ev?.project?.id}`)
  }
  console.log('########################')
  //router.push(`/${orgId}`)
}

const isAdmin = () => {
  //userManager.is_admin(userStore.user)
  return userManager.is_admin(userStore.user.value)
}

const load2 = async () => {

let {data} = await axios.get("/api/models/all")

ressources.value = Object.keys(data).map(
(key) => {
  return {"name":key, ...data[key]}
}
)

let modulesApp = {}

Object.keys(data).forEach(
(key) => {
  let moduleApp = data[key]?.module

  if (moduleApp?.module_id) {
      if (!modulesApp[moduleApp?.module_id]) {
          modulesApp[moduleApp?.module_id] = {
              "module_id":moduleApp?.module_id,
              "module_name":moduleApp?.module_name,
              "count":0,
              "ressources":[]
          }
      }
      modulesApp[moduleApp?.module_id].count = modulesApp[moduleApp?.module_id].count + 1
      modulesApp[moduleApp?.module_id].ressources = [...modulesApp[moduleApp?.module_id].ressources, data[key]]
  }
  //return {"name":key, ...data[key]}
}
)
let modulesAppValues = Object.values(modulesApp)
modulesAppValues.sort((a,b) => a.module_id > b.module_id ? 1 : -1)

ressources.value = modulesAppValues
console.log("############################")
console.log(Object.values(modulesApp))
console.log("############################")

}

const load = async () => {
    //await loadData()

    let userResp = await axios.get("/api/user")

    user.value = userResp.data?.user

    /*ressources.value = Object.keys(data).map(
      (key) => {
        return {"name":key, ...data[key]}
      }
    )*/

    let modulesApp = {}
    console.log('##############################')
    console.log(user.value)
    console.log(userManager.is_visitor(userResp.data))

    if(userManager.is_visitor(userResp.data)) {
      return
    }
    let {data} = await axios.get("/api/models/all")

    Object.keys(data).forEach(
      (key) => {
        let moduleApp = data[key]?.module
        //console.log(key)

        if (moduleApp?.module_id) {
            console.log("########################")
            console.log(user.value?.roles)
            console.log(moduleApp?.role)
            console.log(user.value?.roles?.includes(moduleApp?.role))
            let t = [].includes()
            console.log("########################")
            if (user.value?.roles instanceof Array && moduleApp?.role && !(user.value?.roles?.includes(moduleApp?.role))) {
              return
            }

            if (!modulesApp[moduleApp?.module_id]) {
                modulesApp[moduleApp?.module_id] = {
                    "module_id":moduleApp?.module_id,
                    "module_name":moduleApp?.module_name,
                    "role":moduleApp?.role,
                    "count":0,
                    "ressources":[]
                }
            }
            modulesApp[moduleApp?.module_id].count = modulesApp[moduleApp?.module_id].count + 1
            modulesApp[moduleApp?.module_id].ressources = [...modulesApp[moduleApp?.module_id].ressources, {"name":key, ...data[key]}]
            //console.log()
        }
        //return {"name":key, ...data[key]}
      }
    )
    let modulesAppValues = Object.values(modulesApp)
    modulesAppValues.sort((a,b) => a.module_id > b.module_id ? 1 : -1)
    ressources.value = modulesAppValues
    //console.log(modulesApp[moduleId]?.ressources)
    //ressources.value = modulesApp[moduleId]?.ressources
    //moduleName.value = modulesApp[moduleId]?.module_name
  }
const getNormalNameTable = (resource) => {
if(resource.legend?.label) {
return resource.legend?.label
}
return resource?.normalName

}
</script>
<style>

.home-page-wrapper {
flex: 1;
padding-top: 6rem;
min-height: 100vh;
margin: 0;
/* --- AJOUT DU BACKGROUND --- */
background-image: url('/public/img/backgroud_2.webp');
background-size: cover;
background-position: center;
background-repeat: no-repeat;
background-attachment: fixed; /* L'image reste fixe lors du scroll */

/* Optionnel : superposition d'une légère couche blanche si le contenu est dur à lire */
background-blend-mode: overlay; 
background-color: rgba(0, 0, 0, 0.2);
}

.home-card {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.card-border-primary {
  
}

</style>