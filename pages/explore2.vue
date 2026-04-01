<template>
  <div class="page-wrapper">

      <TopNavbar />
      <!-- Page header -->
      <div class="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <h2 class="page-title">
                Exploration
              </h2>
            </div>
          </div>
        </div>
      </div>
      <!-- Page body -->
      <div class="page-body">
        <div class="container-fluid">
          <div class="row row-cards">
            <div class="col-4">
              <div class="card" style="height: 52rem">
                <div class="card-body card-body-scrollable card-body-scrollable-shadow">
                  <div class="divide-y">
                    <div>
                      <div class="p-4">
                        <h2 class="text-xl font-bold mb-4">Filtre des données</h2>
                        
                        <!-- Sélection de la table principale -->
                        <label class="block mb-2">Table principale :</label>
                        <div class=" mb-4">
                          <select v-model="selectedTable" class="border p-1 rounded mb-2">
                            <option v-for="table in tables" :key="table" :value="table">{{ table }}</option>
                          </select>
                          <input v-model="tableAlias" type="text" class="border p-1" placeholder="Alias (ex: u)" />
                        </div>
                        
                        <!-- Sélection des champs -->
                        <div class="mb-3">
                          <label class="form-label">Champs à afficher :</label>
                          <div class="form-selectgroup p-1">
                            <label class="form-selectgroup-item p-1" v-for="field in availableFields" :key="field">
                              <input type="checkbox" name="name" v-model="selectedFields" :value="field" class="form-selectgroup-input p-1">
                              <span class="form-selectgroup-label">{{ field }}</span>
                            </label>
                          </div>
                        </div>

                        <!-- Jointures -->
                        <h3 class="text-lg font-semibold mb-1">Jointures</h3>
                        <div v-for="(join, index) in joins" :key="index" class=" mb-2">
                          <select v-model="join.table" class="border p-1">
                            <option v-for="table in tables" :key="table" :value="table">{{ table }}</option>
                          </select>
                          <input v-model="join.alias" type="text" class="border p-1" placeholder="Alias (ex: o)" />
                          <div>On</div>
                          <select v-model="join.type" v-if="false" class="border p-1">
                            <option value="INNER JOIN">INNER JOIN</option>
                            <option value="LEFT JOIN">LEFT JOIN</option>
                            <option value="RIGHT JOIN">RIGHT JOIN</option>
                          </select>
                          <input v-model="join.on" type="text" v-if="false" class="border p-1" placeholder="Condition (ex: u.id = o.user_id)" />
                          <select v-model="join.onFirst" class="border p-1">
                            <option v-for="fieldCond in availableFields" :key="fieldCond" :value="fieldCond">{{ fieldCond }}</option>
                          </select>
                          <select v-model="join.onOperator" class="border p-1">
                            <option value="=">=</option>
                            <option value=">">></option>
                            <option value="<"><</option>
                            <option value="LIKE">LIKE</option>
                          </select>
                          <select v-model="join.onSecond" class="border p-1">
                            <option v-for="fieldCond in availableFields" :key="fieldCond" :value="fieldCond">{{ fieldCond }}</option>
                          </select>
                          <button @click="removeJoin(index)" class="text-red-500">X</button>
                          <hr>
                        </div>
                        <button @click="addJoin" class="btn btn-primary mb-3">Ajouter jointure</button>
                       
                        
                        <!-- Conditions -->
                        <h3 class="text-lg font-semibold mb-2">Conditions</h3>
                        <div v-for="(condition, index) in conditions" :key="index" class=" mb-2">
                          <input v-if="false" v-model="condition.field" type="text" class="border p-1" placeholder="Champ (ex: u.email)" />
                          <select v-model="condition.field" class="border p-1">
                            <option v-for="fieldCond in availableFields" :key="fieldCond" :value="fieldCond">{{ fieldCond }}</option>
                          </select>
                          <select v-model="condition.operator" class="border p-1">
                            <option value="=">=</option>
                            <option value=">">></option>
                            <option value="<"><</option>
                            <option value="LIKE">LIKE</option>
                          </select>
                          <input v-model="condition.value" type="text" class="border p-1" placeholder="Valeur" />
                          <button @click="removeCondition(index)" class="text-red-500">X</button>
                          <hr>
                        </div>
                        <button @click="addCondition" class="btn btn-primary">Ajouter condition</button>
                        
                        <!-- Requête générée -->
                        <h3 class="text-lg font-semibold mt-4">Requête SQL :</h3>
                        <p class="border p-2 bg-gray-100">{{ generatedSQL }}</p>

                        <button @click="submit" class="btn btn-primary">Mise à jours</button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-8">
              <div class="card" style="height: 52rem">
                <div class="card-body card-body-scrollable card-body-scrollable-shadow">
                  <div class="divide-y">
                      <div class="p-4">
                        <h2 class="text-xl font-bold mb-4">Données</h2>
                        {{ geomFieldsFormat }}
                        <div class="table-responsive" v-if="fieldsData.length > 0">
                          <table class="table table-vcenter card-table table-striped">
                            <thead>
                              <tr>
                                <th v-for="(item, index) in fieldsData" :key="index">{{ item }}</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(item, index) in data" v-if="true" :key="index">
                                <td v-for="(it, i) in fieldsData" :key="i">{{ getValue(it, item[it])  }}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                </div>
                </div>
              </div>
            </div>


            <div class="col-12">
                <div class="card">
                  
                      <ClientOnly fallback-tag="span" fallback="Loading comments...">
                          <MapData v-if="data.length" :data="data" :geomfields="geomFieldsFormat" />
                      </ClientOnly>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
  import Axios, { AxiosError } from "axios";
