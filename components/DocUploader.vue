<script setup>
import { ref, watch, onMounted } from "vue";

const emit = defineEmits(["upload", "remove", "change"]);

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [] // Peut contenir File + URL
  },
  baseUrl: {
    type: String,
    default: "" // Exemple : "https://mon-api.com/uploads/"
  }
});

const docs = ref([]);
const fileNames = ref([]);
const previews = ref([]);

// Convertir modelValue → previews
const generatePreviews = () => {
  previews.value = docs.value.map(item => {
    if (item instanceof File) {
      return URL.createObjectURL(item);
    }
    if (typeof item === "string") {
      return item.startsWith("http")
        ? item
        : props.baseUrl + item;
    }
  });
};

onMounted(() => {
  docs.value = [...props.modelValue];
  console.log(docs.value)
  generatePreviews();
});
watch(props.modelValue,  () => {
  //console.log("##########################################################")
  generatePreviews();
  //emit("change", docs.value);
})

watch(docs, () => {
  //console.log("##########################################################")
  generatePreviews();
  emit("change", docs.value);
});

// Input fichier
const fileInput = ref(null);
const openFileDialog = () => fileInput.value.click();

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  docs.value  = [...docs.value,file];
  fileNames.value = [...fileNames.value, file.name]

  emit("upload", file);

  e.target.value = "";
};

const removeImage = (index) => {
  const item = docs.value[index];
  emit("remove", index);

  if (typeof item === "string") {
    emit("remove", item);
  }
  let copyImgs = [...docs.value]
  copyImgs.splice(index, 1);
  docs.value = [...copyImgs];
  let copyDocs = [...fileNames.value]
  copyDocs.splice(index, 1);
  fileNames.value = [...copyDocs];
};

const replaceImage = (index) => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    docs.value[index] = file;
    previews.value[index] = URL.createObjectURL(file);

    emit("upload", file);
  };

  input.click();
};
const truncateFileName = (name) => {
  if (!name) return ""

  const extIndex = name.lastIndexOf(".")
  if (extIndex === -1) return name.slice(0, 10)

  const base = name.slice(0, extIndex)
  const ext = name.slice(extIndex)

  return base.slice(0, 10) + ext
}
</script>

<template>
  <div class="photo-uploader">
    <!-- Zone d’ajout -->
    <div class="upload-box" @click="openFileDialog">+ Ajouter un document</div>

    <input
      ref="fileInput"
      type="file"
      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
      class="d-none"
      @change="handleFileChange"
    />

    <div class="grid">
      <div
        class="image-wrapper"
        v-for="(src, index) in previews"
        :key="index"
      >
        <a :href="src" target="_blank"><img src="/img/doc.webp" class="preview" /></a>
        <div>{{ truncateFileName(fileNames[index]) }}</div>
        <div class="actions" >
          <button @click="replaceImage(index)">Modifier</button>
          <button @click="removeImage(index)">Supprimer</button>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.upload-box {
  border: 2px dashed #aaa;
  padding: 14px;
  text-align: center;
  cursor: pointer;
  border-radius: 10px;
}
.grid {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.preview {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ddd;
}
.actions {
  margin-top: 5px;
  display: flex;
  gap: 5px;
}
</style>
