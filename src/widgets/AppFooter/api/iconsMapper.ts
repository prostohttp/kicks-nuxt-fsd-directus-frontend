import type { Component } from "vue";
import {
  IconFacebook,
  IconInstagram,
  IconTiktok,
  IconTwitter,
} from "~/src/shared/ui/icons";

export const iconsMapper: Record<string, Component> = {
  facebook: IconFacebook,
  instagram: IconInstagram,
  twitter: IconTwitter,
  tiktok: IconTiktok,
};
