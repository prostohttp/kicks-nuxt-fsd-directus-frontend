import type { AddReviewType, ReviewType } from "~/src/shared/api";
import { addReview as apiAddReview } from "../../api";

export const useReviewStore = defineStore("reviews", () => {
  const reviews = ref<ReviewType[]>([]);

  const addReview = async (review: AddReviewType, files: File[]) => {
    try {
      return await apiAddReview(review, files);
    } catch (e) {
      const error = e as Error;
      console.log(error.message);
      throw createError({
        message:
          "Invalid response from server, please send this information to us",
      });
    }
  };

  const editReview = async (review: ReviewType) => {
    console.log(review);
  };

  return {
    reviews,
    addReview,
    editReview,
  };
});
