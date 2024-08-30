<script lang="ts">
    import { goto } from "$app/navigation";
    import type { User } from "../stores/userStore";
    import { user } from "../stores/userStore";
  
    function logout() {
      user.set(null);
      goto("/", { replaceState: true });
    }
  </script>
  
  {#if $user}
    <main>
      <h1>Welcome Dr. {$user.name}</h1>
  
      <button on:click={logout}>Log out</button>
    </main>
  {/if}