<script lang="ts">
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';

    export let data;

    onMount(() => {
        gsap.from('.post-card', {
            y: 50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power2.out'
        });
    });
</script>

<main class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">Latest Posts</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each data.posts as post (post.id)}
            <article class="post-card bg-white rounded-lg shadow-md overflow-hidden">
                {#if post.featuredImage?.node}
                    <img
                            src={post.featuredImage.node.sourceUrl}
                            alt={post.featuredImage.node.altText || post.title}
                            class="w-full h-48 object-cover"
                    />
                {/if}
                <div class="p-4">
                    <h2 class="text-xl font-semibold mb-2">{post.title}</h2>
                    <div class="text-gray-600 mb-4">
                        {@html post.excerpt}
                    </div>
                    <a
                            href={`/post/${post.slug}`}
                            class="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                        Read More
                    </a>
                </div>
            </article>
        {/each}
    </div>
</main>