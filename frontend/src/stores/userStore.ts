import { writable } from "svelte/store";
import { ethers } from "ethers";

export type User = {
  address: string;
  provider: ethers.BrowserProvider;
  signer: ethers.Signer;
  name: string;
  email: string;
  userType: 0 | 1;
};

export const user = writable<User | null>();

// user.subscribe((value) => {
//   if (value) {
//     localStorage.setItem("user", JSON.stringify(value));
//   } else {
//     localStorage.removeItem("user");
//   }
// });

// user.update((value) => {
//   const user = localStorage.getItem("user");
//   if (user) {
//     return JSON.parse(user);
//   }
//   return value;
// });