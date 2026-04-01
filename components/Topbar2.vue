<script setup lang="ts">
    import axios from "axios";
    import { useRoute } from "vue-router"
    const route = useRoute()
    const { getAll } = useApi()
    const data = ref([])
    const org = route.params.org
    const user = ref(null)
    const moduleId = route.params.module
    const moduleName = ref(null)
    const ressources = ref([])
    definePageMeta({
        middleware: ['auth']
      })
    onMounted(async () => {
      await load()
      data.value = await getAll("organisations", "")
    })
      const load = async () => {
        //user.value = await axios.get("/user")
        //console.log("##########################")
        //console.log(user.value)
        //console.log("##########################")

        /*let {data} = await axios.get("/api/models/all")
        Object.keys(data).forEach(
          (key) => {
            if (key == table) {
              resource.value = data[key]
              fields.value = Object.keys(data[key]?.fields??{})
              middlware_actions.value = data[key]?.middlware_actions??null
              console.log("##########################")
              console.log(fields.value)
              console.log("##########################")
            }
          }
        ) */
        let {data} = await axios.get("/api/models/all")
        console.log("##########################")
        console.log(data)
        console.log("##########################")
        let modulesApp = {}

        Object.keys(data).forEach(
            (key) => {
                let moduleApp = data[key]?.module
                //console.log(key)

                if (moduleApp?.module_id) {
                    console.log("########################")
                    console.log(user?.roles)
                    console.log(moduleApp?.role)
                    console.log(user?.roles?.includes(moduleApp?.role))
                    let t = [].includes()
                    console.log("########################")

                    /*if (user?.roles instanceof Array && moduleApp?.role && !(user?.roles?.includes(moduleApp?.role))) {
                    return
                    }*/

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
      }

      const goto = async (orgId:string) => {
        console.log(orgId)
        navigateTo(`/${orgId}/modules`)
      }
  

</script>
<template>
                <div class="navbar bg-primary text-white p-0 m-0">
                    <div class="container-fluid d-flex align-items-center p-0 m-0">
                        <ul class="d-flex justify-content-center w-100 p-0 m-0">
                            <div class="mx-5">
                                LIVRAISON RAPIDE |
                            </div>
                            <div class="mx-5">
                                SUPPORT 24/5 |
                            </div>
                            <div class="mx-5">
                                RETOURS FACILES
                            </div>
                            
                        </ul>
                    </div>
                </div>

</template>