export default {
  data() {
    return {
      models:[],
      tables: ["users", "orders", "products"],
      selectedTable: "",
      tableAlias: "",
      fields: {},
      geomFields: {},
      geomFieldsFormat: [],
      selectedFields: [],
      joins: [],
      conditions: [],
      fieldsData: [],
      data: [],
    };
  },
  async mounted() {
  
    this.load()

    let {data} = await Axios.get("http://145.223.33.161/models/all")
    console.log(data)
    
  },
  computed: {
    availableFields() {
      let fields = this.fields[this.selectedTable] || []
      let geomFields = this.geomFields[this.selectedTable] || []
      let me = this

      fields = fields.map(
        field => me.tableAlias + "." + field
      )
      geomFields = geomFields.map(
        field => me.tableAlias + "_" + field
      )

      this.joins.forEach(join => {
        let fieldsJoin = me.fields[join.table] || []
        let geomFieldsJoin = this.geomFields[join.table] || []
        fieldsJoin = fieldsJoin.map(
          field => join.alias + "." + field
        )

        geomFieldsJoin = geomFieldsJoin.map(
          field => join.alias + "_" + field
        )

        fields.push(...fieldsJoin)
        geomFields.push(...geomFieldsJoin)
        
      });
      me.geomFieldsFormat = geomFields
      return fields
      //return this.fields[this.selectedTable] || [];
    },
    generatedSQL() {
      if (!this.selectedFields.length) return "Sélectionnez au moins un champ";
      let query = `SELECT ${this.selectedFields.join(", ")} FROM ${this.selectedTable} AS ${this.tableAlias}`;
      if (this.joins.length) {
        this.joins.forEach(join => {
          query += ` ${join.type} ${join.table} AS ${join.alias} ON ${join.on}`;
        });
      }
      if (this.conditions.length) {
        let whereClauses = this.conditions.map(cond => `${cond.field} ${cond.operator} '${cond.value}'`).join(" AND ");
        query += ` WHERE ${whereClauses}`;
      }
      return query + ";";
    }
  },
  methods: {
    addCondition() {
      this.conditions.push({ field: "", operator: "=", value: "" });
    },
    removeCondition(index) {
      this.conditions.splice(index, 1);
    },
    addJoin() {
      this.joins.push({ table: "", alias: "", type: "INNER JOIN", on: "" });
    },
    removeJoin(index) {
      this.joins.splice(index, 1);
    },
    submit() {
      let data = {
        table:this.selectedTable,
        alias:this.tableAlias,
        selectedFields:this.selectedFields,
        joins:this.joins,
        conditions:this.conditions
      }

      let url = "/api/models/query/run/data"
      let me = this
      Axios
        .post(url, data)
        .then((data) => {
          
          console.log(data.data.data)
          let dataLoad = data.data.data
          if(dataLoad.length > 0) {
            //let first = dataLoad[0]
            //geomFieldsFormat
            let first = dataLoad[0]
            let geomFieldsFormat = me.geomFieldsFormat

            if (geomFieldsFormat.length > 0) 
            {
              let firstGeomField = geomFieldsFormat[0]
              let dataFieldFirst = first[firstGeomField]
              console.log("##############################")
              console.log(dataFieldFirst)
              console.log("##############################")
              Axios
                .post("/api/geom/convert", {geom:dataFieldFirst})
                .then((resp) => {
                  console.log(resp.data)
                })

            }
            let fieldsData = [];
            me.data = []
            for (const key in first) {
              fieldsData.push(key)
            }

            me.fieldsData = fieldsData;
            me.data = dataLoad
            console.log(me.fieldsData)
          }
          //console.log(this.provinces)
          //let r = "".localeCompare()
                    
        })
        .catch((err) => {
          console.error(err);
        });
      console.log(data)
    },
    getValue(key, value)
    {
      let me = this
      let exitsKey = me.geomFieldsFormat.find(field => field == key) //geomFieldsFormat
      return exitsKey ? "<geometry>" : value 
    },
    load() {
      let me = this;
      Axios
        .get("/api/models/all")
        .then((data) => {
          console.log(data.data)
          let models = data.data
          //this.models = data.data.data;
          //console.log(this.provinces)
          //let r = "".localeCompare()
          /*this.provinces = this.provinces.sort(
            (a,b) => {
              return a.nom.localeCompare(b.nom)
            }
          )*/
         let tables = []
         let fields = {}
         let geomFields = {}
         for (const tableName in models) {
          if (Object.prototype.hasOwnProperty.call(models, tableName)) {
            const fieldsTable = models[tableName].fields;
            tables.push(tableName)
            let tablesField = []
            let tablesGeomFields = []
            for (const filed in fieldsTable) {
              if (Object.prototype.hasOwnProperty.call(fieldsTable, filed)) {
                //geometry
                let typeField = fieldsTable[filed]
                if (typeField.includes("geometry")) {
                  tablesGeomFields.push(filed)
                }

                tablesField.push(filed)
              }
            }
            fields[tableName] = tablesField
            geomFields[tableName] = tablesGeomFields
          }
         }

         console.log(tables)
         console.log(fields)
         me.tables = tables
         me.fields = fields
         me.geomFields = geomFields
          
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }
};
</script>

<style>
pre {
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
