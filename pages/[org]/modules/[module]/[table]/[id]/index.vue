<script setup>
    import { useRoute } from "vue-router"
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
const fieldsList = ref([])
const manyRels = ref([])
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
  navigateTo(`/ressources/${table}`)
}
onMounted(async () => {
  await load()
})

  const fetchRel =  async (table) => {

    //let query = new URLSearchParams({'organisation_id': org}).toString();
    return await getAll(table)
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
          manyRels.value = data[key]?.relation_many??[]
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
          fieldsList.value = Object.keys(valuesFiltre)
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
  const getNormalNameFieldLocal = (resource, field) => {
    return getNormalNameField(resource, field)
  }
  const getNormalValue = (resource, field) => {
    if(resource[field.slice(0, -3)] ) {
        return resource[field.slice(0, -3)]?.app_value
    }
    return resource[field]
    //return getNormalNameField(resource, field)
  }


</script>
<template>
    <div class="" v-if="resource">
        <!-- Page header --> 
        
        <div class="page-body">
          <div class="container-xl">
            <div class="row">
                <div class="col mb-2">
                    <NuxtLink :to="`/${org}/modules/${moduleId}/${table}`" class="btn btn-sm btn-primary px-5">Retour liste</NuxtLink>
                </div>
            </div>
            <div class="card">
                <div class="row g-0">
                    <div class="col-12 col-md-3 border-end">
                        <ShowNavBar />
                    </div>
                    <div class="col-12 col-md-9 d-flex flex-column">
                        <div v-if="payload">
                            <div class="card">
                                <div class="card-header">
                                    <h3 class="card-title">Information de Base</h3>
                                </div>
                                <div class="card-body">
                                    <div class="datagrid">
                                        <div class="datagrid-item" v-for="(key, index) in fieldsList" :key="index">
                                            <div class="datagrid-title">{{key}}</div>
                                            <div class="datagrid-content">{{ getNormalValue(payload, key) }}</div>
                                        </div>
                                    </div>
                                </div>
                                <div v-for="(manyRel, index) in manyRels" :key="index">
                                    <ListRessource 
                                    :org="org"
                                    :moduleId="moduleId"
                                    :table="manyRel['table_cible']" :queries="{'organisation_id': org}" />

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