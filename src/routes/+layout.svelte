<script lang="ts">
    import '../app.css';

    let {children} = $props();
    import {onMount} from 'svelte';
    import Header from "$lib/components/Header.svelte";

    onMount(() => {
        // Initialize any global animations here
    });
</script>

<div class="min-h-screen bg-[#f1f0ea]">
    <Header/>
    <main>
        {@render children()}
    </main>
</div>