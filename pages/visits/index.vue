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
                    Liste des visites
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
                              :to="{name:'visits-add'}" 
                              class="btn btn-sm btn-primary px-5"
                              >
                              {{ "Ajouter" }}
                          </NuxtLink>
                          <div class="table-responsive">

                            <table class="table table-vcenter card-table table-striped">
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>Visiteur</th>
                                  <th>Agent</th>
                                  <th>objet de la visite</th>
                                  <th>commentaire</th>
                                  <th>date/heure</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="visit in visits">
                                  <td >{{ visit.id }}</td>
                                  <td >{{ visit.agent?.prenom }} {{ visit.agent?.nom }} {{ visit.agent?.post_nom }}</td>
                                  <td>
                                    {{ visit.visiteur?.prenom }} {{ visit.visiteur?.nom }} {{ visit.visiteur?.post_nom }}
                                  </td>
                                  <td class="text-secondary" >
                                    {{ visit.objet }}
                                  </td>
                                  <td class="text-secondary" >
                                    {{ visit.commentaire }}
                                  </td>

                                  <td class="text-secondary" >
                                    {{ formatDate(visit.created_at) }}
                                  </td>
                                  
                                  <td class="text-secondary" >
                                    <button class="btn btn-sm btn-primary mx-2 d-none">Voir</button>
                                    <NuxtLink 
                                        :to="{name:'visits-id-edit', params:{id:visit.id}}" 
                                        class="btn btn-sm btn-warning d-none"
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
  import {changeDate} from '@/tools/date';
  
  // ✅ Déclaration du middleware pour cette page
  definePageMeta({
    middleware: ['auth', "agent"]
  })
  
  const visits = ref([])
  
  const fetchVisits = async () => {
    try {
      //const { data } = await Axios.get("/api/models/records/visit/save?per_page=100")
      const { data } = await Axios.get("/api/visits?per_page=100")
      
      visits.value = data.data
    } catch (err) {
      console.error(err)
    }
  }

  const formatDate = (dateStr) => {
    return changeDate(dateStr)
  }
  
  // Charger les utilisateurs au montage
  onMounted(fetchVisits)
  </script>