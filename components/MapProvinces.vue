<template>
    <div>
        <div id="map" style="min-height: 600px;"></div>
        
    </div>
</template>
<script>
import L from "leaflet";
  import Axios, { AxiosError } from "axios";

export default {
  props:{
      provinces: {type:Array, default:[]}
  },
    data() {
      return {
        map: null,
        marker: null
      };
    },
    mounted() {
      this.initMap();
      this.fetchCoods()
      //this.fetchTerritories();
    },
    methods: {
        
      initMap() {
        this.map = L.map("map").setView([-2.5, 23.5], 5);
            // Create the tile layer and add it to the map:
            const tile = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                //maxZoom: 100,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(this.map);
      },
      async fetchCoods() {
        let geojsonData = {
            "type": "FeatureCollection",
            
        }
        let features = []
        
        for (let i = 0; i < this.provinces.length; i++) {
          const province = this.provinces[i];
          let {data} = await Axios.get(`/api/records/provinces/show/${province.id}/geo`)
          features.push(data)
        }
        geojsonData.features = features
        let geojsonLayer = L.geoJSON(geojsonData, {
        style: {  
            color: "blue",
            weight: 2,
            fillOpacity: 0.1,
        },
        }).addTo(this.map);
      },
    },

}  
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

