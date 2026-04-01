<template>
    <div>
        <div class="row g-0 gallery" v-if="galleryObj?.type == 0">
            <div class="col-12">
                <a href="#" class="d-block"><img src="/img/doc.webp" class="card-img-top"></a>
            </div>
        </div>
        <div class="row g-0 gallery" v-if="galleryObj?.type == 1">
            
            <div class="col-6" v-for="(item, i) in galleryObj.list_docs" :key="i">
                <a href="#" class="d-block"><img src="/img/doc.webp" class="card-img-top"></a>
            </div>
        </div>
        <div class="row g-0 gallery" v-if="galleryObj?.type == 2">
            
            <div class="col-6" v-for="(item, i) in galleryObj.list_docs" :key="i">
                <a href="#" class="d-block"><img src="/img/doc.webp" class="card-img-top"></a>
            </div>
            <div class="col-6 position-relative">
                <a href="#" class="position-relative d-block gallery-link">
                    <img src="/img/doc.webp" class="img-fluid w-100">
                    <div class="overlay">
                        <span>+{{ galleryObj.rest }}</span>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, computed } from 'vue'
    const props = defineProps({
      postData: {
        type: Object,
        default: () => null // Peut contenir File + URL
      }
    });

    const galleryObj = computed(() => {
        let docs_url =  props.postData?.docs_url ? props.postData?.docs_url : []
        let obj = {}

        if (docs_url.length == 1) {
            obj.type = 0
            obj.doc = docs_url[0]
            obj.list_docs = []
        }else if(docs_url.length > 4) {
            obj.type = 2
            obj.list_docs = [...docs_url].splice(0, 3)
            obj.doc = docs_url[3]
            obj.rest = docs_url.length - 3
        }else {
            obj.type = 1
            obj.list_docs = docs_url
            console.log(props.postData)
        }

        return obj
    })


</script>