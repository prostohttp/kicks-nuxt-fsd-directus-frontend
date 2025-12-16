export { CollectionType } from "./types/collection";
export type { PageType, BlockType } from "./types/page";
export type { CategoryType } from "./types/category";
export type { ReviewType } from "./types/review";
export type { ProductType, ApiFilterType } from "./types/product";
export type { GlobalType } from "./types/global";
export type { ImageType } from "./types/image";
export type { BlockSliderType } from "./types/blocks";
export type { BlockProductType } from "./types/blocks";
export type { BlockCategoryType } from "./types/blocks";
export type { BlockReviewsType } from "./types/blocks";

export type {
  FilterType,
  FiltersType,
  OptionType,
  OptionProductType,
  OptionValueType,
  ApiProductActiveOptionType,
} from "./types/option";

export { getPageBlocksAndSeo } from "./base/pageApi";
export { getBanner } from "./base/bannerApi";
export { getForm } from "../ui/form/api";
export { getBlockSlider } from "./base/blockSliderApi";
export { getBlockProducts } from "./base/blockProductsApi";
export { getBlockCategories } from "./base/blockCategoriesApi";
export { getBlockReviews } from "./base/blockReviewsApi";
export { getBlockRichTextEditor } from "./base/blockRichTextEditorApi";
export { getSlider } from "./base/sliderApi";
export { getCopyright, getDescription, getSocial } from "./base/appInfoApi";
export { getCategoriesMenu, getCompanyMenu, getMainMenu } from "./base/menuApi";
export type { Copyright, Description, Social } from "./types/appInfo";
export type { SeoType } from "./types/seo";
