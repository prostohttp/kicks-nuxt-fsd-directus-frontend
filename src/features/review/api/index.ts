import type { DirectusFile } from "nuxt-directus";
import {
  CollectionType,
  type AddedReviewType,
  type AddReviewType,
  type ReviewFileType,
} from "~/src/shared/api";

export const addReview = async (item: AddReviewType, images: File[]) => {
  const user = useDirectusUser();
  const files = useDirectusFiles();

  try {
    if (!user.value) {
      throw createError({ message: "Please log in to write a review" });
    }

    const createdReview = (await useNuxtApp().$api.create(
      CollectionType.REVIEWS,
      [
        {
          ...item,
          user_created: user.value.id,
        },
      ],
    )) as AddedReviewType[];

    const review = createdReview[0];

    if (!review) {
      throw createError({ message: "Error review added" });
    }

    const uploadedFiles: DirectusFile | DirectusFile[] =
      await files.uploadFiles(images);

    let gallery: Array<number | undefined> = [];

    if (Array.isArray(uploadedFiles)) {
      const reviewsFiles = uploadedFiles.map((el) => {
        if (el) {
          return {
            directus_files_id: el.id,
            reviews_id: review.id,
          };
        }
      }) as ReviewFileType[];

      const createdReviewsFiles = (await useNuxtApp().$api.create(
        CollectionType.REVIEWS_FILES,
        reviewsFiles,
      )) as ReviewFileType[];

      gallery = createdReviewsFiles.map((el) => el.id);
    } else {
      const reviewFile = {
        directus_files_id: uploadedFiles?.id,
        reviews_id: review?.id,
      };

      const createdReviewsFiles = (await useNuxtApp().$api.create(
        CollectionType.REVIEWS_FILES,
        [reviewFile],
      )) as ReviewFileType[];

      gallery = createdReviewsFiles.map((el) => el.id);
    }

    return await useNuxtApp().$api.update(
      CollectionType.REVIEWS,
      review.id.toString(),
      {
        ...review,
        gallery,
      },
    );
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
