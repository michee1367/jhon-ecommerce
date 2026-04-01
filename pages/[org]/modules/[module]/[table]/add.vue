<script setup>
import DynamicForm from "@/components/DynamicForm.vue"
import axios from "axios";
import { getNormalNameField, getNormalNameTable } from "@/tools/ressources";
const route = useRoute()
const { create, getAll } = useApi()
const table = route.params.table
const moduleId = route.params.module
const org = route.params.org
const resource = ref(null)
const fields = ref({})
const rels = ref({})
const enumsOpts = ref({})
const models = ref({})
const form = ref({})
const photo = ref(null)
const photos = ref([])
const docs = ref([])

const submit = async () => {
    //console.log(form.value)
    //return tableName
  console.log(photos.value)  
  //return   
  let {data} = await create(table, form.value)
  console.log("############################")
  if(data.entityId && photos.value) {
    photos.value.forEach(
      async (photo, index) => {
        const formData = new FormData()
        formData.append("file", photo)
        //formData.append("name", data.name)
        //formData.append("description", data.description)

        const url = `/api/pics/table_names/${table}/records/${data.entityId}/add`

        let resp = await axios.post(url, formData)

        console.log(resp.data)

      }
    )
  }
  if(data.entityId && docs.value) {
    docs.value.forEach(
      async (doc, index) => {
        const formData = new FormData()
        formData.append("file", doc)
        //formData.append("name", data.name)
        //formData.append("description", data.description)
        try {
          const url = `/api/docs/table_names/${table}/records/${data.entityId}/add`

          let resp = await axios.post(url, formData)

          console.log(resp.data)
          
        } catch (error) {
          console.log(error)
        }

      }
    )
  }
  
  navigateTo(`/${org}/modules/${moduleId}/${table}`)
  return
  if (data.entityId && photo.value) {
    console.log(data.entityId)
    const formData = new FormData()
    formData.append("file", photo.value)
    //formData.append("name", data.name)
    //formData.append("description", data.description)

    const url = `/api/pics/table_names/${table}/records/${data.entityId}/change`

    let resp = await axios.post(url, formData)

    console.log(resp.data)

  }
  console.log("##########################")
  navigateTo(`/${org}/modules/${moduleId}/${table}`)
}
onMounted(async () => {
  await load()
})

  const fetchRel =  async (table) => {

    let query = new URLSearchParams({'organisation_id': org}).toString();
    return await getAll(table, query)
  }
  const removePhoto = async (index) => {
    let delPhoto = photos.value[index]

    if (delPhoto) {
      let copyPhotos = [...photos.value]
      copyPhotos.splice(index, 1);
      photos.value = [...copyPhotos];
    }

  }

  const uploadPhoto = async (data) => {
    photos.value.push(data.file)
    photo.value = data.file
  }

  const removeDoc = async (index) => {
    let delDoc = docs.value[index]

    if (delDoc) {
      let copyDocs = [...docs.value]
      copyDocs.splice(index, 1);
      docs.value = [...copyDocs];
    }

  }

  const uploadDoc = async (data) => {
    docs.value.push(data.file)
    //doc.value = data.file
  }

  const load = async () => {
    
    let {data} = await axios.get("/api/models/all")
    let keyData = Object.keys(data)
    models.value = data
    for (let j = 0; j < keyData.length; j++) {
        const key = keyData[j];
        if (key == table) {
          let values = data[key]?.fields??{}
          resource.value = data[key]
          let relsValues = data[key]?.relations??{}
          let enumsValues = data[key]?.enums??{}
          let valuesFiltre = {}
          let relValues = {}

          Object.keys(values).forEach(
            keyValue => {
                if (keyValue != "id") {
                    valuesFiltre[keyValue] = values[keyValue]
                    
                }
            }
          )
          let enumsOptsLoc = enumsOpts.value
          enumsOptsLoc = enumsValues

          let relsKeys = Object.keys(relsValues)

          for (let i = 0; i < relsKeys.length; i++) {
            const relKey = relsKeys[i];
            if(valuesFiltre[relKey]) {
                relValues[relKey] = {
                    options:await fetchRel(relsValues[relKey]),
                    tableName:relsValues[relKey],
                    resource:models.value[relsValues[relKey]]
                }
            }
            
          }

          fields.value = valuesFiltre
          rels.value = relValues
          enumsOpts.value = enumsOptsLoc

        }
        
    }
      
  }
  const  getNormalNameTableLocal = (resource) => {
    return getNormalNameTable(resource)
  }
   
</script>

<template>

    <div class="" v-if="resource">
        <!-- Page header --> 
        <div class="page-header d-print-none">
          <div class="container-xl">
              <div class="row g-2 align-items-center">
              <div class="col">
                  
                  <h1 class="text-2xl font-bold mb-4 capitalize">Ajouter un(e)   {{ getNormalNameTableLocal(resource) }}</h1>
                  <NuxtLink :to="`/${org}/modules/${moduleId}/${table}`" class="btn btn-sm btn-primary px-5">Retour liste</NuxtLink>
              </div>
              </div>
          </div>
        </div>
        <div class="page-body">
                <div class="container-xl">
                  <div class="row row-cards">
                      <div class="col-md-6 col-sm-12">
                      <div class="card" style="min-height: 40rem">
                          <div class="card-body card-body-scrollable card-body-scrollable-shadow">
                          <div class="divide-y">
                              <div>
                                <DynamicForm 
                                  @remove_photo="removePhoto"
                                  @upload_photo="uploadPhoto"

                                  @remove_doc="removeDoc"
                                  @upload_doc="uploadDoc"

                                  :tableName="table" :resource="resource" :org="org"
                                  :fields="fields" :rels="rels" 
                                  v-model="form" 
                                  :enums="enumsOpts" 
                                  />
                                <button class="btn btn-primary rounded" @click="submit">Enregistrer</button>
                            </div>
                        </div>
                          </div>
                      </div>
                      </div>
      
                  </div>
                </div>
        </div>
    </div>
</template>