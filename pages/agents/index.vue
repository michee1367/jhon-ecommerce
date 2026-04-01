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
                    Liste des utilisateurs
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <!-- Page body -->
          <div class="page-body">
            <div class="container-xl">
              <div class="row row-cards">
                <div class="col-12">
                  <div class="card" style="height: 40rem">
                    <div class="card-body card-body-scrollable card-body-scrollable-shadow">
                      <div class="divide-y">
                        <div>
                          <NuxtLink 
                              :to="{name:'agents-add'}" 
                              class="btn btn-sm btn-primary px-5"
                              >
                              {{ "Ajouter" }}
                          </NuxtLink>
                          <div class="table-responsive">

                            <table class="table table-vcenter card-table table-striped">
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>Nom</th>
                                  <th>PostNom</th>
                                  <th>Prenom</th>
                                  <th>Email</th>
                                  <th>ROLE</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="agent in agents">
                                  <td >{{ agent.id }}</td>
                                  <td>
                                    {{ agent.nom }}
                                  </td>
                                  <td class="text-secondary" >
                                    {{ agent.post_nom }}
                                  </td>
                                  <td class="text-secondary" >
                                    {{ agent.prenom }}
                                  </td>
                                  <td class="text-secondary" >
                                    {{ agent.email }}
                                  </td>
                                  <td class="text-secondary" >
                                    <span v-for="(role, index) in agent.roles" :key="index">{{role}} <span v-if="index +1 != agent.roles.length">,</span></span>
                                  </td>
                                  <td class="text-secondary" >
                                    <button class="btn btn-sm btn-primary mx-2">Voir</button>
                                    <NuxtLink 
                                        :to="{name:'agents-id-edit', params:{id:agent.id}}" 
                                        class="btn btn-sm btn-warning"
                                        >
                                        {{ "Modifier" }}
                                    </NuxtLink>
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
        </div>
                
    </div>
  </template>
  <script setup>
  import Axios from "axios";
  import TopNavbar from '~/components/TopNavbar.vue'
  
  // ✅ Déclaration du middleware pour cette page
  definePageMeta({
    middleware: ['auth', "admin"]
  })
  
  const agents = ref([])
  
  const fetchAgents = async () => {
    try {
      const { data } = await Axios.get("/api/models/records/agent/save?per_page=100")
      agents.value = data.data.sort((a, b) => a.nom.localeCompare(b.nom))
    } catch (err) {
      console.error(err)
    }
  }
  
  // Charger les utilisateurs au montage
  onMounted(fetchAgents)
  </script>