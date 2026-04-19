import type { Component } from "vue";

export interface TabHeaderType<T> {
  id: number;
  title: string;
  name: T;
}

export interface TabHeaderSimpleType {
  id: number;
  title: string;
  name: string;
}

export type TabContentType = Record<string, Component>;
