import { ethers, type Eip1193Provider } from "ethers";
import type { PageLoad } from "./$types";
import { PROJECT_ABI } from "$lib/contracts";

export const load: PageLoad = async ({ params }) => {
  let data: PageProps = {
    projectAddress: "",
    name: "",
    paperUri: "",
    topic: "",
    balance: 0,
    mentors: [],
  };
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  // const p = new ethers.BrowserProvider(window.ethereum as Eip1193Provider);
  // console.log(p);

  const contract = new ethers.Contract(
    params.projectAddress,
    PROJECT_ABI,
    provider
  );

  // const project = new ethers.Contract(address, PROJECT_ABI, $user.provider);
  const name = await contract.name();
  const paperUri = await contract.paperUri();
  const topic = await contract.topic();
  const balance = await provider.getBalance(params.projectAddress);
  const mentors = await contract.getAllMentors();

  let m = [];

  for (let index = 0; index < mentors.length; index++) {
    const element = data.mentors[index];
    m[index] = mentors[index];
  }

  data = {
    projectAddress: params.projectAddress,
    name,
    paperUri,
    topic,
    balance: Number(balance),
    mentors: m,
  };

  return data;
};

export interface PageProps {
  projectAddress: string;
  name: string;
  paperUri: string;
  topic: string;
  balance: number;
  mentors: any[];
}