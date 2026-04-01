<template>
    <div class="p-4">
      <h2 class="text-xl font-bold mb-4">Générateur de requêtes SQL</h2>
      
      <!-- Sélection de la table -->
      <label class="block mb-2">Sélectionnez une table :</label>
      <select v-model="selectedTable" class="border p-2 rounded mb-4">
        <option v-for="table in tables" :key="table" :value="table">{{ table }}</option>
      </select>
      
      <!-- Sélection des champs -->
      <label class="block mb-2">Champs à afficher :</label>
      <div class="mb-4">
        <label v-for="field in availableFields" :key="field" class="block">
          <input type="checkbox" v-model="selectedFields" :value="field" /> {{ field }}
        </label>
      </div>
  
      <!-- Jointures -->
      <h3 class="text-lg font-semibold mb-2">Jointures</h3>
      <div v-for="(join, index) in joins" :key="index" class="flex space-x-2 mb-2">
        <select v-model="join.table" class="border p-1">
          <option v-for="table in tables" :key="table" :value="table">{{ table }}</option>
        </select>
        <input v-model="join.on" type="text" class="border p-1" placeholder="Condition de jointure (ex: users.id = orders.user_id)" />
        <button @click="removeJoin(index)" class="text-red-500">Supprimer</button>
      </div>
      <button @click="addJoin" class="bg-blue-500 text-white p-2 rounded">Ajouter jointure</button>
      
      <!-- Conditions -->
      <h3 class="text-lg font-semibold mb-2">Conditions</h3>
      <div v-for="(condition, index) in conditions" :key="index" class="flex space-x-2 mb-2">
        <select v-model="condition.field" class="border p-1">
          <option v-for="field in allAvailableFields" :key="field" :value="field">{{ field }}</option>
        </select>
        <select v-model="condition.operator" class="border p-1">
          <option value="=">=</option>
          <option value=">">></option>
          <option value="<"><</option>
          <option value="LIKE">LIKE</option>
        </select>
        <input v-model="condition.value" type="text" class="border p-1" placeholder="Valeur" />
        <button @click="removeCondition(index)" class="text-red-500">X</button>
      </div>
      <button @click="addCondition" class="bg-blue-500 text-white p-2 rounded">Ajouter condition</button>
      
      <!-- Requête générée -->
      <h3 class="text-lg font-semibold mt-4">Requête SQL :</h3>
      <pre class="border p-2 bg-gray-100">{{ generatedSQL }}</pre>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tables: ["users", "orders", "products"],
        selectedTable: "users",
        fields: {
          users: ["id", "name", "email", "created_at"],
          orders: ["id", "user_id", "amount", "status"],
          products: ["id", "name", "price", "stock"]
        },
        selectedFields: [],
        joins: [],
        conditions: []
      };
    },
    computed: {
      availableFields() {
        return this.fields[this.selectedTable] || [];
      },
      allAvailableFields() {
        let allFields = [...this.availableFields];
        this.joins.forEach(join => {
          if (this.fields[join.table]) {
            allFields.push(...this.fields[join.table].map(f => `${join.table}.${f}`));
          }
        });
        return allFields;
      },
      generatedSQL() {
        if (!this.selectedFields.length) return "Sélectionnez au moins un champ";
        let query = `SELECT ${this.selectedFields.join(", ")} FROM ${this.selectedTable}`;
        if (this.joins.length) {
          this.joins.forEach(join => {
            query += ` JOIN ${join.table} ON ${join.on}`;
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
        this.joins.push({ table: "", on: "" });
      },
      removeJoin(index) {
        this.joins.splice(index, 1);
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
  