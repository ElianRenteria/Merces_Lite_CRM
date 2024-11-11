<template>
  <div class="flex flex-column gap-3 my-3">
    <!-- Row with Name and Price inputs -->
    <div class="flex flex-row gap-3">
      <div class="flex flex-column gap-2 flex-grow">
        <label for="name">Name*</label>
        <InputText
          id="name"
          v-model="service.name"
          :class="{ 'p-invalid': errors.name }"
        />
        <small v-if="errors.name" class="p-error">Name is required</small>
      </div>

      <div class="flex flex-column gap-2 flex-grow">
        <label for="price">Price*</label>
        <InputNumber
          id="price"
          v-model="service.price"
          mode="currency"
          currency="USD"
          locale="en-US"
          :class="{ 'p-invalid': errors.price }"
        />
        <small v-if="errors.price" class="p-error">Price is required</small>
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
import { ref, computed } from "vue";
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

// Define validation errors object
const errors = ref({
  name: false,
  price: false,
});

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

// Function to reset the form
const resetService = () => {
  service.value.price = 0;
  service.value.description = "";
  service.value.name = "";
};

const saveService = async () => {
  // Validate Name and Price fields
  errors.value.name = !service.value.name;
  errors.value.price = service.value.price == null || service.value.price === "";

  // If any validation error exists, prevent saving
  if (errors.value.name || errors.value.price) return;

  // Proceed with save
  if (editMode.value) {
    await updateService(service.value);
  } else {
    await createService(service.value);
  }
  // Clear the service fields and errors after successful save
  resetService();
  // Emit save event
  emits("save");
};
</script>

<style scoped>
.p-invalid {
  border-color: #f44336;
}
.p-error {
  color: #f44336;
  font-size: 0.875rem;
}
</style>
