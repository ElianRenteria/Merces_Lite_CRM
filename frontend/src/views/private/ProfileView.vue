<script lang="ts" setup>
    import { useCurrentUser } from "../../composables/useCurrentUser";
    const { user, initials } = useCurrentUser();
    const first_name = ref('');
    const last_name = ref('');
    const date_of_birth = ref('');
    const email = ref('');
    onMounted(() => {
        first_name.value = user.first_name;
        last_name.value = user.last_name;
        date_of_birth.value = user.date_of_birth;
        email.value = user.email;
    });
</script>

<template>
  <div class="flex flex-column justify-content-start align-items-center">
    <h1>Profile</h1>
    <div class="flex flex-row gap-3 my-3">
      <div class="flex flex-column gap-2">
        <label for="fname">First Name</label>
        <InputText id="fname" v-model="first_name" />
        <label for="email">Email</label>
        <InputText id="email" v-model="email" />
      </div>

      <div class="flex flex-column gap-2">
        <div class="flex flex-column gap-2">
          <label for="lname">Last Name</label>
          <InputText id="lname" v-model="last_name" />
          <label for="dob">Date of birth</label>
          <InputText id="dob" v-model="date_of_birth" />
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
  </div>
</template>

<style lang="css" scoped>

</style>