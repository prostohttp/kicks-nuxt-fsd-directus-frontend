import { CollectionType } from "~/src/shared/api";
import type { SubscriptionType } from "../model/subscriptionSchema";

export const createSubscription = (items: SubscriptionType[]) => {
  try {
    return useNuxtApp().$api.create(CollectionType.FORM_SUBMISSIONS, items);
  } catch (e) {
    const error = e as Error;
    throw createError({ message: error.message });
  }
};
