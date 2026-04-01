<template>
    <div>
      <input
        ref="input"
        type="text"
        :value="displayValue"
        :placeholder="placeholder"
        class="border rounded p-2 w-full"
        @input="onManualInput"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
  import Litepicker from 'litepicker'
  import 'litepicker/dist/css/litepicker.css'
  
  const props = defineProps({
    modelValue: [String, Date],
    value: [String, Date],
    placeholder: { type: String, default: 'Select a date' },
    format: { type: String, default: 'YYYY-MM-DD' },
    singleMode: { type: Boolean, default: true },
  })
  
  const emit = defineEmits(['update:modelValue', 'update:value', 'selected'])
  const input = ref(null)
  let picker = null
  
  // 🔄 Calcul de la valeur affichée
  const displayValue = computed(() => props.modelValue || props.value || '')
  
  // 🧠 Gestion de l’entrée manuelle (si l’utilisateur tape directement)
  function onManualInput(e) {
    const val = e.target.value
    emit('update:modelValue', val)
    emit('update:value', val)
  }
  
  onMounted(() => {
    picker = new Litepicker({
      element: input.value,
      singleMode: props.singleMode,
      format: props.format,
      startDate: props.modelValue || props.value || undefined,
      autoApply: true,
      setup: (pickerInstance) => {
        pickerInstance.on('selected', (date1, date2) => {
          const formattedValue = props.singleMode
            ? date1.format(props.format)
            : `${date1.format(props.format)} - ${date2.format(props.format)}`
          
          // Émettre la nouvelle valeur
          emit('update:modelValue', formattedValue)
          emit('update:value', formattedValue)
          
          // Événement personnalisé
          emit('selected', { start: date1, end: date2 })
        })
      },
    })
  })
  
  // 🔄 Synchronisation quand la valeur change depuis le parent
  watch(
    () => [props.modelValue, props.value],
    ([model, val]) => {
      const newVal = model || val
      if (picker && newVal) picker.setDate(newVal)
    }
  )
  
  onBeforeUnmount(() => {
    if (picker) picker.destroy()
  })
  </script>
  