export interface BannerType {
  id?: string;
  image: string;
  small_heading?: string;
  heading?: string;
  description?: string;
}

export interface BannerTypeApi {
  banner: {
    id?: string;
    image: string;
    small_heading?: string;
    heading?: string;
    description?: string;
  };
}
