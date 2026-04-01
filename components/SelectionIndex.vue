<template>
  <div class="container-xl">
        <div class="row row-deck row-cards">
            <div class="col-sm-6 col-lg-3">
                <div class="card bg-azure text-azure-fg">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <div class="">Projets soumis</div>
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
                        <div class="h1 mb-3">20</div>
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
                            <div class="">Projets preselectionnés</div> 
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
                            <div class="">Projets rejetés</div>
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
                            <div class="">Projets séléctionnés</div>
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
            <div class="col-sm-12 col-lg-12">
                <div class="card p-5">

                    <ChartProjectProvHistSelect />
                </div>
            </div>
        </div>
        <div class="row row-deck row-cards my-3">
            <div class="col-sm-6 col-lg-4">
                <div class="card card-sm">
                  <div class="card-body">
                    <div class="row align-items-center">
                      <div class="col-auto">
                        <span class="bg-primary text-white avatar"><!-- Download SVG icon from http://tabler-icons.io/i/currency-dollar -->
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 18l9 -6.462l-9 -5.538v12h18v-12l-9 5.538" /></svg>
                        </span>
                      </div>
                      <div class="col">
                        <div class="font-weight-medium">
                          8
                        </div>
                        <div class="text-secondary">
                          Campagnes
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
            </div>
            <div class="col-sm-6 col-lg-4">
                <div class="card card-sm">
                  <div class="card-body">
                    <div class="row align-items-center">
                      <div class="col-auto">
                        <span class="bg-primary text-white avatar"><!-- Download SVG icon from http://tabler-icons.io/i/currency-dollar -->
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M11.143 17.961c-3.221 -.295 -5.936 -2.281 -8.143 -5.961c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6c-.222 .37 -.449 .722 -.68 1.057" /><path d="M15 19l2 2l4 -4" /></svg>
                        </span>

                      </div>
                      <div class="col">
                        <div class="font-weight-medium">
                          1200
                        </div>
                        <div class="text-secondary">
                          Vues
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
            </div>
            <div class="col-sm-6 col-lg-4">
                <div class="card card-sm">
                  <div class="card-body">
                    <div class="row align-items-center">
                      <div class="col-auto">
                        <span class="bg-primary text-white avatar"><!-- Download SVG icon from http://tabler-icons.io/i/currency-dollar -->
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-user-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4" /><path d="M15 19l2 2l4 -4" /></svg>
                        </span>
                      </div>
                      <div class="col">
                        <div class="font-weight-medium">
                          1500
                        </div>
                        <div class="text-secondary">
                          Personnes touches
                        </div>
                      </div>
                    </div>
                  </div>
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