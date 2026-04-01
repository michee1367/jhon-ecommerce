<template>
    <div>
      <div class="row">
        <div class="col-md-4 d-flex justify-content-center">
          <div class="">
            <!--<div class="empty-img"><img src="/public/static/illustrations/undraw_printing_invoices_5r4r.svg" width="256" alt="">-->
            <div class="empty-img"><img src="/public/img/certification_concession.webp" width="320" alt="">
            </div>
            <p v-if="false" class="empty-title">No results found</p>
            <p v-if="false" class="empty-subtitle text-secondary">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <div v-if="false" class="empty-action">
              <a href="./." class="btn btn-primary">
                <!-- Download SVG icon from http://tabler-icons.io/i/plus -->
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                Add your first client
              </a>
            </div>
          </div>
        </div>
        <div class="col-md-8 d-flex align-items-center">
          <p class="p-0">
            Après la sélection des projets, Nous allons procèder à la certification de la concession 
            afin de vérifier physiquement l’existence et la conformité du site. Une application de collecte de données est utilisée 
            pour enregistrer les informations terrain (localisation, superficie, photos, coordonnées GPS). Cette étape confirme 
            que la concession correspond bien au projet retenu avant le démarrage des activités d’agroforesterie.
          </p>
        </div>


        
        <div class="row mt-5">

          <div class="col-md-4 d-flex align-items-center">
            <div>
              <div class="empty-img"><img src="/public/img/certification_1.webp" width="176" alt=""></div>
              <h4>Validation terrain et crédibilité du projet</h4>
              <p>
                La vérification physique permet de confirmer que les informations déclarées correspondent à la réalité du terrain.
                Elle renforce la crédibilité du projet auprès du bailleur et sécurise la décision d’investissement.
              </p>
            </div>
          </div>
          <div class="col-md-4 d-flex align-items-center">
            <div>
              <div class="empty-img"><img src="/public/img/certification_2.webp" width="176" alt=""></div>
              <h4>Données fiables et traçables grâce à l’application</h4>
              <p>
                L’application de collecte garantit des données géoréférencées, horodatées et documentées (photos, formulaires). Cela réduit 
                les erreurs, facilite l’archivage et permet un suivi transparent du projet dans le temps.
              </p>
            </div>
          </div>
          <div class="col-md-4 d-flex align-items-center">
            <div>
              <div class="empty-img"><img src="/public/img/certification_3.webp" width="176" alt=""></div>
              <h4>Meilleur suivi et contrôle de la mise en œuvre</h4>
              <p>
                La certification fournit une base de référence claire avant le début des activités. Elle permet au bailleur et aux équipes 
                techniques de suivre l’évolution, d’évaluer les impacts et de détecter rapidement les écarts.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>

</template>
<script setup>

</script>