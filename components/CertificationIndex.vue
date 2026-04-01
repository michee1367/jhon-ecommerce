<template>
  <div class="container-xl">
        <div class="row row-deck row-cards">
            <div class="col-sm-6 col-lg-3">
                <div class="card bg-azure text-azure-fg">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="">Nombre des Concessions</div>
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
                        <div class="h1 mb-3">10</div>
                        <div class="d-flex mb-2 bg-white">
                            <div class="bg-azure-lt">Evolution</div>
                            <div class="ms-auto bg-lime-lt">
                                <span class=" d-inline-flex align-items-center lh-1">
                                7% <!-- Download SVG icon from http://tabler-icons.io/i/trending-up -->
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon ms-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 17l6 -6l4 4l8 -8" /><path d="M14 7l7 0l0 7" /></svg>
                                </span>
                            </div>
                        </div>
                        <div class="progress progress-sm">
                            <div class="progress-bar bg-primary" style="width: 75%" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" aria-label="75% Complete">
                                <span class="visually-hidden">75% Complete</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-lg-3">
                <div class="card bg-yellow text-yellow-fg">
                    <div class="card-body">
                        <div class="d-flex align-items-center"> 
                            <div class="">Superficie Total</div> 
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
                        <div class="h1 mb-3">1 000 ha</div>
                        <div class="d-flex mb-2 bg-white">
                            <div class="bg-yellow-lt">Evolution</div>
                            <div class="ms-auto bg-lime-lt">
                                <span class=" d-inline-flex align-items-center lh-1">
                                7% <!-- Download SVG icon from http://tabler-icons.io/i/trending-up -->
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon ms-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 17l6 -6l4 4l8 -8" /><path d="M14 7l7 0l0 7" /></svg>
                                </span>
                            </div>
                        </div>
                        <div class="progress progress-sm">
                            <div class="progress-bar bg-primary" style="width: 75%" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" aria-label="75% Complete">
                                <span class="visually-hidden">75% Complete</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-lg-3">
                <div class="card bg-teal text-teal-fg">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="">Superficie exploitée</div>
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
                        <div class="h1 mb-3">600 ha</div>
                        <div class="d-flex mb-2 bg-white">
                            <div class="bg-teal-lt">Evolution</div>
                            <div class="ms-auto bg-lime-lt">
                                <span class=" d-inline-flex align-items-center lh-1">
                                7% <!-- Download SVG icon from http://tabler-icons.io/i/trending-up -->
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon ms-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 17l6 -6l4 4l8 -8" /><path d="M14 7l7 0l0 7" /></svg>
                                </span>
                            </div>
                        </div>
                        <div class="progress progress-sm">
                            <div class="progress-bar bg-primary" style="width: 75%" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" aria-label="75% Complete">
                                <span class="visually-hidden">75% Complete</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-lg-3">
                <div class="card bg-muted text-muted-fg">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="">Superficie non exploitée</div>
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
                        <div class="h1 mb-3">400 ha</div>
                        <div class="d-flex mb-2 bg-white">
                            <div class="bg-muted-lt">Evolution</div>
                            <div class="ms-auto bg-lime-lt">
                                <span class=" d-inline-flex align-items-center lh-1">
                                7% <!-- Download SVG icon from http://tabler-icons.io/i/trending-up -->
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon ms-1" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 17l6 -6l4 4l8 -8" /><path d="M14 7l7 0l0 7" /></svg>
                                </span>
                            </div>
                        </div>
                        <div class="progress progress-sm">
                            <div class="progress-bar bg-primary" style="width: 75%" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" aria-label="75% Complete">
                                <span class="visually-hidden">75% Complete</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row row-deck row-cards my-3">
            <div class="col-md-4">
                <div class="card p-5">
                    <h4>Nombre de Concessions par provinces</h4>

                    <ChartConcessionProvHistCount />
                </div>
            </div>
            <div class="col-md-8">
                <div class="card p-5">
                  <h4>Statistiques des superficies des plantations par provinces</h4>
                    <ChartConcetionProvHistPlant />
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

</template>
<script setup>

</script>