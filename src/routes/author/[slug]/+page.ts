// src/routes/author/[slug]/+page.ts
import type { PageLoad } from './$types';
import { fetchGraphQL } from '$lib/graphql/client';
import { GET_AUTHOR } from '$lib/graphql/queries';

export const load: PageLoad = async ({ params }) => {
    try {
        const data = await fetchGraphQL(GET_AUTHOR, {
            slug: params.slug
        });

        if (!data.user) {
            return {
                status: 404,
                error: new Error('Author not found')
            };
        }

        return {
            author: data.user
        };
    } catch (error) {
        console.error('Failed to fetch author:', error);
        return {
            status: 500,
            error: new Error('Failed to fetch author data')
        };
    }
};