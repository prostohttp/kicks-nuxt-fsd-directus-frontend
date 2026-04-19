import type { UserTypeApi } from "~/src/shared/api";

export const useAppUser = () => {
  const user = useDirectusUser();
  return user as ComputedRef<UserTypeApi | null>;
};
