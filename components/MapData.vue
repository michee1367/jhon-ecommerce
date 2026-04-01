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
      data: {type:Array, default:[]},
      geomfields:{type:Array, default:[]},
      colors:{type:Array, default:{}},
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
        
        for (let i = 0; i < this.data.length; i++) {
          const item = this.data[i];
          const properties = {}
          for (const key in item) {
            if (this.geomfields.find(v => v == key)) {
              properties[key] = "<geometry>"
            }else {
              properties[key] = item[key]
            }
          }
          let geojsonData = {
              "type": "FeatureCollection",
              
          }
          let features = []
          for (let j = 0; j < this.geomfields.length; j++) {
            const field = this.geomfields[j];
            const value = item[field]
            let {data} = await Axios.post("/api/geom/convert", {geom:value})
            features.push({
              "type": "Feature",
              "geometry": data,
              "properties": properties
            })

          }
          geojsonData.features = features
          let geojsonLayer = L.geoJSON(geojsonData, {
            style: {  
                color: "blue",
                weight: 2,
                fillOpacity: 0.1,
            },
          }).addTo(this.map);
        }
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

