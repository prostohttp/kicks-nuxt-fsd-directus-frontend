import type { DirectusUser } from "nuxt-directus";

export type GenderType = "male" | "female";

export type UserTypeApi = {
  email: string;
  first_name: string;
  last_name: string;
  gender: GenderType;
  address?: string;
  password?: string;
} & DirectusUser;
