export const AccountTabs = {
  userDetails: "user-details",
  orders: "orders",
  messages: "messages",
} as const;

export type AccountTabValue = (typeof AccountTabs)[keyof typeof AccountTabs];
