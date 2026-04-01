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

  <div class="row d-flex justify-content-center">
      <div class="col-sm-4 col-lg-3">
        <div class="card card-sm">
          <a href="#" class="d-block"><img src="/img/batterie.webp" class="card-img-top"></a>
          <div class="card-body">
            <div class="d-flex align-items-center">
              <span class="avatar me-3 rounded">B</span>
              <div>
                <div>Batterie</div>
                <div class="text-secondary">Occasion</div>
              </div>
              <div class="ms-auto">
                <a href="#" class="text-primary fw-bolder">
                  <!-- Download SVG icon from http://tabler-icons.io/i/eye -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2" /><path d="M12 3v3m0 12v3" /></svg>
                  10
                </a>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-center">
              <button class="btn btn-primary px-5">
                ACHETER
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-4 col-lg-3">
        <div class="card card-sm">
          <a href="#" class="d-block"><img src="/img/alternateur_3.webp" class="card-img-top"></a>
          <div class="card-body">
            <div class="d-flex align-items-center">
              <span class="avatar me-3 rounded">JL</span>
              <div>
                <div>Alternateur</div>
                <div class="text-secondary">Occasion</div>
              </div>
              <div class="ms-auto">
                <a href="#" class="text-primary fw-bolder">
                  <!-- Download SVG icon from http://tabler-icons.io/i/eye -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2" /><path d="M12 3v3m0 12v3" /></svg>
                  10
                </a>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-center">
              <button class="btn btn-primary px-5">
                ACHETER
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-4 col-lg-3">
        <div class="card card-sm">
          <a href="#" class="d-block"><img src="/img/retroviseur.webp" class="card-img-top"></a>
          <div class="card-body">
            <div class="d-flex align-items-center">
              <span class="avatar me-3 rounded">JL</span>
              <div>
                <div>Retroviseur</div>
                <div class="text-secondary">Occasion</div>
              </div>
              <div class="ms-auto">
                <a href="#" class="text-primary fw-bolder">
                  <!-- Download SVG icon from http://tabler-icons.io/i/eye -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2" /><path d="M12 3v3m0 12v3" /></svg>
                  10
                </a>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-center">
              <button class="btn btn-primary px-5">
                ACHETER
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm-4 col-lg-3">
        <div class="card card-sm">
          <a href="#" class="d-block"><img src="/img/etrier.webp" class="card-img-top"></a>
          <div class="card-body">
            <div class="d-flex align-items-center">
              <span class="avatar me-3 rounded">JL</span>
              <div>
                <div>Etrier de frein</div>
                <div class="text-secondary">Occasion</div>
              </div>
              <div class="ms-auto">
                <a href="#" class="text-primary fw-bolder">
                  <!-- Download SVG icon from http://tabler-icons.io/i/eye -->
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2" /><path d="M12 3v3m0 12v3" /></svg>
                  10
                </a>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-center">
              <button class="btn btn-primary px-5">
                ACHETER
              </button>
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