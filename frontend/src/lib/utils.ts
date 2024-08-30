import { ethers, type Eip1193Provider } from "ethers";
import { user } from "../stores/userStore";
import { USERS_CONTRACT_ABI, USERS_CONTRACT_ADDRESS } from "./contracts";

export async function createUser(name: string, email: string, userType: 0 | 1) {
  if (!window.ethereum) {
    throw new Error("No ethereum provider found");
  }
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();
  const usersContract = new ethers.Contract(
    USERS_CONTRACT_ADDRESS,
    USERS_CONTRACT_ABI,
    signer
  );

  const result = await usersContract.createUser(name, email, userType);
  // await result.wait();
  console.log(result);
  const receipt = await result.wait();
  if (receipt) {
    console.log(receipt);

    user.set({ address, provider, signer, name, email, userType });
  }
}

export async function loginUser() {
  if (!window.ethereum) {
    throw new Error("No ethereum provider found");
  }
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();
  const usersContract = new ethers.Contract(
    USERS_CONTRACT_ADDRESS,
    USERS_CONTRACT_ABI,
    provider
  );

  const u = await usersContract.getUser(address);

  if (!u) {
    throw new Error("User not found");
  }

  user.set({
    address,
    provider,
    signer,
    name: u[1],
    email: u[2],
    userType: Number(u[3]) === 0 ? 0 : 1,
  });
}

export async function connectWallet() {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    // window.ethereum.request({
    // 	method: 'wallet_addEthereumChain',
    // 	params: [
    // 		{
    // 			chainId: '0x7A69',
    // 			rpcUrls: ['http://127.0.0.1:8545'],
    // 			chainName: 'Anvil',
    // 			nativeCurrency: {
    // 				name: 'Anvil',
    // 				symbol: 'GO',
    // 				decimals: 18
    // 			}
    // 		}
    // 	]
    // });


    console.log("connected");

    return address;
  } else throw new Error("No ethereum provider found");
}