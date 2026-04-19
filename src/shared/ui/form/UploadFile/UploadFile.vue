<script setup lang="ts">
import { IconCloseFlat, IconUploadFile } from "../../icons";
import Button from "../Button/Button.vue";

const {
  name,
  required = false,
  allowed = ["image/png", "image/jpg", "image/svg", "image/webp"],
  error = "",
} = defineProps<{
  name: string;
  required?: boolean;
  allowed?: string[];
  error?: string;
}>();

const files = defineModel<File[]>({ required: true });
const defaultImage = defineModel<string>("default-image");

const accept = computed(() => allowed.join(","));

const previews = computed<Array<string | null>>((oldPreviews) => {
  if (oldPreviews) {
    oldPreviews.map((oldPreview) =>
      oldPreview ? URL.revokeObjectURL(oldPreview) : null,
    );
  }
  return files.value.map((file) =>
    file.type.startsWith("image") ? URL.createObjectURL(file) : null,
  );
});

const buttonLabel = computed(() =>
  defaultImage.value || previews.value.length ? "Change image" : "Upload image",
);

onUnmounted(() => {
  previews.value.forEach((preview) =>
    preview ? URL.revokeObjectURL(preview) : null,
  );
});

const addFilesHandler = (e: Event) => {
  const input = e.target as HTMLInputElement;
  const filesAsArray = Array.from(input.files || []);
  files.value = filesAsArray;
};

const fileRef = useTemplateRef("fileRef");

const clickOnInputHandler = () => {
  if (fileRef.value) {
    fileRef.value.click();
  }
};

const clearInputFiles = () => {
  if (fileRef.value) {
    fileRef.value.files = new DataTransfer().files;
  }
};

const deleteImage = (index: number) => {
  files.value.splice(index, 1);
  defaultImage.value = undefined;
  // const dataTransfer = new DataTransfer();
  // if (fileRef.value && fileRef.value.files?.length) {
  //   for (let i = 0; i < fileRef.value.files.length; i++) {
  //     if (i !== index) {
  //       dataTransfer.items.add(fileRef.value.files[i]!);
  //     }
  //   }
  //   fileRef.value.files = dataTransfer.files;
  // }
};

defineExpose({
  clearInputFiles,
});
</script>

<template>
  <section class="upload-file">
    <div v-if="!files.length && defaultImage" class="upload-file__preview">
      <div class="div upload-file__preview__item">
        <NuxtImg
          provider="directus"
          format="webp"
          :width="200"
          :src="defaultImage"
        />
        <IconCloseFlat @click="defaultImage = undefined" />
      </div>
    </div>
    <div v-else-if="files.length" class="upload-file__preview">
      <div
        v-for="(file, index) in files"
        :key="file.name"
        class="div upload-file__preview__item"
      >
        <NuxtImg v-if="previews[index]" :src="previews[index]" />
        <IconCloseFlat @click="deleteImage(index)" />
      </div>
    </div>
    <div class="upload-file__area">
      <Button
        variant="fill"
        size="normal"
        type="button"
        @click="clickOnInputHandler"
      >
        <template #left-icon>
          <IconUploadFile />
        </template>
        {{ buttonLabel }}
      </Button>
      <input
        ref="fileRef"
        type="file"
        :name
        hidden
        :accept
        :required
        @change="addFilesHandler"
      />
    </div>
    <span v-if="error" class="upload-file__error">
      {{ error }}
    </span>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
