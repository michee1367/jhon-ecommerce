<template>
  <div class="page ">
    <TopBar/>
    <Topbar2/>
    
    <div class="page-body home-page-wrapper mb-5">
      <div class="hero ">
        <div 
          class="img-responsive img-responsive-3x1" 
          style="background-image: url(/img/bg.webp); min-height: 20rem;">
        </div>
      </div>
      <div class="container-xl">
        <section class="py-5">  
            <h1>TROUVEZ VOS PIECES</h1>
            <ClientOnly fallback-tag="span" fallback="Loading comments...">
                <SearchCat />
            </ClientOnly>
        </section>
        <section class="my-5">
          <CardSimple/>
        </section>
        <section class="my-5">
          <h1>PROMOTION DU MOMENT</h1>
          <CardSimple/>
        </section>
        <section class="my-5">
          <h1>MEILLEUR VENTE</h1>
          <CardSimple/>
        </section>
      </div>
    </div>

    <div class="footer text-white">
      <div class="container-xl">
        <div class="d-flex align-items-center justify-content-around">
          <h2>INSCRIPTION A LA NEWSLETTER</h2>
          <div>
              <span class="fw-bold d-inline">Recever nos offres et promotions : </span>
              <input type="text" class="p-2 d-inline" style="width: 15rem;" placeholder="Votre email...">
              <button class="btn btn-primary">S'INSCRIRE</button>
              

          </div>
        </div>
        <div class="row links-block">
          <div class="col-md-2">
            <h4 class="pb-0">INFORMATION</h4>
            <ul>
              <li><a href="#" class="text-white">A propos</a></li>
              <li><a href="#" class="text-white">Livraison</a></li>
              <li><a href="#" class="text-white">Condition générale</a></li>
            </ul>
          </div>
          <div class="col-md-2">
            <h4 class="pb-0">CATEGORIE</h4>
            <ul>
              <li><a href="#" class="text-white">PIECES MOTEUR</a></li>
              <li><a href="#" class="text-white">ECLAIRAGE</a></li>
              <li><a href="#" class="text-white">Voir tous</a></li>
            </ul>
          </div>
          <div class="col-md-2">
            <h4 class="pb-0">SERVICES</h4>
            <ul>
              <li><a href="#" class="text-white">MONTAGE PIECES</a></li>
              <li><a href="#" class="text-white">INSTALLATION</a></li>
              <li><a href="#" class="text-white">SUPPORT</a></li>
            </ul>
          </div>
          <div class="col-md-2">
            <h4 class="pb-0">SERVICES CLIENT</h4>
            <ul>
              <li><a href="#" class="text-white">CONTACTEZ-NOUS</a></li>
              <li><a href="#" class="text-white">SUPPORT 24/5</a></li>
            </ul>
          </div>
          <div class="col-md-4 d-flex align-items-center justify-content-center">
            <a class="px-3 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-facebook"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" /></svg>
            </a>
            <a class="px-3 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-twitter"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013l0 .001" /></svg>
            </a>
            <a class="px-3 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4l0 -8" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M16.5 7.5v.01" /></svg>
            </a>
            <a class="px-3 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-tiktok"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917" /></svg>
            </a>
          </div>
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
min-height: 100vh;
margin: 0;
/* --- AJOUT DU BACKGROUND --- 
background-image: url('/public/img/backgroud_2.webp');
background-size: cover;
background-position: center;
background-repeat: no-repeat;
background-attachment: fixed; *//* L'image reste fixe lors du scroll */

/* Optionnel : superposition d'une légère couche blanche si le contenu est dur à lire 
background-blend-mode: overlay; 
background-color: rgba(0, 0, 0, 0.2);*/
}

.home-card {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.card-border-primary {
  
}
.footer {
  min-height: 20rem;
  width: 100%;
  background-color: black;
}
.footer .links-block {
  padding-top: 4rem;
}

</style>