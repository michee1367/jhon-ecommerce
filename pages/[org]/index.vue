<template>
    <div class="page">
        <TopBar/>
        <Topbar2/>

        <div class="page-wrapper">

            <div class="page-body">
            <div class="container-xl">
                    <h2 class="text-secondary">TABLEAU DE BORD</h2>
                    <div class="row row-deck row-cards">
                        <div class="col-sm-6 col-lg-3">
                            <div class="card bg-muted-lt">
                                <div class="card-body">
                                    <div class="d-flex align-items-center">
                                        <div class="">ACTEURS CONSULTÉS</div>
                                        <div class="ms-auto lh-1" v-if="false">
                                            <div class="dropdown">
                                            <a class="dropdown-toggle text-secondary" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Last 7 days</a>
                                            <div class="dropdown-menu dropdown-menu-end">
                                                <a class="dropdown-item active" href="#">Last 7 days</a>
                                                <a class="dropdown-item" href="#">Last 30 days</a>
                                                <a class="dropdown-item" href="#">Last 3 months</a>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="h1 mb-3">0</div>
                                    <div class="d-flex mb-2 bg-white">
                                        <div class="bg-muted-lt">Evolution</div>
                                        <div class="ms-auto bg-lime-lt">
                                            <span class=" d-inline-flex align-items-center lh-1">
                                            0% <!-- bg-muted Download SVG icon from http://tabler-icons.io/i/trending-up -->
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon ms-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 17l6 -6l4 4l8 -8" /><path d="M14 7l7 0l0 7" /></svg>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="progress progress-sm">
                                        <div class="progress-bar bg-primary" style="width: 0%" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" aria-label="0% Complete">
                                            <span class="visually-hidden">0% Complete</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-lg-3">
                            <div class="card bg-muted-lt">
                                <div class="card-body">
                                    <div class="d-flex align-items-center">
                                        <div class="">PROJETS SÉLECTIONNÉS </div>
                                        <div class="ms-auto lh-1" v-if="false">
                                            <div class="dropdown">
                                            <a class="dropdown-toggle text-secondary" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Last 7 days</a>
                                            <div class="dropdown-menu dropdown-menu-end">
                                                <a class="dropdown-item active" href="#">Last 7 days</a>
                                                <a class="dropdown-item" href="#">Last 30 days</a>
                                                <a class="dropdown-item" href="#">Last 3 months</a>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="h1 mb-3">0</div>
                                    <div class="d-flex mb-2 bg-white">
                                        <div class="bg-muted-lt">Evolution</div>
                                        <div class="ms-auto bg-lime-lt">
                                            <span class=" d-inline-flex align-items-center lh-1">
                                            0% <!-- Download SVG icon from http://tabler-icons.io/i/trending-up -->
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon ms-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 17l6 -6l4 4l8 -8" /><path d="M14 7l7 0l0 7" /></svg>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="progress progress-sm">
                                        <div class="progress-bar bg-primary" style="width: 0%" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" aria-label="0% Complete">
                                            <span class="visually-hidden">0% Complete</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-lg-3">
                            <div class="card bg-muted-lt">
                                <div class="card-body">
                                    <div class="d-flex align-items-center">
                                        <div class="">CONCESSIONS CERTIFIÉES </div>
                                        <div class="ms-auto lh-1" v-if="false">
                                            <div class="dropdown">
                                            <a class="dropdown-toggle text-secondary" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Last 7 days</a>
                                            <div class="dropdown-menu dropdown-menu-end">
                                                <a class="dropdown-item active" href="#">Last 7 days</a>
                                                <a class="dropdown-item" href="#">Last 30 days</a>
                                                <a class="dropdown-item" href="#">Last 3 months</a>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="h1 mb-3">0</div>
                                    <div class="d-flex mb-2 bg-white">
                                        <div class="bg-muted-lt">Evolution</div>
                                        <div class="ms-auto bg-lime-lt">
                                            <span class=" d-inline-flex align-items-center lh-1">
                                            0% <!-- Download SVG icon from http://tabler-icons.io/i/trending-up -->
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon ms-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 17l6 -6l4 4l8 -8" /><path d="M14 7l7 0l0 7" /></svg>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="progress progress-sm">
                                        <div class="progress-bar bg-primary" style="width: 0%" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" aria-label="0% Complete">
                                            <span class="visually-hidden">0% Complete</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 col-lg-3">
                            <div class="card bg-muted-lt">
                                <div class="card-body">
                                    <div class="d-flex align-items-center">
                                        <div class="">CONTRATS FBR SIGNÉS</div>
                                        <div class="ms-auto lh-1" v-if="false">
                                            <div class="dropdown">
                                            <a class="dropdown-toggle text-secondary" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Last 7 days</a>
                                            <div class="dropdown-menu dropdown-menu-end">
                                                <a class="dropdown-item active" href="#">Last 7 days</a>
                                                <a class="dropdown-item" href="#">Last 30 days</a>
                                                <a class="dropdown-item" href="#">Last 3 months</a>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="h2 mb-3">0</div>
                                    <div class="d-flex mb-2 bg-white">
                                        <div class="bg-muted-lt">Evolution</div>
                                        <div class="ms-auto bg-lime-lt">
                                            <span class=" d-inline-flex align-items-center lh-1">
                                            0% <!-- Download SVG icon from http://tabler-icons.io/i/trending-up -->
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon ms-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 17l6 -6l4 4l8 -8" /><path d="M14 7l7 0l0 7" /></svg>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="progress progress-sm">
                                        <div class="progress-bar bg-primary" style="width: 0%" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" aria-label="0% Complete">
                                            <span class="visually-hidden">0% Complete</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row row-deck row-cards my-3">
                        <div class="col-sm-6 col-lg-4">
                            <div class="card card-sm bg-muted-lt">
                            <div class="card-body">
                                <div class="row align-items-center">
                                <div class="col-auto">
                                    <span class="bg-primary text-white avatar"><!-- Download SVG icon from http://tabler-icons.io/i/currency-dollar -->
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2" /><path d="M12 3v3m0 12v3" /></svg>
                                    </span>
                                </div>
                                <div class="col">
                                    <div class="font-weight-medium">
                                    0 USD
                                    </div>
                                    <div class="text-secondary">
                                        MONTANT GLOBAL DES CONTRATS FBR
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            
                        </div>
                        <div class="col-sm-6 col-lg-4">
                            <div class="card card-sm bg-muted-lt">
                            <div class="card-body">
                                <div class="row align-items-center">
                                <div class="col-auto">
                                    <span class="bg-primary text-white avatar"><!-- Download SVG icon from http://tabler-icons.io/i/currency-dollar -->
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M2 9a10 10 0 1 0 20 0" /><path d="M12 19a10 10 0 0 1 10 -10" /><path d="M2 9a10 10 0 0 1 10 10" /><path d="M12 4a9.7 9.7 0 0 1 2.99 7.5" /><path d="M9.01 11.5a9.7 9.7 0 0 1 2.99 -7.5" /></svg>
                                    </span>
                                </div>
                                <div class="col">
                                    <div class="font-weight-medium">
                                    0 ha
                                    </div>
                                    <div class="text-secondary">
                                        SUPERFICIE GLOBALE DES PLANTATIONS 
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            
                        </div>
                        <div class="col-sm-6 col-lg-4">
                            <div class="card card-sm bg-muted-lt">
                            <div class="card-body">
                                <div class="row align-items-center">
                                <div class="col-auto">
                                    <span class="bg-primary text-white avatar"><!-- Download SVG icon from http://tabler-icons.io/i/currency-dollar -->
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-file-dislike"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 15a1 1 0 0 1 1 -1h1a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-1a1 1 0 0 1 -1 -1l0 -3" /><path d="M6 15a1 1 0 0 1 1 -1h3.756a1 1 0 0 1 .958 .713l1.2 3c.09 .303 .133 .63 -.056 .884c-.188 .254 -.542 .403 -.858 .403h-2v2.467a1.1 1.1 0 0 1 -2.015 .61l-1.985 -3.077v-4" /><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M5 11v-6a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-2.5" /></svg>
                                    </span>
                                </div>
                                <div class="col">
                                    <div class="font-weight-medium">
                                    0
                                    </div>
                                    <div class="text-secondary">
                                        PLAINTES REÇUES 
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="row row-deck row-cards my-3">
                        <div class="col-sm-8 col-lg-8">
                            <div class="card p-5">

                                <ChartProjectProvHist />
                            </div>
                        </div>
                        <div class="col-sm-4 col-lg-4">
                            <div class="card p-5">

                                <ChartProjectProvDonut />
                            </div>
                        </div>
                    </div>
                    <div class="row row-deck row-cards my-3">
                        <div class="col-sm-12 col-lg-12">
                            <div class="card p-5">
                                <ClientOnly fallback-tag="span" fallback="Loading comments...">
                                    <LeafletMapGlobal :mapId="$route.params.id" />
                                </ClientOnly>

                            </div>
                        </div>
                    </div>

                    

                </div>
            </div>
        </div>
    </div>

