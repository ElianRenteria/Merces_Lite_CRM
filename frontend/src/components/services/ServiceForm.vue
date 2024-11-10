<template>
  <div class="flex flex-column gap-3 my-3">
    <!-- Row with Name and Price inputs -->
    <div class="flex flex-row gap-3">
      <div class="flex flex-column gap-2 flex-grow">
        <label for="name">Name</label>
        <InputText id="name" v-model="service.name" />
      </div>

      <div class="flex flex-column gap-2 flex-grow">
        <label for="price">Price</label>
        <InputNumber
          id="price"
          v-model="service.price"
          mode="currency"
          currency="USD"
          locale="en-US"
        />
        <label for="name" class="text-xs text-color-secondary">
          Unit Price
        </label>
      </div>
    </div>

    <!-- Row with Description input -->
    <div class="flex-auto flex-row gap-3">
      <div class="flex flex-column gap-2 flex-grow">
        <label for="description">Description</label>
        <Textarea id="description" v-model="service.description" rows="5"/>
      </div>
    </div>
  </div>
  <div class="p-fluid mt-3">
    <Button
      :label="editMode ? 'Update' : 'Save'"
      :icon="editMode ? 'pi pi-pencil' : 'pi pi-save'"
      class="flex-grow"
      @click="saveService"
    />
  </div>
</template>

<script setup lang="ts">
import { Service } from "../../types/Service";
import { useServices } from "../../composables/useServices";
import { initializeService } from "../../utils/initialize";
import { watchImmediate } from "@vueuse/core";

// Import the createService function from the composable
const { createService, updateService } = useServices();

// Define props with default value
const props = defineProps({
  service: {
    type: Object as PropType<Service>,
    default: initializeService(),
  },
});

// Use a reactive reference for service state management
const service = ref<Service>(props.service);

// Define emits
const emits = defineEmits(["save"]);

// Define computed properties
const editMode = computed(() => !!props.service?.id);

// Watch for changes in the prop and reset if unassigned
watchImmediate(props, (updated) => {
  if (!updated.service) {
    service.value = initializeService();
  } else {
    service.value = updated.service;
  }
});

const saveService = async () => {
  if (editMode.value) {
    // Update Service
    await updateService(props.service);
  } else {
    // Create Service
    await createService(props.service);
  }
  emits("save");
};
</script>
