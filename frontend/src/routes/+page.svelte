<script lang="ts">
    import { user } from "../stores/userStore";
    import { projects } from "../stores/projectStore";
    import { onMount } from "svelte";
    import For from "../components/For.svelte";
    import { connectWallet } from "$lib/utils";
    import { getAllProjects } from "$lib/projects";
  
    let showOnlyMyProjects = false;
  
    $: projs = showOnlyMyProjects
      ? $projects.filter((project) => project.owner === $user!.address)
      : $projects;
  
    onMount(() => {
      getAllProjects(); // Ensure this only runs once when the component mounts
    });
  </script>
  
  <!-- {#if $user} -->
    <!-- <div>
      <button on:click={() => (showOnlyMyProjects = false)}>ALL PROJECTS</button>
      <button on:click={() => (showOnlyMyProjects = true)}>My Projects</button>
    </div>
    <h2>Projects</h2>
    <h2>{$user.address}</h2>
    <p>{$projects.length}</p>
    {#if showOnlyMyProjects}
      <p>Showing only your projects</p>
    {/if}
    <div class="projectContainer">
      {#each projs as project}
        <a href={`project/${project.address}`}>
          <div class="projectCard">
            <h3>{project.name}</h3>
            <p>Topic: {project.topic}</p>
            <p>Fund: {project.fund}</p>
            <p>{project.address}</p>
          </div>
        </a>
      {/each}
    </div>
  {:else} -->
    <main>
      <div class="overlay">
        <h1>REASEWORK</h1>
        <p class="overlayp">Research made easy</p>
        <a href="/auth">Get started</a>
      </div>
    </main>
    <For />
  <!-- {/if} -->
  
  <style>
    main {
      background: url("./landing_page.png");
      height: 100vh;
      background-size: cover;
      background-repeat: no-repeat;
    }
  
    .overlay {
      background: rgba(208, 85, 37, 0.5);
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  
    .projectContainer {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    }
  
    a {
      text-decoration: none;
    }
  
    .projectCard {
      background-color: var(--background);
      color: var(--primary);
      padding: 1rem;
      margin: 1rem;
      border-radius: 1rem;
      width: min-content;
      box-shadow: 0.1rem 0.1rem 0.5rem rgba(0, 0, 0, 0.5);
    }
  
    h1,
    .overlayp {
      color: var(--background);
      letter-spacing: 0.75rem;
    }
  
    a {
      background-color: var(--primary);
      color: var(--background);
      padding: 0.5rem 2rem;
      border-radius: 1rem;
      border: solid var(--secondary) 0.15rem;
      cursor: pointer;
      margin: 1rem;
      transition: 0.1s ease-in-out;
    }
    a:hover {
      border-radius: 0;
      transition: 0.1s ease-in-out;
    }
  </style>