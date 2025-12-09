export interface Copyright {
  copyright: string;
}

export interface Description {
  description: string;
}

export interface Social {
  social_links: Array<{
    url: string;
    service: string;
  }>;
}
