<template>
    <div>
        <div class="card m-0">
            <div class="card-header">
            <h3 class="card-title">Sélectionnez votre projet</h3>
            </div>

            <div class="list-group list-group-flush overflow-auto" style="max-height: 40rem; min-height: 20rem;">
            <div class="list-group-header sticky-top" v-if="false">A</div>
            
                <div v-if="projectStore.loaded && 0 == projects.length " class="d-flex justify-content-center py-5">
                    <div>
                        <a href="#" class="d-block"><img src="/img/no_data.webp" class="" width="300"></a>
                        <div class="text-center">
                            <h4>Aucun résultat trouvé</h4>
                            <p>Essayez de contacter l'adminitrateur.</p>
                            
                            <NuxtLink v-if="false" :to="`/undefined/modules/undefined/projets/add`" class="btn btn-primary px-5">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                                Ajouter un projet
                            </NuxtLink>

                            

                        </div>

                    </div>

                </div>
                <div class="list-group-item" v-for="(project,index ) in projects" :key="index">
                    <div class="row">
                    <div class="col-auto">
                        <a href="#">
                        <span class="avatar">{{ project.id }}</span>
                        </a>
                    </div>
                    <div class="col text-truncate">
                        <a href="#" @click.prevent="chooseProject(project.id)" class="text-body d-block">{{ project?.nom }}</a>
                        <div class="text-secondary text-truncate mt-n1">{{ project?.description }}</div>
                    </div>
                    </div>
                </div>
        </div>
        </div>       

    </div>
</template>
<script setup>
  import { useProjectStore } from "@/stores/project";
  const projectStore = useProjectStore()
  const projects = ref([])
  const { getAll } = useApi()
  const emit = defineEmits(["project_choose"])
  
  onMounted(async () => {
    await projectStore.loadProjects()
    projects.value = projectStore.projects
  })


  const chooseProject = async (projectId) => {
    let project = await projectStore.chooseProject(projectId)
    console.log("###########")
    if (project) {
        emit("project_choose", {project:project})
    }
  }

</script>