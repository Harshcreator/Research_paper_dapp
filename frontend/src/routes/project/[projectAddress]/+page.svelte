<script lang="ts">
  import { ethers } from "ethers";
  import type { PageProps } from "./+page";
  import { PROJECT_ABI } from "$lib/contracts";
  import { user } from "../../../stores/userStore";

  export let data: PageProps;

  let amount: number = 0.005;
  let mentorName: string = "";

  async function donate() {
    const contract = new ethers.Contract(
      data.projectAddress,
      PROJECT_ABI,
      $user.signer
    );
    const tx = await contract.fund({ value: ethers.parseEther(`${amount}`) });
    await tx.wait();
    console.log(tx);
  }

  async function becomeMentor() {
    if (!mentorName) {
      alert("Please enter mentor name");
      return;
    }
    const contract = new ethers.Contract(
      data.projectAddress,
      PROJECT_ABI,
      $user.signer
    );
    const tx = await contract.addMentor(mentorName, $user.address, {
      value: ethers.parseEther("0.01"),
    });
    await tx.wait();
    console.log(tx);
  }
</script>

<main>
  <h1>{data.name}</h1>
  <p>{data.projectAddress}</p>
  <p>Balance: {data.balance / Math.pow(10, 18)} ETH</p>

  <br />

  <h1>Become a Mentor</h1>
  <label for="mentorName">Mentor Name</label>
  <input id="mentorName" bind:value={mentorName} type="text" />
  <button on:click={becomeMentor}>Become Mentor</button>

  <br /><br />

  <h1>Donate Amount</h1>
  <input id="amount" bind:value={amount} type="number" />

  <p>Amount to donate: {amount} ETH</p>
  <button on:click={donate}>Donate</button>

  <br /><br />

  <button on:click={() => {
      for (let index = 0; index < data.mentors.length; index++) {
          const element = data.mentors[index];
          console.log(element);
      }
  }}>Get All Mentors</button>
</main>

<style>
  main {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      background-color: #f0f4f8; /* Light background color */
      padding: 20px;
      font-family: Arial, sans-serif;
  }

  h1 {
      color: #333;
      margin-bottom: 20px;
      font-size: 24px;
  }

  p {
      color: #666;
      font-size: 18px;
      margin-bottom: 10px;
  }

  label {
      font-size: 16px;
      color: #333;
      margin-bottom: 10px;
  }

  input {
      margin: 10px 0;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
      width: 300px;
      font-size: 16px;
  }

  button {
      background-color: #007bff; /* Blue background color */
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      margin-top: 10px;
      width: 300px;
      text-align: center;
  }

  button:hover {
      background-color: #0056b3; /* Darker blue on hover */
  }

  button:last-of-type {
      margin-top: 20px;
      background-color: #28a745; /* Green background for the 'Get All Mentors' button */
  }

  button:last-of-type:hover {
      background-color: #218838; /* Darker green on hover */
  }
</style>
