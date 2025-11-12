export interface NavigationWrapper {
  navigation_items_id: NavigationItemType;
}

export interface NavigationItem {
  title: string;
  type: string;
  url: string | null;
  product?: { slug: string } | null;
  category?: { slug: string } | null;
  page?: { permalink: string } | null;
}

export type NavigationItemType = NavigationItem & {
  children: Array<{
    related_navigation_items_id: NavigationItem;
  }>;
};

export interface Navigation {
  title?: string;
  items: NavigationWrapper[];
}

export enum MenuTypes {
  Url = "url",
  Product = "product",
  Category = "category",
  Page = "page",
}
