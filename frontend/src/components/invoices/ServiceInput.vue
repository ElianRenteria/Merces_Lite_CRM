<template>
  <div class="border-round border-3 border-300 w-full h-6rem mt-3 surface-overlay font-bold flex">

    <div>
      <div id="top-row" class="w-full flex mt-1"> 
        
        <InputText
        v-model="service.name"
        type="text" 
        placeholder="Title"
        />

        <InputNumber 
        v-model="service.price"
        placeholder="Rate"
        />

        <InputNumber
        v-model="quantity"
        placeholder="Quantity"
        />

        <InputNumber
        v-model="total"
        placeholder="Total"
        class=""
        disabled/>

        <Button 
        label="Save" 
        severity="success" 
        class="h-full ml-1"
        style="width: 80px;"
        />

      </div>

      <div id="bottom-row" class="w-full mt-2 flex">
        <InputText
        v-model="service.description"
        type="text"
        placeholder="Description"
        class="w-full mb-1"
        />

        <Button 
        label="Delete" 
        severity="danger" 
        class="h-full ml-1"
        @click="emits('delete')"
        />
      </div>
      
      
    </div>
      
    
  </div>
</template>

<script setup lang="ts">
import { Service } from "../../types/Service";
import { useServices } from "../../composables/useServices";

const { getServices } = useServices();

const service = defineModel<Service>({required: true});

const quantity = ref(1);

const emits = defineEmits(['delete', 'save']);

const total = computed(() => {
  return service.value.price * quantity.value;
});

</script>

<style scoped>

</style>