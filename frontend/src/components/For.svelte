<script lang="ts">
    let selected: string = "students" as string | "profs" as string;
  </script>
  
  <main>
    <div class="for">
      <div class="header">
        <button
          on:click={() => (selected = "students")}
          class={selected === "students" ? "highlight" : ""}
        >
          <p>STUDENTS</p>
        </button>
        <button
          on:click={() => (selected = "profs")}
          class={selected === "profs" ? "highlight" : ""}
        >
          <p>PROFESSORS</p></button
        >
      </div>
  
      <div class="content">
        {#if selected === "students"}
          <p>Get mentorship and validation from renouned faculties</p>
          <p>Get funds for your experimentation</p>
          <p>Get bulletproof security and ownership of your paper</p>
        {:else}
          <p>Earn incentives for sharing your expertise</p>
          <p>Build your professional teaching portfolio</p>
          <p></p>
        {/if}
      </div>
    </div>
  </main>
  
  <style>
    .for {
      width: 80%;
    }
  
    .header {
      display: flex;
      justify-content: space-around;
      background-color: var(--primary);
      border-top-left-radius: 1rem;
      border-top-right-radius: 1rem;
    }
    .content p {
      font-family: "Poppins" sans-serif;
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0.5rem;
    }
  
    button > p {
      text-align: center;
      font-weight: 700;
      color: white;
      font-family: "Poppins" sans-serif;
    }
  
    .highlight {
      background-color: var(--secondary);
      border-radius: 1rem;
    }
    .highlight > p {
      text-align: center;
      font-weight: 700;
      color: var(--text);
      font-family: "Poppins" sans-serif;
    }
    .content {
      border: 0.2rem solid var(--secondary);
      border-bottom-left-radius: 1rem;
      border-bottom-right-radius: 1rem;
      border-top: none;
      padding: 2rem;
      height: 120px;
    }
  
    button {
      width: 50%;
      text-align: center;
      border: none;
      padding: 0.5rem;
      cursor: pointer;
      background-color: var(--primary);
      margin: 0.5rem;
    }
  
    main {
      height: 60vh;
      background-color: var(--backround);
      display: flex;
      justify-content: center;
      align-items: center;
    }
  </style>