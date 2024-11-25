<script lang="ts">
    import { page } from '$app/stores';
</script>

<div class="container mx-auto px-4 py-16 text-center">
    <h1 class="text-4xl font-bold mb-4">
        {$page.status === 404 ? 'Post Not Found' : 'Something went wrong'}
    </h1>
    <p class="mb-8 text-gray-600">
        {$page.error?.message || 'An error occurred while loading the post'}
    </p>
    <a
            href="/"
            class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
    >
        Return Home
    </a>
</div>