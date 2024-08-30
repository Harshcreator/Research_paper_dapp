<script>
  import { onMount } from "svelte";
  import { user } from "../../stores/userStore";
  import { loginUser } from "$lib/utils";
  import StudentHome from "../../screens/studentHome.svelte";
  import ProfessorHome from "../../screens/professorHome.svelte";

  async function login() {
      try {
          await loginUser();
      } catch (error) {
          alert(error);
      }
  }

  onMount(() => {
      login();
  });
</script>

<main>
  {#if $user}
      {#if Number($user.userType) === 0}
          <ProfessorHome />
      {:else}
          <StudentHome />
      {/if}
  {:else}
      <h1>Connect your wallet</h1>
  {/if}
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
      font-size: 24px;
      margin-bottom: 20px;
      text-align: center;
  }

  button {
      background-color: #007bff; /* Blue background color */
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      margin-top: 20px;
      text-align: center;
      width: 300px;
  }

  button:hover {
      background-color: #0056b3; /* Darker blue on hover */
  }
</style>
