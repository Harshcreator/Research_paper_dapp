<script lang="ts">
    import { onMount } from "svelte";
    import { user } from "../stores/userStore";
    import { projects } from "../stores/projectStore";
    import { getAllProjects } from "$lib/projects";
    import { getAllStudents } from "$lib/usersData";
  
    onMount(() => {
      getAllProjects();
    });
  </script>
  
  {#if $user}
    <main>
      <h1>Welcome {$user.name}</h1>
  
      <button on:click={getAllStudents}>get all users</button>
  
      {#if $projects.length === 0}
        <p>You do not have any projects</p>
      {:else}
        <h2>Projects</h2>
  
        {#if $projects}
          {#each $projects as project}
            <div>
              <h3>{project.name}</h3>
              <p>{project.topic}</p>
            </div>
          {/each}
        {:else}
          <p>No projects found</p>
        {/if}
      {/if}
  
      <a href="/project"> Create new Project</a>
    </main>
  {/if}
  
  <style>
    main {
      padding: 1rem;
    }
  </style>