import { WORDPRESS_API_URL } from '$lib/config/wordpress';

export async function fetchGraphQL(query: string, variables = {}) {
    try {
        const response = await fetch(WORDPRESS_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        });

        const json = await response.json();

        if (json.errors) {
            console.error('GraphQL Errors:', json.errors);
            throw new Error('GraphQL Error');
        }

        return json.data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}