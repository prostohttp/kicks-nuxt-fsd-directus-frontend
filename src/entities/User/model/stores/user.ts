import { getUserInfo } from "../../api";

export const useUserStore = defineStore("user", () => {
  const user = ref();

  const getUser = async (userId?: string) => {
    return userId ? await getUserInfo(userId) : undefined;
  };

  return { user, getUser };
});