</template>
<script setup>

import  axios from "axios"

const indicateurs = ref()

const dataDefault = {
    "indicateurs_1" : {
        "promoteurs":0,
        "concessions":0,
        "projets_retenu":0,
        "contrats_fbr":0
    },
    "indicateurs_2" : {
        "montants":0,
        "superficie_total":0,
        "plaintes_recus":0
    },
    "indicateurs_3" : {
        "kinshasa" : {
            "promoteurs":0,
            "concessions":0,
            "projets_retenu":0,
            "contrats_fbr":0
        },
        "kongo-centrale" : {
            "promoteurs":0,
            "concessions":0,
            "projets_retenu":0,
            "contrats_fbr":0
        },
        "haut-katanga" : {
            "promoteurs":0,
            "concessions":0,
            "projets_retenu":0,
            "contrats_fbr":0
        },
        "equateur" : {
            "promoteurs":0,
            "concessions":0,
            "projets_retenu":0,
            "contrats_fbr":0
        }
    }
}

definePageMeta({
layout: false,
middleware: ['auth']
})

onMounted(async () => {
  await load()
})

const load = async () =>  {
    await loadData()
}
const loadData = async () =>  {
  //http://localhost:3000/data/dashboad/global.json
    let {data} = await axios.get("/data/dashboad/global.json")
    console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\")
    console.log(data)
    console.log("\\\\\\\\\\\\\\\\\\\\\\\\\\\\")
}

</script>