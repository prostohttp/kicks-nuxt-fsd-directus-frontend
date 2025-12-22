<script setup lang="ts">
import { IconCloseFlat, IconUploadFile } from "../../icons";
import Button from "../Button/Button.vue";

const {
  label,
  name,
  placeholder,
  help,
  multiple = true,
  required = true,
  allowed = ["image/png", "image/jpg", "image/svg", "image/webp"],
  error = "",
} = defineProps<{
  label: string;
  name: string;
  placeholder: string;
  help?: string;
  multiple?: boolean;
  required?: boolean;
  allowed?: string[];
  error?: string;
}>();

const files = defineModel<File[]>({ required: true });

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
  const dataTransfer = new DataTransfer();
  if (fileRef.value && fileRef.value.files?.length) {
    for (let i = 0; i < fileRef.value.files.length; i++) {
      if (i !== index) {
        dataTransfer.items.add(fileRef.value.files[i]!);
      }
    }
    fileRef.value.files = dataTransfer.files;
  }
};

defineExpose({
  clearInputFiles,
});
</script>

<template>
  <section class="upload-files">
    <div class="upload-files__area">
      <h3 v-if="placeholder">
        <span v-if="required" class="upload-files__area__required">*</span>
        {{ placeholder }}
      </h3>
      <Button
        variant="fill"
        size="normal"
        type="button"
        @click="clickOnInputHandler"
      >
        <template #left-icon>
          <IconUploadFile />
        </template>
        {{ label }}
      </Button>
      <input
        ref="fileRef"
        type="file"
        :name
        hidden
        :accept
        :multiple
        @change="addFilesHandler"
      />
      <span v-if="help"> * {{ help }}</span>
    </div>
    <GSAPTransition :hidden="{ alpha: 1 }" :duration="0.15">
      <div v-if="files.length" class="upload-files__preview">
        <div
          v-for="(file, index) in files"
          :key="file.name"
          class="div upload-files__preview__item"
        >
          <NuxtImg v-if="previews[index]" :src="previews[index]" />
          <IconCloseFlat @click="deleteImage(index)" />
        </div>
      </div>
    </GSAPTransition>
    <span v-if="error" class="upload-files__error">
      {{ error }}
    </span>
  </section>
</template>

<style lang="scss">
@use "styles";
</style>
