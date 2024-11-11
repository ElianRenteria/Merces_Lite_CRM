<template>
  <div class="flex flex-column gap-5 w-9">
    <div class="flex flex-column gap-2">
      <label for="invoice-name">Name</label>
      <InputText id="invoice-name" :v-model="invoice.name" aria-describedby="username-help" />
      <small id="invoice-help">Enter invoice name</small>
    </div>

    <div class="flex flex-column gap-2">
      <label for="invoice-date">Date</label>
      <Calendar 
        id="invoice-date" 
        v-model="invoice.date"
        showIcon 
        showButtonBar
        dateFormat="yyyy-mm-dd" 
        :manual-input="false"
        selectionMode="single"
      />
    </div>
    
    <div id="label" class="flex flex-row gap-4">
      <Dropdown 
        id="invoice-client" 
        v-model="client" 
        :options="allClients"
        optionLabel="name" 
        placeholder="Select a Client"
        class="w-full md:w-34rem" />
    </div>

    <!--List of services-->
    <div id="listOfServices">
      <ServiceInput
      v-for="_, index in services" 
      v-model="services[index]"
      class="w-full"
      @delete="deleteService(index)"
      />
    </div>
    

    <!--Add Service-->
    <div class="flex justify-content-center flex-wrap">
      <Button 
      icon="pi pi-plus" 
      severity="help" 
      rounded 
      outlined 
      aria-label="add" 
      @click="addService"
      />
    </div>

    <!-- Save Button -->
    <div class="p-fluid pt-4">
      <Button
        :label="editMode ? 'Update' : 'Save'"
        :icon="editMode ? 'pi pi-pencil' : 'pi pi-save'"
        class="flex-grow"
        @click="saveInvoice"
      />

      
    </div>

  </div>
  
  
</template>

<style lang="css" scoped>

</style>
  
<script setup lang="ts">
  import { Invoice, InvoiceStatusOptions, Client, Service, CreateInvoice } from '../../types';
  import { useClients } from "../../composables/useClients";
  import { useInvoices } from "../../composables/useInvoices";
  import { useServices } from '../../composables/useServices';
  import { initializeInvoice, initializeService } from '../../utils/initialize';
  import { watchImmediate } from "@vueuse/core";

  // Import the createInvoices function from the composable
  const { createInvoices } = useInvoices();

  //Import the getClients function from the composable
  const { getClients } =  useClients();
  
  //Import the getClients function from the composable
  const { getServices, createService } =  useServices();

  const client = ref<Client | undefined>(undefined);

  const allClients = ref<Client[]>([]);

  const services = ref<Service[]>([]);
  
  // Define props with default value
  const props = defineProps({
    invoice: {
      type: Object as PropType<CreateInvoice>,
      default: initializeInvoice(),
    },
  });

  // Use a reactive reference for invoice state management
  const invoice = ref<CreateInvoice>(props.invoice);

  //Define refs
  const invoiceStatusOptions = ref(InvoiceStatusOptions);

  // Define emits
  const emits = defineEmits(["save"]);

  // Define computed properties
  const editMode = computed(() => !!props.invoice?.id);

  //Add service component
  const addService = async () => {
    services.value.push(initializeService());
  };

  const deleteService = (index: number) => {
    services.value.splice(index, 1);
  }

  // Watch for changes in the prop and reset if unassigned
  watchImmediate(props, (updated) => {
    console.log(`Props Updated: ${updated}`);
    if (!updated.invoice) {
      invoice.value = initializeInvoice();
    } else {
      invoice.value = updated.invoice;
    }
  });

  const saveInvoice = async () => {
    if (editMode.value) {
      // Update Invoice
      //await updateInvoice(invoice.value);
    } else {
      // Create Invoice
      services.value.forEach(async (service, index) => {
        const newService = await createService(service);
        if(!newService) {
          console.log('failed to create service');
        } else {
          services.value[index].id = newService.id;
        }
      });

      if(!client.value) {
        console.log('client is missing');
      } else {
        invoice.value.client_id = client.value.id;
      }
      
      const newInvoice = await createInvoices(invoice.value);
      if(!newInvoice) {
        console.log('failed to create invoice');
      } else {
        invoice.value.id = newInvoice.id;
      }
      invoice.value.services = services.value;
      
    }
    emits("save");
  };

  onMounted (() => {
    getClients().then((data) => {
      if (data) {
        allClients.value =  data; 
      }
    });
  });


</script>