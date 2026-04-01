<script setup>
import DynamicForm from "@/components/DynamicForm.vue"
import axios from "axios";
import { getNormalNameField, getNormalNameTable } from "@/tools/ressources";
const route = useRoute()
const { create, getAll, update } = useApi()
const table = route.params.table
const id = route.params.id
const moduleId = route.params.module
const org = route.params.org
const resource = ref(null)
const fields = ref({})
const rels = ref({})
const models = ref({})
const enumsOpts = ref({})
const payload = ref(null)
const form = ref({})
const photo = ref(null)


const submit = async () => {
    //console.log(form.value)
    //return tableName
  let {data} = await update(table,id, form.value)
//console.log("############################")
  if (id && photo.value && photo.value instanceof File ) {
    //console.log(data.entityId)
    const formData = new FormData()
    formData.append("file", photo.value)
    //formData.append("name", data.name)
    //formData.append("description", data.description)

    const url = `/api/pics/table_names/${table}/records/${id}/change`

    let resp = await axios.post(url, formData)

    console.log(resp.data)

  }
  //console.log("##########################")
  navigateTo(`/${org}/modules/${moduleId}/${table}`)
}
onMounted(async () => {
  await load()
})

  const fetchRel =  async (table) => {
    let query = new URLSearchParams({'organisation_id': org}).toString();
    return await getAll(table, query)
  }

  const uploadPhoto = async (data) => {
    photo.value = data.file
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
    await loadPayload()


    
      
  }
  const loadPayload =  async() => {
    ///models/records/utilisateur/save/1
    let {data} = await axios.get(`/api/models/records/${table}/save/${id}`)
    console.log(data.data)
    form.value = data.data
    photo.value = data.data?.pic_url??null
    payload.value = data.data
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
                      <div class="card" style="height: 40rem">
                          <div class="card-body card-body-scrollable card-body-scrollable-shadow">
                          <div class="divide-y">
                              <div v-if="payload">
                                <DynamicForm 
                                  :photo="photo"
                                  @upload_photo="uploadPhoto" :org="org"
                                  :enums="enumsOpts" 
                                  :tableName="table" 
                                  :resource="resource" :fields="fields" :rels="rels" v-model="form" />
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