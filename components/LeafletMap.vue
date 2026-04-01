<template>
    <div>
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <NuxtLink  v-if="territoryDetails" :to="{name:'provinces-id-territories', params:{id:territoryDetails.idProvince}}" class="btn btn-sm btn-outline- secondary my-2 mx-2 px-5">Retour</NuxtLink>
              <h2 class="page-title">
                Données territoire {{ territoryDetails?.nom }}
              </h2>
              <div id="map" style="min-height: 600px;"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="page-body" v-if="territoryDetails">
        <div class="container-xl">
          <!-- Page body -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Information Générale</h3>
            </div>
            <div class="card-body">
              <div class="datagrid">
                <div class="datagrid-item">
                  <div class="datagrid-title">ID</div>
                  <div class="datagrid-content">{{ territoryDetails.id }}</div>
                </div>
                <div class="datagrid-item">
                  <div class="datagrid-title">Nom</div>
                  <div class="datagrid-content">{{ territoryDetails.nom }}</div>
                </div>
                <div class="datagrid-item">
                  <div class="datagrid-title">Province</div>
                  <div class="datagrid-content">{{ territoryDetails.nomProvince }}</div>
                </div>
                <div class="datagrid-item">
                  <div class="datagrid-title">Superficie (Km)</div>
                  <div class="datagrid-content">{{ territoryDetails.superficie }}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- Page body -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Demande en électricité</h3>
            </div>
            <div class="card-body">
              <table class="table table-vcenter card-table table-striped">
                <thead>
                  <tr>
                    <th>Année</th>
                    <th>Demande menages (Kw)</th>
                    <th>population</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="demand in demands">
                    <td >{{ demand.annee }}</td>
                    <td class="text-secondary" >
                      {{ demand.demande_menages_kw }}
                    </td>
                    <td class="text-secondary" >{{ demand.population }}</td>
                    
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- Page body -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Liste des centrales</h3>
            </div>
            <div class="card-body">
              <table class="table table-vcenter card-table table-striped">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Type</th>
                    <th>Puissance (Kw)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="central in centrals">
                    <td >{{ central.properties.nom }}</td>
                    <td class="text-secondary" >
                      {{ central.properties.type_centrale }}
                    </td>
                    <td class="text-secondary" >{{ central.properties.puissance_dispo_kw }}</td>
                    
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- Page body -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Liste des projet planifiés</h3>
            </div>
            <div class="card-body">
              <table class="table table-vcenter card-table table-striped">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Puissance (Kw)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="project in projectPanned">
                    <td >{{ project.properties.nom }}</td>
                    <td class="text-secondary" >
                      {{ project.properties.puissance_planifiee_kw }}
                    </td>
                    
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- Page body -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Liste des projet programmé </h3>
            </div>
            <div class="card-body">
              <table class="table table-vcenter card-table table-striped">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Puissance (Kw)</th>
                    <th>Etat</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="project in projectProgram">
                    <td >{{ project.properties.nom }}</td>
                    <td class="text-secondary" >
                      {{ project.properties.puissance_kw }}
                    </td>
                    <td >{{ project.properties.etat_projet }}</td>
                    
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  
    </div>
  </template>
  
  <script>
  import L from "leaflet";
    import Axios, { AxiosError } from "axios";
  
  export default {
    props:{
        mapId: {type:String, default:null}
    },
    data() {
      return {
        map: null,
        marker: null,
        territories: [],
        selectedTerritory: "",
        territoryDetails: null,
        centrals: [],
        projectPanned: [],
        projectProgram: [],
        demands: [],
      };
    },
    mounted() {
      //console.log(this.mapId)
      this.selectedTerritory = this.mapId
      this.fetchTerritoryDetails()
      this.initMap();
      //this.fetchTerritories();
    },
    methods: {
      initMap() {
        this.map = L.map("map").setView([-2.5, 23.5], 6);
            // Create the tile layer and add it to the map:
            const tile = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                //maxZoom: 100,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(this.map);
      },
      fetchTerritories() {
        Axios
          .get("/api/records/territories/all")
          .then((data) => {
            this.territories = data.data;
            console.log(this.territories)
          })
          .catch((err) => {
            console.error(err);
          });
      },
      fetchTerritoryDetails() {
        if (!this.selectedTerritory) {
          this.territoryDetails = [];
          this.clearMap();
          return;
        }
        this.demands = []
        Axios.get(`/api/records/territories/show/${this.selectedTerritory}/geo`)
          .then((data) => {
            this.territoryDetails = data.data.properties;
            const coodsPoy = data.data.geometry.coordinates[0][0]; // Supposons que les coordonnées soient dans les données
            const coods = coodsPoy[Math.round(coodsPoy.length/2)] 
            console.log(coods)
            this.updateMap(coods[1], coods[0], 7, data.data);


          })
          .catch((err) => {
            console.error(err);
          });

        Axios.get(`/api/records/territories/contents/${this.selectedTerritory}/demands`)
          .then((data) => {
            this.demands = data.data.data;

          })
          .catch((err) => {
            console.error(err);
          });
      },
      updateMap(lat, lng, zoomLevel, dataTerr) {
        //if (this.marker) this.map.removeLayer(this.marker);
        this.map.setView([lat, lng], zoomLevel);
                    let geojsonData = {
                        "type": "FeatureCollection",
                        
                    }
            let features = [
                    dataTerr
                ]
            Axios.get(`/api/records/territories/contents/${this.selectedTerritory}/existing-plans`)
                .then((data) => {
                    this.centrals = data.data.data
                    console.log(this.centrals)
                    data.data.data.forEach(
                        (item) => {
                            const coods = item.geometry.coordinates; // Supposons que les coordonnées soient dans les données
                            console.log(item)
                            //features.push(item)
                            let iconUrl = '/img/electric-factory.png'
                            if (item.properties.type_centrale == "Hydro") {
                              iconUrl = '/img/hydro-power.png'
                            }else if(item.properties.type_centrale == "Thermique") {
                              iconUrl = '/img/thermal.png'
                            }else if(item.properties.type_centrale == "PV") {
                              iconUrl = '/img/solar-energy.png'
                            }
                              var powerPlantIcon = L.icon({
                                iconUrl: iconUrl,
                                shadowUrl: '/img/marker-shadow.png',

                                iconSize:     [20, 48], // size of the icon electric-factory.png
                                shadowSize:   [15, 32], // size of the shadow
                                iconAnchor:   [11, 48], // point of the icon which will correspond to marker's location
                                shadowAnchor: [2, 31],  // the same for the shadow
                                popupAnchor:  [-2, -38] // point from which the popup should open relative to the iconAnchor
                            });
                            /*L.marker(coods[1], coods[0])
                                .addTo(this.map)
                                .bindPopup(`Centrale`)
                                .openPopup();
                                */

                             L.marker([coods[1], coods[0]], {icon: powerPlantIcon}).addTo(this.map)
                                  .bindPopup(`Centrale ${ item.properties.nom } de type ${ item.properties.type_centrale }, avec une puissance: ${ item.properties.puissance_dispo_kw } Kw`)
                                  //.openPopup();

                        }
                    )

                    geojsonData.features = features 

                    let geojsonLayer = L.geoJSON(geojsonData, {
                    style: {
                        color: "blue",
                        weight: 2,
                        fillOpacity: 0.1,
                    },
                    }).addTo(this.map);
                })
                .catch((err) => {
                    console.error(err);
                });


            Axios.get(`/api/records/territories/contents/${this.selectedTerritory}/projects/plan`)
                .then((data) => {
                    this.projectPanned = data.data.data
                    //console.log(this.centrals)
                    data.data.data.forEach(
                        (item) => {
                            const coods = item.geometry.coordinates; // Supposons que les coordonnées soient dans les données
                            console.log(item)
                            //features.push(item)
                            let iconUrl = '/img/innovation2.png'
                              var powerPlantIcon = L.icon({
                                iconUrl: iconUrl,
                                shadowUrl: '/img/marker-shadow.png',

                                iconSize:     [20, 48], // size of the icon electric-factory.png
                                shadowSize:   [15, 32], // size of the shadow
                                iconAnchor:   [11, 48], // point of the icon which will correspond to marker's location
                                shadowAnchor: [2, 31],  // the same for the shadow
                                popupAnchor:  [-2, -38] // point from which the popup should open relative to the iconAnchor
                            });
                            /*L.marker(coods[1], coods[0])
                                .addTo(this.map)
                                .bindPopup(`Centrale`)
                                .openPopup();
                                */

                             L.marker([coods[1], coods[0]], {icon: powerPlantIcon}).addTo(this.map)
                                  .bindPopup(`Projet  ${ item.properties.nom }, avec une puissance planifier de ${ item.properties.puissance_planifiee_kw } Kw`)
                                  //.openPopup();

                        }
                    )

                    geojsonData.features = features 

                    let geojsonLayer = L.geoJSON(geojsonData, {
                    style: {
                        color: "blue",
                        weight: 2,
                        fillOpacity: 0.005,
                    },
                    }).addTo(this.map);
                })
                .catch((err) => {
                    console.error(err);
                });

                Axios.get(`/api/records/territories/contents/${this.selectedTerritory}/projects/program`)
                    .then((data) => {
                        this.projectProgram = data.data.data
                        //console.log(this.centrals)
                        data.data.data.forEach(
                            (item) => {
                                const coods = item.geometry.coordinates; // Supposons que les coordonnées soient dans les données
                                console.log(item)
                                //features.push(item)
                                let iconUrl = '/img/idea-bulb.png'
                                  var powerPlantIcon = L.icon({
                                    iconUrl: iconUrl,
                                    shadowUrl: '/img/marker-shadow.png',

                                    iconSize:     [20, 48], // size of the icon electric-factory.png
                                    shadowSize:   [15, 32], // size of the shadow
                                    iconAnchor:   [11, 48], // point of the icon which will correspond to marker's location
                                    shadowAnchor: [2, 31],  // the same for the shadow
                                    popupAnchor:  [-2, -38] // point from which the popup should open relative to the iconAnchor
                                });
                                /*L.marker(coods[1], coods[0])
                                    .addTo(this.map)
                                    .bindPopup(`Centrale`)
                                    .openPopup();
                                    */

                                L.marker([coods[1], coods[0]], {icon: powerPlantIcon}).addTo(this.map)
                                      .bindPopup(`Projet  ${ item.properties.nom } (Programmé), avec une puissance de ${ item.properties.puissance_kw } Kw (${item.properties.etat_projet})`)
                                      //.openPopup();

                            }
                        )

                        geojsonData.features = features 

                        let geojsonLayer = L.geoJSON(geojsonData, {
                        style: {
                            color: "blue",
                            weight: 2,
                            fillOpacity: 0.005,
                        },
                        }).addTo(this.map);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
        
      },
      clearMap() {
        if (this.marker) {
          this.map.removeLayer(this.marker);
          this.marker = null;
        }
      },
    },
  };
  </script>
  
  <style>

    @import 'leaflet/dist/leaflet.css';

    .map {
    height: 100vh;
    width: 100%;
    overflow: hidden;
    }

    .leaflet-attribution-flag {
    display: none !important;
    }
  </style>
  