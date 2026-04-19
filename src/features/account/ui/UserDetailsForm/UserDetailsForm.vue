<script setup lang="ts">
import { Button, Input, Textarea, UploadFile } from "~/src/shared/ui/form";
import { useAppUser } from "~/src/entities/User";
import {
  type UserDetailsSchemaType,
  UserDetails,
} from "../../model/userDetailsSchema";

const user = useAppUser().value;
const userData: UserDetailsSchemaType = reactive({
  email: user?.email || "",
  first_name: user?.first_name || "",
  last_name: user?.last_name || "",
  address: user?.address,
  gender: user?.gender,
  password: "",
  avatar: user?.avatar,
});

const avatar = ref<File[]>([]);

watch(avatar, (newValue) => {
  if (newValue) {
    console.log("new value", newValue);
  }
});

const errors = reactive({
  email: {
    title: "Email",
    value: "",
  },
  first_name: {
    title: "First name",
    value: "",
  },
  last_name: {
    title: "Lat name",
    value: "",
  },
});

const clearErrors = () => {
  errors.email.value = "";
  errors.first_name.value = "";
  errors.last_name.value = "";
};

const isDisabled = computed(() => false);

const {
  mutate: changeDetails,
  error,
  reset,
  asyncStatus,
} = useMutation({
  mutation: async (data: UserDetailsSchemaType) => {
    const result = UserDetails.safeParse(data);
    clearErrors();

    if (!result.success) {
      result.error.issues.forEach((error) => {
        const key = error.path[0];
        if (key && key in errors) {
          if (key === "email") errors.email.value = error.message;
          if (key === "first_name") errors.first_name.value = error.message;
          if (key === "last_name") errors.last_name.value = error.message;
        }
      });
    } else {
      // await actionOrderStore.saveOrder(data);
      // clearErrors();
      // isCreatedOrder.value = true;
    }
  },
});
</script>

<template>
  <section class="user-details-form">
    <form>
      <div class="user-details-form__left">
        <Input
          v-model="userData.first_name"
          name="firstName"
          placeholder="* First name"
          :error="errors.first_name.value"
          required
          label="First name"
        />
        <Input
          v-model="userData.last_name"
          name="lastName"
          placeholder="* Last name"
          :error="errors.last_name.value"
          label="Last name"
          required
        />
        <Input
          v-model="userData.email"
          name="email"
          placeholder="* Email"
          :error="errors.email.value"
          label="Email"
          required
        />
        <Input
          v-model="userData.password"
          name="password"
          type="password"
          placeholder="Password"
          label="Password"
        />
        <Textarea
          v-model="userData.address"
          name="address"
          info="Enter your full address (street, city, ZIP code)"
          placeholder="Address"
          label="Address"
        />
        <Button
          type="submit"
          variant="fill"
          size="large"
          :disabled="isDisabled"
        >
          <template #default>Save details</template>
        </Button>
      </div>
      <div class="user-details-form__right">
        <div class="user-details-form__right__label">Avatar</div>
        <UploadFile
          v-model="avatar"
          v-model:default-image="userData.avatar"
          name="avatar"
          placeholder="You can upload an avatar by clicking the button below."
        />
      </div>
    </form>
    <!-- <pre>{{ userData }}</pre> -->
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
