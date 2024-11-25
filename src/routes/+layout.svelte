<script lang="ts">
    import '../app.css';

    let {children} = $props();
    import {onMount} from 'svelte';
    import {gsap} from 'gsap';
    import {ScrollTrigger} from 'gsap/ScrollTrigger';
    import Header from "$lib/components/Header.svelte";

    gsap.registerPlugin(ScrollTrigger);

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