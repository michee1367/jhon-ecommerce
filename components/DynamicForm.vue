<script setup>
import { getNormalNameField, getNormalNameTable } from "@/tools/ressources";

const props = defineProps({
  tableName:String,
  photo:String,
  fields: Object,
  resource: Object,
  modelValue: Object,
  rels:Object,
  enums:Object
})

onMounted(() => {
  console.log(props.photo)
  if(props.photo) {
    photos.value = [props.photo]
  }
})

const photos = ref([]);
const docs = ref([]);



const emit = defineEmits(["update:modelValue", "upload_photo", "remove_doc", "remove_photo", "upload_doc"])

import Litepicker from '@/components/Litepicker.vue'


const removePhoto = async (index) => {

emit("remove_photo", index)

};
const uploadPhoto = async (file) => {

  if (file instanceof File) {
      //return URL.createObjectURL(item);
      let newPhoto = [...photos.value, URL.createObjectURL(file)]
      photos.value = newPhoto;
      emit("upload_photo", { file:file })
      //let url = `/table_names/<table_name>/records/<enregistrement_id>/change`
      //console.log(photos) tableName
  }
  return;

  const fd = new FormData();
  fd.append("file", file);

  const res = await $fetch("/api/upload", {
    method: "POST",
    body: fd
  });

  // Mettre à jour avec l'URL renvoyée par le serveur
  photos.value.push(res.url);
  };

  // Doc


const removeDoc = async (index) => {

emit("remove_doc", index)

};
const uploadDoc = async (file) => {

  if (file instanceof File) {
      //return URL.createObjectURL(item);
      let newPhoto = [...docs.value, URL.createObjectURL(file)]
      docs.value = newPhoto;
      emit("upload_doc", { file:file })
      //let url = `/table_names/<table_name>/records/<enregistrement_id>/change`
      //console.log(docs) tableName
  }
  return;
  };

const onInput = (key, value) => {
    console.log(value)
  emit("update:modelValue", { ...props.modelValue, [key]: value })
}
const onInputDate = (key, value) => {
    console.log(value)
    //modelValue[key] = value
  emit("update:modelValue", { ...props.modelValue, [key]: value })
}
  const getNormalNameFieldLocal = (resource, field) => {
    return getNormalNameField(resource, field)
  }
  const  getNormalNameTableLocal = (resource) => {
    return getNormalNameTable(resource)
  }
</script>

<template>
  <div>


    

    <div v-for="(type, key) in fields" :key="key" class="mb-3">

        <label class="form-check" v-if="type.includes('BOOL')">
            <input type="checkbox" class="form-check-input" :value="modelValue[key] || false" @checked="onInput(key, !modelValue[key])"/>
            <span class="form-check-label">{{ getNormalNameFieldLocal(resource, key) }}</span>
        </label>
        <label class="block font-semibold mb-1" v-else>
        {{ rels[key]? getNormalNameTableLocal(rels[key].resource)  : getNormalNameFieldLocal(resource, key) }}
        </label>
        <select 
            class="form-select" v-if="rels[key]"  
            :value="modelValue[key] || null"  @change="onInput(key, $event.target.value)">
            <option :value="value?.id" v-for="(value, index) in rels[key].options" :key="index">
                {{ value?.app_value || value?.id }}
            </option>
        </select>

        <select 
            class="form-select" v-else-if="enums[key]"  
            :value="modelValue[key] || null" @change="onInput(key, $event.target.value)">
            <option :value="value" v-for="(value, index) in enums[key]" :key="index">
                {{ value }}
            </option>
        </select>

        <ClientOnly 
            v-else-if="type.includes('DATE')" 
            fallback-tag="div" fallback="Loading data...">
            <Litepicker
                :singleMode="true"
                :value="modelValue[key] || null" @update:value="onInputDate(key, $event)"
            />
        </ClientOnly>
        <textarea
          v-else-if="type.includes('VARCHAR(512)')"
          class="border px-3 py-2 rounded w-full"
          name="" id="" rows="10"
            :value="modelValue[key] || ''"
            @input="onInput(key, $event.target.value)">

        </textarea>
        
        
        <input
            v-else-if="!type.includes('BOOL')"
            class="border px-3 py-2 rounded w-full"
            :type="type.includes('INT') ? 'number' : 'text'"
            :value="modelValue[key] || ''"
            @input="onInput(key, $event.target.value)"
        />

    </div>

    <PhotoUploader
        class="my-2"
    v-if="!props.photo || (props.photo && photos.length)"
    v-model="photos"
      baseUrl="https://mon-api.com/"
      @upload="uploadPhoto"
      @remove="removePhoto"
    />

    <DocUploader
        class="my-2"
        v-model="docs"
        baseUrl="https://mon-api.com/"
        @upload="uploadDoc"
        @remove="removeDoc"
    />
  </div>
</template>