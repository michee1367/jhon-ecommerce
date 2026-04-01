<script setup>
    import { useRoute } from "vue-router"
    import { getNormalNameField, getNormalNameTable } from "@/tools/ressources";

    const { getAll, download } = useApi()
    const data = ref([])
    const fields = ref([])
    const resource = ref(null)
    const middlware_actions = ref(null)
    
    import axios from "axios";
    const config = useRuntimeConfig()

    const props = defineProps({
        table:String,
        org:String,
        moduleId:String,
        queries:Object
    })
    
    
    onMounted(async () => {
        await load()
        let query = ""
        console.log("##########################")
        console.log(props.queries)
        console.log("##########################")
        if(props.queries) {
            query = new URLSearchParams(props.queries).toString();
        }
        console.log("##########################")
        console.log(query)
        console.log("##########################")
        data.value = await getAll(props.table, query)
    })
      const load = async () => {
        
        let {data} = await axios.get("/api/models/all")
        Object.keys(data).forEach(
          (key) => {
            if (key == props.table) {
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
        const getNormalValue = (resource, field) => {
            if(resource[field.slice(0, -3)] ) {
                return resource[field.slice(0, -3)]?.app_value
            }
            return resource[field]
            //return getNormalNameField(resource, field)
        }
      const downloadData = async () => {
        await download(props.table)
      }   
    </script>
    
    <template>
    
              <div class="page-header d-print-none" v-if="resource">
                <div class="container-xl">
                  <div class="row g-2 align-items-center">
                    <div class="col">
                      
                        <h1 class="text-2xl font-bold mb-4 capitalize text-on-forest text-secondary">{{getNormalNameTableLocal(resource)}}</h1>
                        <NuxtLink :to="`/${props.org}/modules/${props.moduleId}/${props.table}/add`" class="btn btn-sm btn-primary px-5">Ajouter</NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
    
            <div class="page-body" v-if="resource">
                    <div class="container-xl">
                      <div class="row row-cards">
                          <div class="col-12">
                          <div class="card">
                              <div class="card-body card-body-scrollable card-body-scrollable-shadow">
                              <div class="divide-y">
                                  <div>
                                    <div class="table-responsive">
                                        <button @click="downloadData" class="btn btn-sm btn-warning">
                                          Télécharger
                                        </button>
                                        <table class="table table-vcenter card-table table-striped">
                                        <thead>
                                            <tr>
                                            <th v-for="key in fields" :key="key">{{ getNormalNameFieldLocal(resource, key)  }}</th>
                                            <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="row in data" :key="row.id" class="border-t">
                                            <td v-for="key in fields" :key="key">{{ getNormalValue(row, key) }}</td>
                                            <td>
                                                <NuxtLink 
                                                    :to="`/${props.org}/modules/${props.moduleId}/${props.table}/${row.id}/update`" 
                                                    class="btn btn-sm btn-primary m-1">Modifier
                                                </NuxtLink>
                                                <NuxtLink 
                                                    :to="`/${props.org}/modules/${props.moduleId}/${props.table}/${row.id}`" 
                                                    class="btn btn-sm btn-primary m-1">Voir
                                                </NuxtLink>
                                                <div v-if="middlware_actions">
                                                  
                                                    <a 
                                                      href="#" 
                                                      class="btn btn-sm btn-primary py-0 my-0" 
                                                      @click.prevent="run_action(
                                                        middlware_action.table_name,
                                                        middlware_action.name,
                                                        row.id,
                                                        middlware_action?.middleware?.returnType
                                                        )"
                                                      v-for="middlware_action in middlware_actions"
                                                      >
                                                        {{middlware_action?.middleware?.wording}}
                                                      </a>
                                                </div>
                                                <!--NuxtLink :to="`/${table}/${row.id}`">👁️</NuxtLink> |
                                                <NuxtLink :to="`/${table}/edit/${row.id}`">✏️</NuxtLink
                                                  middlware_action?.name 
                                                  middlware_action?.table_name -->
                                            </td>
                                            </tr>
                                        </tbody>
                                        </table>
                                    </div>
                                  </div>
                              </div>
                              </div>
                          </div>
                          </div>
          
                      </div>
                    </div>
            </div>
    </template>
    