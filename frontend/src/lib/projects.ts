import { ethers } from "ethers";
import {
  PROJECT_ABI,
  PROJECT_FACTORY_CONTRACT_ABI,
  PROJECT_FACTORY_CONTRACT_ADDRESS,
} from "./contracts";
import { projects, type Project } from "../stores/projectStore";
import { user } from "../stores/userStore";

export async function getAllProjects() {
  // const userValue = $user; // Cache the store value for use in this function.

  user.subscribe(async (userValue) => {
    if (userValue) {
      const contract = new ethers.Contract(
        PROJECT_FACTORY_CONTRACT_ADDRESS,
        PROJECT_FACTORY_CONTRACT_ABI,
        userValue.provider
      );

      const p = await contract.getAllProjects();
      let newProjects: Project[] = []; // Temporary array to hold new projects

      for (let index = 0; index < p.length; index++) {
        const address = p[index];
        const project = new ethers.Contract(
          address,
          PROJECT_ABI,
          userValue.provider
        );

        const name = await project.name();
        const paperUri = await project.paperUri();
        const topic = await project.topic();
        const fund = Number(await userValue.provider.getBalance(address));
        const owner = await project.owner();

        newProjects.push({
          name,
          paperUri,
          topic,
          fund,
          address,
          owner,
        });
      }

      projects.set(newProjects); // Update the store with the new list of projects
    }
  });
}