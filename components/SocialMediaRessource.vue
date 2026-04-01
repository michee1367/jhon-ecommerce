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

<div class="container-xl py-5">
  <div class="row d-flex justify-content-center" v-if="resource">
      <div class="col-md-7">
          <h1 class="text-2xl font-bold mb-4 capitalize text-on-forest text-secondary">{{getNormalNameTableLocal(resource)}}</h1>
          
          <div class="row row-cards">
            <div class="col-12" >
                <div class="card card-sm">
                    <div class="card-body">
                        <div class="d-flex align-items-center justify-content-around">
                        
                            <a href="#" class="text-secondary">
                            <!-- Download SVG icon from http://tabler-icons.io/i/eye -->
                            
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" /><path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /></svg>
                                photo
                            </a>
                            <a href="#" class="ms-3 text-secondary">
                            <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z" /><path d="M3 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" /></svg>
                                video
                            </a>

                            <NuxtLink 
                              :to="`/${props.org}/modules/${props.moduleId}/${props.table}/add`" 
                              class="btn btn-sm btn-primary ms-3 px-5">
                            <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                                Poster
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-12" v-for="row in data" :key="row.id">
                <div class="card card-sm" >
                    <div class="card-body" v-if="row?.utilisateur">
                        <div class="d-flex align-items-center">
                        <span class="avatar me-3 rounded" style="background-image: url(./static/avatars/000m.jpg)"></span>
                        <div>
                            <div>{{ row?.utilisateur?.app_value }}</div>
                            <div class="text-secondary">3 days ago</div>
                        </div>
                        </div>
                    </div>
                    <div class="card-body">{{ row?.description }}</div>
                    <div class="row g-0 gallery" v-if="false">
                        <div class="col-6">
                            <a href="#" class="d-block"><img :src="row?.pic_url" class="card-img-top"></a>
                        </div>
                        <div class="col-6">
                            <a href="#" class="d-block"><img src="https://picsum.photos/id/64/2000/1000" class="card-img-top"></a>
                        </div>
                        <div class="col-6">
                            <a href="#" class="d-block"><img src="https://picsum.photos/id/64/2000/1000" class="card-img-top"></a>
                        </div>
                        <div class="col-6 position-relative">
                            <a href="#" class="position-relative d-block gallery-link">
                                <img src="https://picsum.photos/id/67/2000/1000" class="img-fluid w-100">
                                <div class="overlay">
                                    <span>+6</span>
                                </div>
                            </a>
                        </div>
                    </div>
                    <SocialMediaGallery :postData="row" />
                    <DocGallery :postData="row"  class="mt-2"/>
                    
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div>
                              <button class="btn btn-sm btn-outline-primary px-3">Valider</button>
                            </div>
                            <div class="mx-3">
                              <button class="btn btn-sm btn-outline-primary px-3">Publier</button>
                            </div>
                        
                            <div class="ms-auto">
                                <a href="#" class="text-secondary" title="Vus">
                                <!-- Download SVG icon from http://tabler-icons.io/i/eye -->
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                                467
                                </a>
                                <a href="#" class="ms-3 text-secondary" title="Aimés">
                                <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></svg>
                                67
                                </a>
                                <a href="#" class="ms-3 text-secondary" title="Commentaires">
                                <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 9h8" /><path d="M8 13h6" /><path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" /></svg>
                                6
                                </a>
                                <a href="#" class="ms-3 text-secondary" title="Valider">
                                <!-- Download SVG icon from http://tabler-icons.io/i/heart -->
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-checks"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 12l5 5l10 -10" /><path d="M2 12l5 5m5 -5l5 -5" /></svg>
                                
                                </a>

                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="mb-3">
                        <div class="row g-2">
                            <div class="col">
                            <input type="text" class="form-control form-control-rounded" placeholder="Commentez">
                            </div>
                            <div class="col-auto">
                                <a href="#" class="btn btn-icon bg-red-lt" aria-label="Button">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 14l11 -11" /><path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" /></svg>
                                </a>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>


          </div>
      </div>
  </div>
</div>

        <div class="page-body" v-if="false">
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
    
<style>
  .gallery img {
  height: 200px;
  object-fit: cover;
}

.gallery-link {
  text-decoration: none;
  color: inherit;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.overlay span {
  color: #fff;
  font-size: 2.5rem;
  font-weight: 700;
}

/* Effet hover (optionnel) */
.gallery-link:hover .overlay {
  background: rgba(0, 0, 0, 0.65);
}


</style>