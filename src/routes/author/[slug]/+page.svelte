<script lang="ts">
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';

    gsap.registerPlugin(ScrollTrigger);

    export let data;
    const { author } = data;

    // Format date function
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    onMount(() => {
        // Animate profile section
        gsap.from('.profile-section', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });

        // Animate posts grid
        gsap.from('.post-card', {
            y: 50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            scrollTrigger: {
                trigger: '.posts-grid',
                start: 'top 80%',
                toggleActions: 'play none none reset'
            }
        });
    });
</script>

<div class="min-h-screen bg-gray-50">
    <!-- Author Profile Section -->
    <div class="profile-section bg-white border-b">
        <div class="container mx-auto px-4 py-12">
            <div class="max-w-4xl mx-auto">
                <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
                    <!-- Author Avatar -->
                    {#if author.avatar?.url}
                        <div class="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg">
                            <img
                                    src={author.avatar.url}
                                    alt={author.name}
                                    class="w-full h-full object-cover"
                            />
                        </div>
                    {/if}

                    <!-- Author Info -->
                    <div class="flex-1 text-center md:text-left">
                        <h1 class="text-3xl md:text-4xl font-bold mb-4">
                            {author.firstName && author.lastName
                                ? `${author.firstName} ${author.lastName}`
                                : author.name}
                        </h1>

                        {#if author.description}
                            <div class="text-gray-600 prose max-w-none mb-6">
                                {@html author.description}
                            </div>
                        {/if}

                        <div class="text-gray-500">
                            <p>{author.posts.nodes.length} Published Posts</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Author's Posts Section -->
    <div class="container mx-auto px-4 py-12">
        <div class="max-w-6xl mx-auto">
            <h2 class="text-2xl font-bold mb-8">Latest Articles</h2>

            <div class="posts-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each author.posts.nodes as post}
                    <article class="post-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        {#if post.featuredImage?.node}
                            <a href="/post/{post.slug}" class="block aspect-video overflow-hidden">
                                <img
                                        src={post.featuredImage.node.sourceUrl}
                                        alt={post.featuredImage.node.altText || post.title}
                                        class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                                />
                            </a>
                        {/if}

                        <div class="p-6">
                            {#if post.categories?.nodes?.length}
                                <div class="mb-3 space-x-2">
                                    {#each post.categories.nodes as category}
                                        <span class="inline-block px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                                            {category.name}
                                        </span>
                                    {/each}
                                </div>
                            {/if}

                            <h3 class="text-xl font-semibold mb-3">
                                <a
                                        href="/post/{post.slug}"
                                        class="hover:text-blue-600 transition-colors"
                                >
                                    {post.title}
                                </a>
                            </h3>

                            <div class="text-gray-600 text-sm mb-4">
                                {formatDate(post.date)}
                            </div>

                            <div class="text-gray-600 mb-4 line-clamp-3">
                                {@html post.excerpt}
                            </div>

                            <a
                                    href="/post/{post.slug}"
                                    class="inline-block text-blue-600 hover:text-blue-800 font-medium transition-colors"
                            >
                                Read More →
                            </a>
                        </div>
                    </article>
                {/each}
            </div>

            {#if author.posts.nodes.length === 0}
                <div class="text-center text-gray-600 py-12">
                    <p>No posts found for this author.</p>
                </div>
            {/if}
        </div>
    </div>
</div>

<style>
    /* Add any additional custom styles here */
    :global(.prose) {
        @apply max-w-none;
    }

    :global(.line-clamp-3) {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>