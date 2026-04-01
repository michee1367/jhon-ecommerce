<template>
        <div class="page-body">
            <div class="container-xl pt-5">
              <EtudeBaseIndex v-if="moduleObj?.isCardEtudeBaseModuleTheme" />
              <!--<SelectionIndex v-else-if="moduleObj?.isCardRessourceSelectionModuleTheme" />-->
              <!--<CertificationIndex v-else-if="moduleObj?.isCardRessourceCertificationModuleTheme" />-->
              <!--<<ContratFBRIndex v-else-if="moduleObj?.isCardRessourceContratFBRModuleTheme" />-->
              
          <!--"isCardEtudeBaseModuleTheme": false,
    "isCardRessourceCertificationModuleTheme": false,
    "isCardRessourceSelectionModuleTheme": false,
    CertificationIndex -->
              
              <div class="row row-cards" v-if="true">
                <h3 class="text-secondary">{{ moduleName }}</h3>
                <div class="col-md-4 " v-for="(resource, index) in ressources" :key="resource.name">
                  <a class="card card-link bg-muted-lt" href="#" @click.prevent="goto(resource.name)">
                        <div class="card-body">
                          <div class="row">
                            <div class="col-auto">
                              <span class="avatar rounded">{{  orderModule[index] }}</span>
                            </div>
                            <div class="col">
                              <div class="font-weight-medium">{{ getNormalNameTable(resource) }} </div>
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
  const orderModule = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
  ]
  const route = useRoute()
  const router = useRouter()
  const moduleId = route.params.module
  const moduleObj = ref({})
  const org = route.params.orgu
  const moduleName = ref(null)
  const { getAll } = useApi()
  const ressources = ref([])

  onMounted(async () => {
    await load()
  })

  const goto = (tablename) => {
    router.push(`/${org}/modules/${moduleId}/${tablename}`)
  }

  const getOrderNameSort = (key, item) => {
    let orderNum = item["numOrder"]? item["numOrder"].toString() : "99999"
    return orderNum + key
  }

  const load = async () => {
    
    let {data} = await axios.get("/api/models/all")
    /*ressources.value = Object.keys(data).map(
      (key) => {
        return {"name":key, ...data[key]}
      }
    )*/

    let modulesApp = {}

    Object.keys(data).forEach(
      (key) => {
        let moduleApp = data[key]?.module

        if (moduleApp?.module_id) {
            if (!modulesApp[moduleApp?.module_id]) {
                modulesApp[moduleApp?.module_id] = {
                    "module_id":moduleApp?.module_id,                 
                    "module_name":moduleApp?.module_name,
                    "isCardEtudeBaseModuleTheme":data[key]?.isCardEtudeBaseModuleTheme,
                    "isCardRessourceCertificationModuleTheme":data[key]?.isCardRessourceCertificationModuleTheme,
                    "isCardRessourceSelectionModuleTheme":data[key]?.isCardRessourceSelectionModuleTheme,
                    "isCardRessourceContratFBRModuleTheme":data[key]?.isCardRessourceContratFBRModuleTheme,
                    "count":0,
                    "ressources":[]
                }
            }

            if(data[key]?.isCardRessourceContratFBRModuleTheme) {
              modulesApp[moduleApp?.module_id]["isCardRessourceContratFBRModuleTheme"] = data[key]?.isCardRessourceContratFBRModuleTheme
            }
            if(data[key]?.isCardEtudeBaseModuleTheme) {
              modulesApp[moduleApp?.module_id]["isCardEtudeBaseModuleTheme"] = data[key]?.isCardEtudeBaseModuleTheme
            }
            if(data[key]?.isCardRessourceSelectionModuleTheme) {
              modulesApp[moduleApp?.module_id]["isCardRessourceSelectionModuleTheme"] = data[key]?.isCardRessourceSelectionModuleTheme
            }
            if(data[key]?.isCardRessourceCertificationModuleTheme) {
              modulesApp[moduleApp?.module_id]["isCardRessourceCertificationModuleTheme"] = data[key]?.isCardRessourceCertificationModuleTheme
            }
            modulesApp[moduleApp?.module_id].count = modulesApp[moduleApp?.module_id].count + 1
            modulesApp[moduleApp?.module_id].ressources = [...modulesApp[moduleApp?.module_id].ressources, {"name":key,"numOrderSort":getOrderNameSort(key, data[key]), ...data[key]}]
        }
        //return {"name":key, ...data[key]}
      }
    )
    


    ressources.value = modulesApp[moduleId]?.ressources
    ressources.value = modulesApp[moduleId]?.ressources.sort((a, b) => a["numOrderSort"].localeCompare(b["numOrderSort"]))
    moduleName.value = modulesApp[moduleId]?.module_name
    moduleObj.value = modulesApp[moduleId]
  }
  const getNormalNameTable = (resource) => {
    if(resource.legend?.label) {
      return resource.legend?.label
    }
    return resource?.normalName

  }
</script>