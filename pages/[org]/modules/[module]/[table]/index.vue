<script setup>
import { useRoute } from "vue-router"
import { getNormalNameField, getNormalNameTable } from "@/tools/ressources";
const route = useRoute()
const table = route.params.table
const moduleId = route.params.module
const org = route.params.org
const { getAll } = useApi()
const data = ref([])
const fields = ref([])
const resource = ref(null)
const middlware_actions = ref(null)
import axios from "axios";
const config = useRuntimeConfig()


definePageMeta({
    middleware: ['auth']
  })


onMounted(async () => {
  await load()
  data.value = await getAll(table)
})
  const load = async () => {
    
    let {data} = await axios.get("/api/models/all")
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
    ) 
  }

  const run_action = async (table_name, name, record_id, return_type) => {

    let headers = {}
    const RETRUN_TYPE_DOWNLOAD = "DOWNLOAD"

    if (return_type == RETRUN_TYPE_DOWNLOAD) {
      headers["responseType"] = 'blob' 
    }
    const host = config.public.apiUrl;
    //console.log("###############################################")
    //console.log(config.public)
    //console.log("###############################################")
    //return
    let url = `${host}/actions/tables/${table_name}/actions/${name}/record/${record_id}/`
    //console.log(url)
    try {
      console.log(return_type)

      if (return_type == RETRUN_TYPE_DOWNLOAD) {
        // --- Téléchargement du fichier ---
        window.location.href = url
      } else {
        let response = await axios.get(
          url
        )
        // --- Sinon : rechargement de la page ---
        window.location.reload();
      }
    } catch (err) {

      console.error("Erreur dans l'opération :", err);
      //window.location.reload(); // fallback
    }

  }

  const getNormalNameFieldLocal = (resource, field) => {
    return getNormalNameField(resource, field)
  }
  const  getNormalNameTableLocal = (resource) => {
    return getNormalNameTable(resource)
  }
</script>

<template>

    <div class="page-wrapper" v-if="resource">
          <!-- Page header -->


          <SocialMediaRessource 
            :queries="{'organisation_id': org}"
            :org="org"
            :table="table"
            :moduleId="moduleId"
            v-if="resource?.isSocialMediaTheme"
            />


            <ClientOnly  v-else-if="resource?.isMapTheme" fallback-tag="span" fallback="Loading comments...">
                        <LeafletMapSite 
                          :queries="{'organisation_id': org}"
                          :org="org"
                          :table="table"
                          :moduleId="moduleId"
                          />
                    </ClientOnly>

          <ListCardRessource 
            :queries="{'organisation_id': org}"
            :org="org"
            :table="table"
            :moduleId="moduleId"
            v-else-if="resource?.isCardRessourceTheme"
            />
            
          <ListRessource 
            v-else
            :queries="{'organisation_id': org}"
            :org="org"
            :table="table"
            :moduleId="moduleId"
            />
            

</div>
</template>
