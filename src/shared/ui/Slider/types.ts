export interface BannerForSliderType {
  id: string;
  image: string;
  preview_image?: string;
  slide_label?: string;
  heading?: string;
  description?: string;
  button_url?: string;
  button_text?: string;
}

export interface SliderType {
  banners: BannerForSliderType[];
}
