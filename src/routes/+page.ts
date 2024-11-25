// src/routes/+page.ts
import type { PageLoad } from './$types';
import { fetchGraphQL } from '$lib/graphql/client';

export const load: PageLoad = async () => {
    try {
        const query = `
            query GetPosts {
                posts(first: 10) {
                    nodes {
                        id
                        title
                        date
                        slug
                        excerpt
                        featuredImage {
                            node {
                                sourceUrl
                                altText
                            }
                        }
                    }
                }
            }
        `;

        const data = await fetchGraphQL(query);

        return {
            posts: data.posts.nodes
        };
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        return {
            status: 500,
            error: 'Failed to fetch posts'
        };
    }
};