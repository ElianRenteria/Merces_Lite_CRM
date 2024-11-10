<template>
  <div class="border-round border-3 border-300 w-full h-6rem mt-3 surface-overlay font-bold flex">

    <div>
      <div id="top-row" class="w-full flex mt-1"> 
        
        <InputText
        v-model="title"
        type="text" 
        placeholder="Title"
        />

        <InputNumber 
        v-model="rate"
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
        v-model="description"
        type="text"
        placeholder="Description"
        class="w-full mb-1"
        />

        <Button 
        label="Delete" 
        severity="danger" 
        class="h-full ml-1"
        />
      </div>
      
      
    </div>
      
    
  </div>
</template>

<script setup lang="ts">
import { Service } from "../../types/Service";
import { useServices } from "../../composables/useServices";

const { getServices } = useServices();

const rate = ref(0);
const quantity = ref(1);
const title = ref("");
const description = ref("");

const total = computed(() => {
  return rate.value * quantity.value;
});

</script>

<style scoped>

</style>