<script lang="ts">
    import { goto } from "$app/navigation";
    import { connectWallet, createUser, loginUser } from "$lib/utils";
    import { onMount } from "svelte";
    import { user } from "../../stores/userStore";
    import { ethers } from "ethers";

    let name: string = "";
    let email: string = "";
    let type: 0 | 1 = 0;

    onMount(() => {
        if ($user) {
            goto("/home", { replaceState: true });
        }
    });
</script>

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

    h1 {
        margin-bottom: 20px;
        color: #333;
    }

    input, select {
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
</style>

<main>
    <h1>Get started</h1>

    <input type="text" placeholder="Name" bind:value={name} />
    <input type="text" placeholder="Email" bind:value={email} />
    <select bind:value={type}>
        <option value={0}>Professor</option>
        <option value={1}>Student</option>
    </select>
    <button
        on:click={async () => {
            await createUser(name, email, type);
            if ($user) {
                goto("/home", { replaceState: true });
            }
        }}>Connect Wallet</button>

    <br /><br />

    <h1>Login</h1>
    <button
        on:click={async () => {
            if (window.ethereum) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                console.log(address);

                loginUser();
            }
        }}>Login using wallet</button>
</main>
