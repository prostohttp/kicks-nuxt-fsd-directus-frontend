import * as z from "zod";

const TitleField = z.object({
  value: z
    .string()
    .min(10, { message: "Value is required, min 10 characters" })
    .max(50, { message: "Value must not exceed 50 characters" }),
  field: z.number(),
});

const ReviewField = z.object({
  value: z
    .string()
    .min(50, { message: "Value is required, min 50 characters" })
    .max(1000, { message: "Value must not exceed 1000 characters" }),
  field: z.number(),
});

const RatingField = z.object({
  value: z.number().min(1).max(5),
  field: z.number(),
});

const ImagesField = z.object({
  value: z
    .array(
      z
        .file()
        .min(1)
        .max(1024 * 1024, "Max image size 1 Mb")
        .mime([
          "image/png",
          "image/jpg",
          "image/jpeg",
          "image/svg",
          "image/webp",
        ]),
    )
    .min(1, "Required, 1 and more images")
    .max(10, "Max 10 images"),
  field: z.number(),
});

const ProductField = z.object({
  value: z.number(),
  field: z.number(),
});

export const AddReview = z.object({
  form: z.number(),
  values: z.tuple([
    TitleField,
    ReviewField,
    RatingField,
    ImagesField,
    ProductField,
  ]),
});

export type AddReviewType = z.infer<typeof AddReview>;
