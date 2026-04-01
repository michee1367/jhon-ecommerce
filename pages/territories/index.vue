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
                  Liste de territoires
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
                <div class="card">
                  <div class="table-responsive">
                    <table class="table table-vcenter card-table table-striped">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Nom</th>
                          <th>Superficie (Km)</th>
                          <th>Province</th>
                          <th class="w-1"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="territory in territories">
                          <td >{{ territory.properties.id }}</td>
                          <td >
                            <NuxtLink 
                              :to="{name:'territories-id', params:{id:territory.properties.id}}" 
                              class=""
                              >
                              {{ territory.properties.nom }}
                            </NuxtLink>
                          </td>
                          <td class="text-secondary" >
                            {{ territory.properties.superficie }}
                          </td>
                          <td class="text-secondary" ><a href="#" class="text-reset">{{ territory.properties.nomProvince }}</a></td>
                          
                          <td>
                            <a href="#">Voir</a>
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
        .get("/api/records/territories/all")
        .then((data) => {
          this.territories = data.data;
          //console.log(this.territories)
          //let r = "".localeCompare()
          this.territories = this.territories.sort(
            (a,b) => {
              return a.properties.nom.localeCompare(b.properties.nom)
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
