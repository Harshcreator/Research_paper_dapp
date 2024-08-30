import { ethers } from "ethers";
import { user } from "../stores/userStore";
import { USERS_CONTRACT_ABI, USERS_CONTRACT_ADDRESS } from "./contracts";

export async function getAllStudents() {
  user.subscribe(async (value) => {
    if (!value) {
      throw new Error("User not found");
    }

    let students: {}[] = [];

    const contract = new ethers.Contract(
      USERS_CONTRACT_ADDRESS,
      USERS_CONTRACT_ABI,
      value.provider
    );

    const s = await contract.getAllUsers();

    for (let index = 0; index < s.length; index++) {
      const element = s[index];
      console.log(element);
      
    }
  });
}