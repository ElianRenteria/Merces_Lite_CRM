<template>
  <div class="border-round border-3 border-300 w-7 h-6rem mt-3 surface-overlay font-bold flex">

    <div>
      <div id="top-row" class="w-full flex mt-1"> 
        <!--w-1 h-2rem flex-->
        <InputText
        type="text" 
        placeholder="Title" 
        class="w-5 mr-1 ml-1 h-2rem"/>

        <InputText 
        :v-model="rate"
        type="int"
        placeholder="Rate" 
        size="small" class="w-2 mr-1 h-2rem"/>

        <InputText 
        :v-model="quantity"
        type="int"
        placeholder="Quantity"
        size="small"
        class="w-2 mr-1 h-2rem"/>

        <InputText 
        :v-model="tax"
        type="int"
        placeholder="Tax" 
        size="small" 
        class="w-1 mr-1 h-2rem"/>

        <InputText 
        :v-model="total"
        type="int"
        placeholder="Total" 
        size="small" 
        class="w-2 mr-1 h-2rem"
        disabled/>

      </div>

      <div id="bottom-row" class="w-full mt-1 flex">
        <InputText
        type="text"
        placeholder="Description"
        size="small" 
        class="w-12 mr-1 ml-1 h-3rem"/>
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { Service } from "../../types/Service";
import { useServices } from "../../composables/useServices";

const { getServices } = useServices();

const rate = ref(0);
const quantity = ref(0);
const tax = ref(0);

const total = computed(() => {
  return (rate.value * quantity.value) + ((rate.value * quantity.value) * (tax.value / 100));
});

</script>

<style scoped>

</style>