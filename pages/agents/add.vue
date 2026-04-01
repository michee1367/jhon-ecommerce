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
                            :to="{name:'agents'}" 
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
                                                <label class="form-label required">Nom</label>
                                                <input type="text" class="form-control" name="example-required-input" placeholder="Required..." v-model="payload.nom" >
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label required">PostNom</label>
                                                <input type="text" class="form-control" name="example-required-input" placeholder="Required..." v-model="payload.post_nom">
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label required">Prenom</label>
                                                <input type="text" class="form-control" name="example-required-input" placeholder="Required..." v-model="payload.prenom">
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label required">Numero Telephone</label>
                                                <input type="text" class="form-control" name="example-required-input" placeholder="" v-model="payload.numero_tel_agnet">
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Email</label>
                                                <input type="text" class="form-control" name="example-required-input" placeholder="Required..." v-model="payload.email_agent">
                                            </div>
                                            <div class="mb-3">
                                                <div class="form-label">Utilisateurs</div>
                                                <select class="form-select"  multiple v-model="payload.users">
                                                    <option :value="user?.id" v-for="(user, index) in users" :key="index">
                                                      {{user.prenom}} {{user.nom}} {{user.post_nom}}
                                                    </option>
                                                </select>
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
    middleware: ['auth', "agent"]
  })
  
  const route = useRoute()
  const router = useRouter()
  
  const users = ref([])
  const payload = ref({})
  
  const fetchUsers = async () => {
    try {
      const { data } = await Axios.get(`/api/users/`)
      users.value = data.data.sort((a, b) => a.nom.localeCompare(b.nom))
      
    } catch (error) {
      router.push({ name: "agents" })
      console.log(error)
    }
  }
  
  
  const submit = async () => {
    try {
      let users = payload.value?.users??[]
      const resp = await Axios.post(`/api/models/insert/agent`,{props:payload.value})
      console.log(resp)
      let agentId = resp.data?.entityId
      if (agentId) { 
        for (let i = 0; i < users.length; i++) {
          const userId = users[i];
          const resp = await Axios.post(
            `/api/models/insert/utilisateur_lie`,
            {props:{
              utilisateur_id:userId,
              agent_id:agentId
            }}
          )
          
        }

      }
      router.push({ name: "agents" })
    } catch (error) {
      console.log(error)
    }
  }
  
  // Charger les données au montage
  onMounted(async () => {
    await fetchUsers()
  })
  </script>
  
  <style>
  
  </style>
  