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
                            :to="{name:'users'}" 
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
                                                <label class="form-label required">Email</label>
                                                <input type="text" class="form-control" name="example-required-input" placeholder="Required..." v-model="payload.email">
                                            </div>
                                            <div class="mb-3">
                                                <div class="form-label">Liste des roles</div>
                                                <select class="form-select"  multiple v-model="payload.roles">
                                                    <option :value="role" v-for="(role, index) in roles" :key="index">{{role}}</option>
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
  
  const roles = ref([])
  const user = ref(null)
  const payload = ref({})
  
  const fetchUser = async () => {
    try {
      const { data } = await Axios.get(`/api/users/${route.params.id}`)
      user.value = data
      payload.value = {
        email: data.email,
        nom: data.nom,
        post_nom: data.post_nom,
        prenom: data.prenom,
        roles: data.roles
      }
      console.log(data)
    } catch (error) {
      router.push({ name: "users" })
      console.log(error)
    }
  }
  
  const fetchRoles = async () => {
    try {
      const { data } = await Axios.get("/api/auth/roles")
      roles.value = data.data
    } catch (err) {
      console.error(err)
    }
  }
  
  const submit = async () => {
    try {
      const resp = await Axios.post(`/api/users/${route.params.id}/update`, payload.value)
      console.log(resp)
      router.push({ name: "users" })
    } catch (error) {
      console.log(error)
    }
  }
  
  // Charger les données au montage
  onMounted(async () => {
    await fetchUser()
    await fetchRoles()
  })
  </script>
  
  <style>
  
  </style>
  