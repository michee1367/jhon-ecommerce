<template>
    <div>
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <h2 class="page-title">
                Données rivière
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
    import 'leaflet.vectorgrid';
  
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
      //this.selectedTerritory = this.mapId
      //this.fetchTerritoryDetails()
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

            this.updateMap()
      },
      async updateMap() {
        //if (this.marker) this.map.removeLayer(this.marker);
        //return
        this.map.setView([-2.8797, 23.6560], 7);
                    let geojsonData = {
                        "type": "FeatureCollection",
                        
                    }

        const riversLayer =L.vectorGrid.protobuf('http://localhost:5000/tiles/rivieres/{z}/{x}/{y}.pbf', {
          vectorTileLayerStyles: {
            riviere: {
              weight: 1,
              color: '#0077be',
              opacity: 1,
            }
          },
          maxZoom: 14,
          interactive: true,
          getFeatureId: (feature) => feature.properties.id
        });  
        // Ajoute le popup sur l'événement 'click'
        let map = this.map
        riversLayer.on('click', function (e) {
          const props = e.layer.properties;
          const popupContent = `<b>Nom:</b> ${props.denommination || 'Inconnu'}`;
          L.popup()
            .setLatLng(e.latlng)
            .setContent(popupContent)
            .openOn(map);  
        });

        riversLayer.addTo(map)

      const roadsLayer =L.vectorGrid.protobuf('http://localhost:5000/tiles/routes/{z}/{x}/{y}.pbf', {
        vectorTileLayerStyles: {
          troncon_voie_communication: {
            weight: 1,
            color: '#f2b6b6',
            opacity: 1,
          }
        },
        maxZoom: 14,
        interactive: true,
        getFeatureId: (feature) => feature.properties.id
      });  
      // Ajoute le popup sur l'événement 'click'
      roadsLayer.on('click', function (e) {
        const props = e.layer.properties;
        const popupContent = `<b>Nom:</b> ${props.denommination || 'Inconnu'}(${props.category || 'Inconnu'})`;
        L.popup()
          .setLatLng(e.latlng)
          .setContent(popupContent)
          .openOn(map);  
      });
      roadsLayer.addTo(map)  

      const localitiesLayer =L.vectorGrid.protobuf('http://localhost:5000/tiles/localites/{z}/{x}/{y}.pbf', {
        vectorTileLayerStyles: {
          localities: function(properties, zoom) {
            const type = properties.class || properties.type;
            //console.log(type)
            const colors = {
              national_capital: '#660099',
              city: '#9900cc',
              town: '#c266ff',
              village: '#e0b3ff',
              suburb: '#e0b3ff',
              hamlet: '#e0b3ff',
              island: '#e0b3ff',
              locality: '#e0b3ff',
              farm: '#e0b3ff',
              default: '#e0b3ff',
            };

            return {
              fill: true,
              weight: 0,
              radius: 6,
              fillColor: colors[type] || colors.default,
              fillOpacity: 0.9,
              stroke: false,
            };
          }
        },
        latLngToPoint: function (feature, latlng) {
          console.log("hhfhfhfh")
          return L.circleMarker(latlng, {
            radius: 3,
            fillColor: '#3388ff',
            color: '#000',
            weight: 1,
            fillOpacity: 0.8
          });
        },
        maxZoom: 14,
        interactive: true,
        getFeatureId: (feature) => feature.properties.id
      });

      // Ajoute le popup sur l'événement 'click'
      localitiesLayer.on('click', function (e) {
        console.log("#########{gffgfgfg}##########")
        const props = e.layer.properties;
        const popupContent = `<b>Nom:</b> ${props.nom || 'Inconnu'}(${props.type || 'Inconnu'})`;
        console.log(e) 
        // Convertir les coordonnées du clic en lat/lng
        const latlng = map.containerPointToLatLng(e.containerPoint);
        console.log(e.latlng) 
        L.popup()
          .setLatLng(latlng)
          .setContent(popupContent)
          .openOn(map);  
      });
      localitiesLayer.addTo(map)        

        return             
        let features = []
        let top = false
        let page = 1
        console.log(top)
        while(!top) {
          let url = `http://localhost:5000/all/records/watercourse/?per_page=500&page=${page}`
          let resp = await Axios.get(url)
          let data = resp.data
          features.push(...data.data)
          top = !(data.pagination.has_next)
          page = page + 1
        }

        geojsonData = {
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
            }).addTo(this.map);
        
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
  