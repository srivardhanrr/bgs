<script lang="ts">
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';

    gsap.registerPlugin(ScrollTrigger);

    export let data;
    const { post } = data;

    let content: HTMLElement;

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    onMount(() => {
        // Animate hero section
        gsap.from('.hero-content', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });

        // Animate content sections
        const paragraphs = content.querySelectorAll('p, h2, h3, figure');
        gsap.from(paragraphs, {
            scrollTrigger: {
                trigger: content,
                start: 'top 80%',
                toggleActions: 'play none none reset'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out'
        });
    });
</script>

<article class="min-h-screen">
    <!-- Hero Section -->
    <div class="relative w-full h-[60vh] min-h-[400px] mb-8">
        {#if post.featuredImage?.node}
            <div class="absolute inset-0">
                <img
                        src={post.featuredImage.node.sourceUrl}
                        alt={post.featuredImage.node.altText || post.title}
                        class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
        {/if}

        <div class="hero-content text-black relative h-full container mx-auto px-4 flex items-center justify-center text-center text-white">
            <div>
                {#if post.categories?.nodes?.length}
                    <div class="mb-4 space-x-2">
                        {#each post.categories.nodes as category}
                            <span class="inline-block px-3 py-1 bg-blue-600 rounded-full text-sm">
                                {category.name}
                            </span>
                        {/each}
                    </div>
                {/if}

                <h1 class="text-4xl text-black md:text-5xl lg:text-6xl font-bold mb-4">
                    {post.title}
                </h1>

                <div class="flex items-center justify-center space-x-4 text-sm md:text-base">
                    {#if post.author?.node}
                        <div class="flex items-center">
                            <a
                                    href="/author/{post.author.node.slug}"
                                    class="flex items-center hover:text-blue-600 transition-colors"
                            >
                                {#if post.author.node.avatar?.url}
                                    <img
                                            src={post.author.node.avatar.url}
                                            alt={post.author.node.name}
                                            class="w-8 h-8 rounded-full mr-2"
                                    />
                                {/if}
                                <span>{post.author.node.name}</span>
                            </a>
                        </div>
                    {/if}
                    <span>•</span>
                    <time datetime={post.date}>{formatDate(post.date)}</time>
                </div>
            </div>
        </div>
    </div>

    <!-- Content Section -->
    <div class="container px-4">
        <div class="max-w-5xl mx-auto">
            <div
                    bind:this={content}
                    class="prose prose-lg max-w-none"
            >
                {@html post.content}
            </div>

            {#if post.tags?.nodes?.length}
                <div class="mt-8 pt-8 border-t">
                    <h3 class="text-lg font-semibold mb-4">Tags:</h3>
                    <div class="flex flex-wrap gap-2">
                        {#each post.tags.nodes as tag}
                            <span class="px-3 py-1 bg-gray-100 rounded-full text-sm">
                                {tag.name}
                            </span>
                        {/each}
                    </div>
                </div>
            {/if}
        </div>
    </div>
</article>

<style lang="postcss">
    /* Add styles for WordPress content */
    :global(.prose) {
        @apply text-gray-800;
    }

    :global(.prose img) {
        @apply rounded-lg shadow-md my-8;
    }

    :global(.prose figure) {
        @apply my-8;
    }

    :global(.prose figure.wp-block-image) {
        @apply max-w-full;
    }

    :global(.prose figure figcaption) {
        @apply text-center text-sm text-gray-600 mt-2;
    }

    :global(.prose a) {
        @apply text-blue-600 hover:text-blue-800 transition-colors;
    }

    :global(.prose blockquote) {
        @apply border-l-4 border-blue-600 pl-4 italic;
    }
</style>