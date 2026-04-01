<script setup>
    import { useRoute } from "vue-router"
    import { getNormalNameField, getNormalNameTable } from "@/tools/ressources";

    const { getAll, download } = useApi()
    const data = ref([])
    const fields = ref([])
    const resource = ref(null)
    const middlware_actions = ref(null)
    const stats = ref([]) 
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
        let resp = await axios.get("/api/kpis/etude_base/stats")
        stats.value = resp.data?.data
        console.log("#########################")
        console.log(stats)
        console.log("#########################")
        let statsTotal = {
              "data":{
                "organisation_id": "0",
                "organisation_name": "Total",
                "superficie_boisee_ha": 0,
                "superficie_exploitee_ha": 0,
                "superficie_totale_ha": 0,
                "total_enr": 0
              } 
        }
        stats.value.forEach(
          (stat, index, arr) => {
            statsTotal = {
              "data":{
                "organisation_id": statsTotal?.data?.organisation_id,
                "organisation_name": statsTotal?.data?.organisation_name,
                "superficie_boisee_ha": statsTotal?.data?.superficie_boisee_ha + stat?.data?.superficie_boisee_ha,
                "superficie_exploitee_ha": statsTotal?.data?.superficie_exploitee_ha + stat?.data?.superficie_exploitee_ha,
                "superficie_totale_ha": statsTotal?.data?.superficie_totale_ha + stat?.data?.superficie_totale_ha,
                "total_enr": statsTotal?.data?.total_enr + stat?.data?.total_enr
              }
            }
          }
        )
        stats.value = [statsTotal/*, ...stats.value,*/ ]
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
      const aroundFloat = (value) => {
        return Math.round(value)
      }
    </script>
    
    <template>
    
              <div class="page-header d-print-none" v-if="resource">
                <div class="container-xl">
                  <div class="row g-2 align-items-center">
                    <div class="col">
                      
                        <h1 class="text-2xl font-bold mb-4 capitalize text-on-forest text-secondary">{{getNormalNameTableLocal(resource)}}</h1>
                        <NuxtLink v-if="false" :to="`/${props.org}/modules/${props.moduleId}/${props.table}/add`" class="btn btn-sm btn-primary px-5">Ajouter</NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
    
            <div class="page-body" v-if="resource">
                    <div class="container-xl">
                      <div>
                        <div v-for="(stat, index) in stats" :key="index" class="py-3">
                          <h3 class="text-on-forest">{{ stat?.data?.organisation_name }}</h3>
                          <div class="row row-cards mt-3">
                            <div class="col-md-3">
                              <div class="card bg-muted-lt">
                                <div class="card-body">
                                  <div class="d-flex align-items-center">
                                    <div class="subheader">Normbre enregistrement total </div>
                                    <div class="ms-auto lh-1">
                                      
                                    </div>
                                  </div>
                                  <div class="d-flex align-items-baseline">
                                    <div class="h1 mb-0 me-2">{{ aroundFloat(stat?.data?.total_enr) }}</div>
                                  </div>
                                </div>
                                <div id="chart-revenue-bg" class="chart-sm"></div>
                              </div>
                            </div>
                            <div class="col-md-3">
                              <div class="card bg-muted-lt">
                                <div class="card-body">
                                  <div class="d-flex align-items-center">
                                    <div class="subheader">Superficie total </div>
                                    <div class="ms-auto lh-1">
                                      
                                    </div>
                                  </div>
                                  <div class="d-flex align-items-baseline">
                                    <div class="h1 mb-0 me-2">{{ aroundFloat(stat?.data?.superficie_totale_ha) }} ha</div>
                                  </div>
                                </div>
                                <div id="chart-revenue-bg" class="chart-sm"></div>
                              </div>
                            </div>
                            <div class="col-md-3">
                              <div class="card">
                                <div class="card-body">
                                  <div class="d-flex align-items-center">
                                    <div class="subheader">Superficie exploitée </div>
                                    <div class="ms-auto lh-1">
                                      
                                    </div>
                                  </div>
                                  <div class="d-flex align-items-baseline">
                                    <div class="h1 mb-0 me-2">{{ aroundFloat(stat?.data?.superficie_exploitee_ha) }} ha</div>
                                  </div>
                                </div>
                                <div id="chart-revenue-bg" class="chart-sm"></div>
                              </div>
                            </div>
                            <div class="col-md-3">
                              <div class="card bg-muted-lt">
                                <div class="card-body">
                                  <div class="d-flex align-items-center">
                                    <div class="subheader">Superficie boisee </div>
                                    <div class="ms-auto lh-1">
                                      
                                    </div>
                                  </div>
                                  <div class="d-flex align-items-baseline">
                                    <div class="h1 mb-0 me-2">{{ aroundFloat(stat?.data?.superficie_boisee_ha) }} ha</div>
                                  </div>
                                </div>
                                <div id="chart-revenue-bg" class="chart-sm"></div>
                              </div>
                            </div>
                          </div>

                        </div>

                      </div>

                      <div>
                        <button @click="downloadData" class="btn btn-sm btn-warning">
                          Télécharger
                        </button>
                        <div class="row row-cards mt-3">

                            
                            <div class="col-md-4" v-for="row in data" :key="row.id">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="card-title">
                                            <div class="row g-2 align-items-center">
                                                <div class="col">
                                                    <strong>{{row.nom_acteur}}</strong>

                                                    <div class="text-secondary">
                                                      Créer le {{ row.date_enquete }}
                                                        <span v-if="false">22/01/2026 à 15h37</span>
                                                    </div>
                                                </div>
                                                <div class="col-auto">
                                                  <div class="dropdown">
                                                    <a href="#" class="btn-action" data-bs-toggle="dropdown" aria-expanded="false">
                                                      <!-- Download SVG icon from http://tabler-icons.io/i/dots-vertical -->
                                                      <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
                                                    </a>
                                                    <div class="dropdown-menu dropdown-menu-end">
                                                      <a href="#" v-if="false" class="dropdown-item">Import</a>
                                                      <a href="#" v-if="false" class="dropdown-item">Export</a>
                                                      <a href="#" v-if="false" class="dropdown-item">Download</a>
                                                      <a href="#" v-if="false" class="dropdown-item text-danger">Delete</a>
                                                      <NuxtLink 
                                                          :to="`/${props.org}/modules/${props.moduleId}/${props.table}/${row.id}/update`" 
                                                          class="dropdown-item">Modifier
                                                      </NuxtLink>
                                                      <NuxtLink 
                                                          :to="`/${props.org}/modules/${props.moduleId}/${props.table}/${row.id}`" 
                                                          class="dropdown-item">Voir
                                                      </NuxtLink>
                                                    </div>
                                                  </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mb-2">
                                        <!-- Download SVG icon from http://tabler-icons.io/i/book -->
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon me-2 text-secondary" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" /><path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" /><path d="M3 6l0 13" /><path d="M12 6l0 13" /><path d="M21 6l0 13" /></svg>
                                        Prepresentant: <strong>{{ row.nom_representant }}</strong>
                                        </div>
                                        <div class="mb-2">
                                        <!-- Download SVG icon from http://tabler-icons.io/i/briefcase -->
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon me-2 text-secondary" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" /><path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" /><path d="M12 12l0 .01" /><path d="M3 13a20 20 0 0 0 18 0" /></svg>
                                        Telephone: <strong>{{ row.nom_representant }}</strong>
                                        </div>
                                        <div class="mb-2">
                                        <!-- Download SVG icon from http://tabler-icons.io/i/home -->
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon me-2 text-secondary" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l-2 0l9 -9l9 9l-2 0" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
                                        Type : <strong>{{ row.telephone }}</strong>
                                        </div>
                                        <div class="mb-2">
                                        <!-- Download SVG icon from http://tabler-icons.io/i/map-pin -->
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon me-2 text-secondary" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" /></svg>
                                        Superficie : <strong>{{ row.superficie_totale_ha }} ha</strong>
                                        </div>
                                        <div class="mb-2">
                                        <!-- Download SVG icon from http://tabler-icons.io/i/calendar -->
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon me-2 text-secondary" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" /><path d="M16 3v4" /><path d="M8 3v4" /><path d="M4 11h16" /><path d="M11 15h1" /><path d="M12 15v3" /></svg>
                                        Village: <strong>{{ row.village }}</strong>
                                        </div>
                                          <div class="mb-2">
                                          <!-- Download SVG icon from http://tabler-icons.io/i/calendar -->
                                          Encodeur: <strong>{{ row.nom_enquete }}</strong>
                                          </div>
                                        <div>
                                        </div>
                                    </div>
                                </div>
                            </div>          
                        </div>
                      </div>
                    </div>
            </div>
    </template>
    <style>
  
 
  </style>