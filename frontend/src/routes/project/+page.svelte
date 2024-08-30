<script lang="ts">
  let name: string = "";
  let topic: string = "";
  let paperUri: string = "";
  let coAuthors: string[] = [];
</script>

<main>
  <input type="text" placeholder="Name" bind:value={name} />
  <br />
  <input type="text" placeholder="Topic" bind:value={topic} />
  <br />
  <input type="text" placeholder="Paper URI" bind:value={paperUri} />
  <br />
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label>Invite co-authors</label>
  <input type="text" placeholder="Email" />
  <br />
  <button>Submit</button>
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
  }

  input {
      margin: 10px 0;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
      width: 300px;
      font-size: 16px;
  }

  label {
      margin-top: 20px;
      font-size: 16px;
      color: #333;
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
      width: 300px;
      text-align: center;
  }

  button:hover {
      background-color: #0056b3; /* Darker blue on hover */
  }
</style>
