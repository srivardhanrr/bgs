<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';

    const menuItems = [
        'MUSIC',
        'GOOD COUNTRY',
        'VIDEOS',
        'PODCASTS',
        'FEATURES',
        'PLAYLISTS',
        'SHOWS',
        'STORE'
    ];

    let headerRef: HTMLElement;
    let logoRef: HTMLElement;
</script>

<header bind:this={headerRef} class="w-full">
    <!-- Top Navigation Menu -->
    <nav class="w-full py-4 mx-10">
        <ul class="flex justify-between items-center">
            {#each menuItems as item}
                <li>
                    <a
                            href="/{item.toLowerCase().replace(' ', '-')}"
                            class="text-[#407055] hover:text-[#2A4234] text-sm font-medium transition-colors duration-200"
                            class:font-bold={$page.url.pathname === `/${item.toLowerCase().replace(' ', '-')}`}
                    >
                        {item}
                    </a>
                </li>
            {/each}
        </ul>
    </nav>

    <!-- Large BGS Text -->
    <div
            bind:this={logoRef}
            class="w-full overflow-hidden -mx-4"
    >
        <h1 class="text-[#407055] text-[40vw] leading-[0.8] font-bold text-center tracking-[-2vw] -mx-4">
            BGS
        </h1>
    </div>
</header>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        overflow-x: hidden;
    }
</style>