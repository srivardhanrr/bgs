<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    let navRef: HTMLElement;

    onMount(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Initial states - changed top position to be just below header
        gsap.set(logoRef, {
            fontSize: '40vw',
            left: '50%',
            fontWeight: 'bold',
            x: '-50%',
            position: 'absolute',
            top: '-9rem'  // Changed from '50vh' to position it below header
        });

        gsap.set(navRef, {
            // marginLeft: '40px'  // Initial margin
        });

        // Create animation timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: '+=300',
                scrub: 1
            }
        });

        // Animate the BGS text to header position and shift nav simultaneously
        tl.to(logoRef, {
            fontSize: '2rem',
            top: '0.3rem',
            left: '2.5rem',
            x: '0',
            duration: 1,
            ease: 'power2.inOut'
        })
            .to(navRef, {
                marginLeft: '9rem',  // Final margin to make space for BGS
                ease: 'power2.in'
            }, '<');  // The '<' makes this animation start at the same time as the logo animation
    });
</script>

<header class="fixed top-0 bg-[#f1f0ea] left-0 right-0 z-50">
    <!-- Top Navigation Menu -->
    <nav bind:this={navRef} class="py-4 mx-10">
        <ul class="flex justify-between font-bold items-center">
            {#each menuItems as item}
                <li>
                    <a
                            href="/{item.toLowerCase().replace(' ', '-')}"
                            class="text-[#407055] align-center hover:text-[#2A4234] text-sm font-bold transition-colors duration-200"
                            class:font-bold={$page.url.pathname === `/${item.toLowerCase().replace(' ', '-')}`}
                    >
                        {item}
                    </a>
                </li>
            {/each}
        </ul>
    </nav>

    <!-- BGS Text that will animate -->
    <h1
            bind:this={logoRef}
            class="text-[#407055] font-bold tracking-[-0.05em]"
    >
        BGS
    </h1>
</header>

<!-- Spacer to allow scrolling -->
<div class="h-[65vh]"></div>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        overflow-x: hidden;
    }

    header {
        transform: translateZ(0);
        will-change: transform;
    }

    h1 {
        transform-origin: left center;
    }

    nav {
        will-change: margin;
    }
</style>