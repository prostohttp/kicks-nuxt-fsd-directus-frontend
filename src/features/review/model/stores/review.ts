import type { AddReviewType, ReviewType } from "~/src/shared/api";
import { addReview as apiAddReview } from "../../api";

export const useReviewStore = defineStore("reviews", () => {
  const reviews = ref<ReviewType[]>([]);

  const addReview = async (review: AddReviewType, files: File[]) => {
    return await apiAddReview(review, files);
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
