export const ROUTES = {
  main: "/",
  cart: "/cart",
  search: "/search",
  account: "/account",
  auth: "/auth",
  reviews: "/reviews",
  login: "/login",
  register: "/register",
  categories: "/category",
  page: (slug: string) => `/${slug}`,
  category: (slug: string) => `/category/${slug}`,
  product: (slug: string) => `/product/${slug}`,
};
