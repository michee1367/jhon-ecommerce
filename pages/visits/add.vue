<template>
    <div>
  
      <TopNavbar />
  
      <div class="page-wrapper">
          <!-- Page header -->
          <div class="page-header d-print-none">
            <div class="container-xl">
              <div class="row g-2 align-items-center">
                <div class="col">
                  <h2 class="page-title">
                    
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <!-- Page body -->
          <div class="page-body">
            <div class="container-xl">
                    <div >
                        <NuxtLink 
                            :to="{name:'visits'}" 
                            class="btn btn-sm btn-primary"
                            >
                            {{ "Retour à la liste" }}
                        </NuxtLink>

                    </div>
                    <div class="row row-cards mt-2">
                        <div class="col-6">
                                <form class="card" @submit.prevent="submit">
                                <div class="card-header">
                                    <h4 class="card-title">Modifier utilisateur</h4>
                                </div>
                                <div class="card-body">
                                    <div class="row g-5">
                                    <div class="col-xl-12">
                                        <div class="row">
                                        <div class="col-md-6 col-xl-12">

                                            <div class="mb-3">
                                                <div class="form-label">Agent</div>
                                                <select class="form-select"  v-model="payload.agent_id">
                                                    <option :value="agnet?.id" v-for="(agnet, index) in agents" :key="index">
                                                      {{agnet.prenom}} {{agnet.nom}} {{agnet.post_nom}}
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label required">Objet visite</label>
                                                <input type="text" class="form-control" name="example-required-input" placeholder="Required..." v-model="payload.objet">
                                            </div>
                                            
                                            <div class="mb-3">
                                                <label class="form-label required">Nom visiteur</label>
                                                <input type="text" class="form-control" name="example-required-input" placeholder="Required..." v-model="payload.nom" >
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label required">PostNom visiteur</label>
                                                <input type="text" class="form-control" name="example-required-input" placeholder="Required..." v-model="payload.post_nom">
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label required">Prenom visiteur</label>
                                                <input type="text" class="form-control" name="example-required-input" placeholder="Required..." v-model="payload.prenom">
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label required">Numero Telephone visiteur</label>
                                                <input type="text" class="form-control" name="example-required-input" placeholder="" v-model="payload.numero_tel_visiteur">
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Email visiteur</label>
                                                <input type="text" class="form-control" name="example-required-input" placeholder="Required..." v-model="payload.email_visiteur">
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label required">Commentaire</label>
                                                <textarea v-model="payload.commentaire" class="form-control" name="comment-area" id="comment-area" rows="10"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div class="card-footer text-end">
                                <div class="d-flex">
                                    <a href="#" class="btn btn-link">Annuler</a>
                                    <button class="btn btn-primary ms-auto">Envoyer</button>
                                </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            
          </div>
        </div>
                
    </div>
  </template>
  <script setup>
  import Axios from "axios";
  
  // ✅ Activation du middleware
  definePageMeta({
    middleware: ['auth', "receptionnist"]
  })
  
  const route = useRoute()
  const router = useRouter()
  
  const agents = ref([])
  const payload = ref({})
  
  const fetchAgents = async () => {
    try {
      const { data } = await Axios.get("/api/models/records/agent/save?per_page=100")
      agents.value = data.data.sort((a, b) => a.nom.localeCompare(b.nom))
      
    } catch (error) {
      router.push({ name: "visits" })
      console.log(error)
    }
  }
  
  
  const submit = async () => {
    try {
      let payloadVisitor = {
        props:{
          nom:payload.value?.nom,
          post_nom:payload.value?.post_nom,
          prenom:payload.value?.prenom,
          numero_tel_visiteur:payload.value?.numero_tel_visiteur,
          email_visiteur:payload.value?.email_visiteur
        }
      }
      const resp = await Axios.post(`/api/models/insert/visiteur`,payloadVisitor)
      console.log(resp)
      let visiteur_id = resp.data?.entityId
      if (visiteur_id) { 
        const resp = await Axios.post(
            `/api/models/insert/visit`,
            {props:{
              agent_id:payload.value?.agent_id,
              objet:payload.value?.objet,
              commentaire:payload.value?.commentaire,
              visiteur_id:visiteur_id,
            }}
          )

      }
      router.push({ name: "visits" })
    } catch (error) {
      console.log(error)
    }
  }
  
  // Charger les données au montage
  onMounted(async () => {
    await fetchAgents()
  })
  </script>
  
  <style>
  
  </style>
  