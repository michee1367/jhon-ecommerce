<template>
        <div class="page-body">
            <div class="container-xl">
              <div class="row row-cards mt-5">
                <div class="col-md-4" v-for="resource in ressources" :key="resource.name">
                  <a class="card card-link" href="#" @click.prevent="goto(resource?.module_id)">
                        <div class="card-body">
                          <div class="row">
                            <div class="col-auto">
                              <span class="avatar rounded">{{ resource?.module_name[0] }}</span>
                            </div>
                            <div class="col">
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
  definePageMeta({
    layout: false,
    middleware: ['auth']
  })
  onMounted(async () => {
    await load()
  })

  const goto = (moduleId) => {
    router.push(`/${org}/modules/${moduleId}`)
  }

  const load = async () => {
    
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

    ressources.value = Object.values(modulesApp)
    console.log("############################")
    console.log(Object.values(modulesApp))
    console.log("############################")

  }
  const getNormalNameTable = (resource) => {
    if(resource.legend?.label) {
      return resource.legend?.label
    }
    return resource?.normalName

  }
</script>
<style>

  .page-wrapper {
    flex: 1;
    padding: 2rem;
    /* --- AJOUT DU BACKGROUND --- 
    background-image: url('/public/img/background_optimized.webp');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;*/ /* L'image reste fixe lors du scroll */
    
    /* Optionnel : superposition d'une légère couche blanche si le contenu est dur à lire 
    background-blend-mode: overlay; 
    background-color: rgba(255, 255, 255, 0.1);*/
  }

</style>