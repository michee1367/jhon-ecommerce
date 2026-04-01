<template>
    <div>
  
      <TopNavbar />
      
      <NuxtLink :to="{name:'index'}" class="btn btn-sm btn-outline- secondary my-2 mx-2 px-5">Retour</NuxtLink>
      <div class="page-wrapper" v-if="territories.length">
          <!-- Page header -->
          <div class="page-header d-print-none">
            <div class="container-xl">
              <div class="row g-2 align-items-center">
                <div class="col">
                  <h2 class="page-title">
                    Liste de territoire de {{ territories[0].nomProvince }}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <!-- Page body -->
          <div class="page-body" v-if="territories.length">
            <div class="container-xl">
              <div class="row row-cards">
                <div class="col-4">
                  <div class="card" style="height: 40rem">
                    <div class="card-body card-body-scrollable card-body-scrollable-shadow">
                      <div class="divide-y">
                        <div>
                          <div class="table-responsive">
                            <table class="table table-vcenter card-table table-striped">
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>Nom</th>
                                  <th>Superficie (Km)</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="territory in territories">
                                  <td >{{ territory.id }}</td>
                                  <td >
                                    <NuxtLink 
                                      :to="{name:'territories-id', params:{id:territory.id}}" 
                                      class=""
                                      >
                                      {{ territory.nom }}
                                    </NuxtLink>
                                  </td>
                                  <td class="text-secondary" >
                                    {{ territory.superficie }}
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
                <div class="col-8">
                  <div class="card">
                    
                        <ClientOnly fallback-tag="span" fallback="Loading comments...">
                            <MapTerritories v-if="territories.length" :territories="territories" />
                        </ClientOnly>
                  </div>
                </div>
  
              </div>
            </div>
          </div>
        </div>
                
    </div>
  </template>
  
  <script>
    import Axios, { AxiosError } from "axios";
  
  export default {
    data() {
      return {
        territories: [],
      };
    },
    mounted() {
      this.fetchTerritories();
    },
    methods: { 
      
      fetchTerritories() {
        Axios
          .get(`/api/records/provinces/contents/${this.$route.params.id}/territories`)
          .then((data) => {
            this.territories = data.data.data;
            //console.log(this.territories)
            //let r = "".localeCompare()
            this.territories = this.territories.sort(
              (a,b) => {
                return a.nom.localeCompare(b.nom)
              }
            )
  
            
          })
          .catch((err) => {
            console.error(err);
          });
      },
    },
  };
  </script>
  
  <style>
  
  </style>
  