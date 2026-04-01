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

const images = ref([]);
const previews = ref([]);

// Convertir modelValue → previews
const generatePreviews = () => {
  previews.value = images.value.map(item => {
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
  images.value = [...props.modelValue];
  console.log(images.value)
  generatePreviews();
});
watch(props.modelValue,  () => {
  //console.log("##########################################################")
  generatePreviews();
  //emit("change", images.value);
})

watch(images, () => {
  //console.log("##########################################################")
  generatePreviews();
  emit("change", images.value);
});

// Input fichier
const fileInput = ref(null);
const openFileDialog = () => fileInput.value.click();

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  images.value  = [...images.value,file];
  emit("upload", file);

  e.target.value = "";
};

const removeImage = (index) => {
  const item = images.value[index];
  emit("remove", index);

  if (typeof item === "string") {
    emit("remove", item);
  }
  let copyImgs = [...images.value]
  copyImgs.splice(index, 1);
  images.value = [...copyImgs];
};

const replaceImage = (index) => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    images.value[index] = file;
    previews.value[index] = URL.createObjectURL(file);

    emit("upload", file);
  };

  input.click();
};
</script>

<template>
  <div class="photo-uploader">
    <!-- Zone d’ajout -->
    <div class="upload-box" @click="openFileDialog">+ Ajouter une photo</div>

    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      class="d-none"
      @change="handleFileChange"
    />

    <div class="grid">
      <div
        class="image-wrapper"
        v-for="(src, index) in previews"
        :key="index"
      >
        <a :href="src" target="_blank"><img :src="src" class="preview" /></a>
        
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
