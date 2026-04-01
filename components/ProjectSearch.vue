<template>
    <div class="d-inline-block px-3">
        <span class="">{{ projectStore.currentProject?.nom }}</span>
        <span>
            <a href="#" class="btn-link px-2" data-bs-toggle="modal" data-bs-target="#modal-projects">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-adjustments-alt"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 8h4v4h-4l0 -4" /><path d="M6 4l0 4" /><path d="M6 12l0 8" /><path d="M10 14h4v4h-4l0 -4" /><path d="M12 4l0 10" /><path d="M12 18l0 2" /><path d="M16 5h4v4h-4l0 -4" /><path d="M18 4l0 1" /><path d="M18 9l0 11" /></svg>
            </a>
        </span>


        <div class="modal modal-blur fade" id="modal-projects" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                <div class="modal-content">
                    <div class="modal-header" v-if="false">
                        <h5 class="modal-title">Choix projets</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <ProjectsList @project_choose="project_choose"/>
                    </div>
                    <div class="modal-footer" v-show="false">
                        <button ref="inputClose" type="button" class="btn me-auto" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useProjectStore } from "@/stores/project";
const projectStore = useProjectStore()
const inputClose = ref()

const project_choose = async () => {
    console.log(inputClose)
    inputClose.value.click()

    navigateTo("/")
}


</script>