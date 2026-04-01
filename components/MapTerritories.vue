<template>
    <div>
        <div id="map" style="min-height: 600px;"></div>
        {{ territories.length }}
    </div>
</template>
<script>
import L from "leaflet";
  import Axios, { AxiosError } from "axios";

export default {
  props:{
      territories: {type:Array, default:[]}
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
        this.map = L.map("map").setView([-2.5, 23.5], 6);
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
        
        for (let i = 0; i < this.territories.length; i++) {
          const territory = this.territories[i];
          let {data} = await Axios.get(`/api/records/territories/show/${territory.id}/geo`)
          features.push(data)
        }
        if (features[0]) {
          const coodsPoy = features[0].geometry.coordinates[0][0]; // Supposons que les coordonnées soient dans les données
          const coods = coodsPoy[Math.round(coodsPoy.length/2)]
          this.map.setView([coods[1], coods[0]], 7);
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
