import { writable } from "svelte/store";

export type Project = {
  name: string;
  paperUri: string;
  topic: string;
  address: string;
  fund: number;
  owner: string;
};

export const projects = writable<Project[]>([]);