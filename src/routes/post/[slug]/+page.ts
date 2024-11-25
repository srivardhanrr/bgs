import type { PageLoad } from './$types';
import { fetchGraphQL } from '$lib/graphql/client';
import { GET_POST_BY_SLUG } from '$lib/graphql/queries';

export const load: PageLoad = async ({ params }) => {
    try {
        const data = await fetchGraphQL(GET_POST_BY_SLUG, {
            slug: params.slug
        });

        if (!data.post) {
            return {
                status: 404,
                error: new Error('Post not found')
            };
        }

        return {
            post: data.post
        };
    } catch (error) {
        console.error('Failed to fetch post:', error);
        return {
            status: 500,
            error: new Error('Failed to fetch post')
        };
    }
};