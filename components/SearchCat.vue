<template>
    <div>

        <div class="row">
            <div class="col-md-4">
                <select id="categorie" class="form-select" v-model="categorie">
                    <option value="">Choisir une catégorie</option>

                    <option
                    v-for="cat in categories"
                    :key="cat"
                    :value="cat"
                    >
                    {{ cat }}
                    </option>

                </select>
                
            </div>
            <div class="col-md-4">
                <div class="bg-white p-2 border">
                    <select id="souscategorie" class="form-select" v-model="sousCategorie">

                        <option value="">Choisir une sous catégorie</option>

                        <option
                        v-for="sub in sousCategoriesFiltered"
                        :key="sub"
                        :value="sub"
                        >
                        {{ sub }}
                        </option>

                    </select>

                </div>
                
            </div>
            <div class="col-md-4 d-flex align-items-center">
                <button class="btn px-5 btn-primary">RECHERCHER</button>                
            </div>
        </div>
   
    </div>
</template>
<script setup>
  import { useProjectStore } from "@/stores/project";
  import "tom-select/dist/css/tom-select.css"
  const projectStore = useProjectStore()
  const projects = ref([])
  const { getAll } = useApi()
  const emit = defineEmits(["project_choose"])
  import TomSelect from "tom-select"
  
  onMounted(async () => {
    await loadSearch()
  })
    import { ref, computed } from "vue"

    const categorie = ref("")
    const sousCategorie = ref("")


    const categories = [
    "Moteur",
    "Filtration",
    "Freinage",
    "Suspension",
    "Direction",
    "Transmission",
    "Électricité",
    "Éclairage",
    "Refroidissement",
    "Carrosserie",
    "Échappement",
    "Intérieur",
    "Accessoires"
    ]

    const sousCategories = {
    Moteur: [
        "Bloc moteur",
        "Pistons",
        "Segments",
        "Culasse"
    ],
    Filtration: [
        "Filtre à huile",
        "Filtre à air",
        "Filtre à carburant",
        "Filtre habitacle"
    ],
    Freinage: [
        "Disques de frein",
        "Plaquettes de frein",
        "Tambours",
        "Étriers"
    ],
    Suspension: [
        "Amortisseurs",
        "Ressorts",
        "Bras de suspension",
        "Rotules"
    ],
    Direction: [
        "Crémaillère",
        "Pompe direction",
        "Biellette direction"
    ],
    Transmission: [
        "Boîte de vitesses",
        "Embrayage",
        "Volant moteur",
        "Cardans"
    ],
    Électricité: [
        "Batterie",
        "Alternateur",
        "Démarreur",
        "Bobines"
    ],
    Éclairage: [
        "Phares avant",
        "Feux arrière",
        "Clignotants",
        "Ampoules"
    ],
    Refroidissement: [
        "Radiateur",
        "Thermostat",
        "Pompe à eau",
        "Ventilateur"
    ],
    Carrosserie: [
        "Pare-chocs",
        "Capot",
        "Ailes",
        "Portières"
    ],
    Échappement: [
        "Pot d’échappement",
        "Catalyseur",
        "Silencieux"
    ],
    Intérieur: [
        "Tableau de bord",
        "Sièges",
        "Ceintures"
    ],
    Accessoires: [
        "Rétroviseurs",
        "Essuie-glaces",
        "Tapis voiture"
    ]
    }

    const sousCategoriesFiltered = computed(() => {
    return sousCategories[categorie.value] || []
    })


  const loadSearch = async () => {
    let select = new TomSelect("#categorie",{
            create:false,
            sortField:"text",
    		copyClassesToDropdown: false,
    		dropdownParent: 'body',
    		controlInput: '<input>',
    		render:{
    			item: function(data,escape) {
    				if( data.customProperties ){
    					return '<div><span class="dropdown-item-indicator">' + data.customProperties + '</span>' + escape(data.text) + '</div>';
    				}
    				return '<div>' + escape(data.text) + '</div>';
    			},
    			option: function(data,escape){
    				if( data.customProperties ){
    					return '<div><span class="dropdown-item-indicator">' + data.customProperties + '</span>' + escape(data.text) + '</div>';
    				}
    				return '<div>' + escape(data.text) + '</div>';
    			},
    		},
    	})
  }

</script>