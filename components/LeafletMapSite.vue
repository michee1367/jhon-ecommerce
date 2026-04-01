<template>
    <div>
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center" v-if="resource">
            <div class="col">
              
                <h1 class="text-2xl font-bold mb-4 capitalize text-on-forest">Liste des {{getNormalNameTableLocal(resource)}}s</h1>
                <NuxtLink :to="`/${org}/modules/${moduleId}/${table}/add`" class="btn btn-sm btn-primary px-5">Ajouter</NuxtLink>
            </div>
          </div>
          <div class="row g-2 align-items-center">
            <div class="col">
              <h2 class="page-title">
                Cartographie
              </h2>

              <div id="map" style="min-height: 600px;"></div>
            </div>
          </div>
        </div>
      </div>
  
    </div>
  </template>
  
  <script>
  import L from "leaflet";
    import Axios, { AxiosError } from "axios";
    import { getNormalNameField, getNormalNameTable } from "@/tools/ressources";
  
  export default {
    props:{
        mapId: {type:String, default:null},
        org: {type:String, default:null},
        moduleId: {type:String, default:null},
        table: {type:String, default:null},
        
        queries: {type:String, default:null},
    },
    data() {
      return {
        resource:null,
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
      //this.selectedTerritory = this.mapId
      //this.fetchTerritoryDetails()
      this.load()
      //this.fetchTerritories();
    },
    methods: {
      async load() {
        
        let {data} = await Axios.get("/api/models/all")
        Object.keys(data).forEach(
          (key) => {
            console.log(this.table)
            if (key == this.table) {
              this.resource = data[key]
              this.initMap();
              //fields.value = Object.keys(data[key]?.fields??{})
              //middlware_actions.value = data[key]?.middlware_actions??null
              console.log("##########################")
              //console.log(fields.value)
              console.log("##########################")
            }
          }
        ) 
      },

      getNormalNameTableLocal(resource) {
        return getNormalNameTable(resource)
      },
      initMap() {
        this.map = L.map("map").setView([-2.5, 23.5], 6);
            // Create the tile layer and add it to the map:
            const tile = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                //maxZoom: 100,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(this.map);

            this.updateMap()
      },
      async updateMap() {
        //if (this.marker) this.map.removeLayer(this.marker);
        //return
        this.map.setView([-2.8797, 23.6560], 7);
        let geojsonData = {
            "type": "FeatureCollection",
            
        }
        let features = []
        let top = false
        let page = 1
        //console.log(top)
        /*while(!top) {
          let url = `http://localhost:5000/all/records/watercourse/?per_page=500&page=${page}`
          let resp = await Axios.get(url)
          let data = resp.data
          features.push(...data.data)
          top = !(data.pagination.has_next)
          page = page + 1
        }*/

        /*geojsonData = {
          "type": "FeatureCollection",
          "name": "cours_d'eau_principaux",
          "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::3395" } },
          "features":features
        }
        console.log(geojsonData)




        let geojsonLayer = L.geoJSON(geojsonData, {
            style: {
                color: "#98bde2",
                weight: 2,
                fillOpacity: 0.1,
            },
            }).addTo(this.map);*/
        
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
  