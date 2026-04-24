import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
    const res = await fetch(
        `http://cwvps:3000/api/case?where[slug][equals]=${params.slug}&limit=1&depth=1`
    );

    const data = await res.json();
    const post = data?.docs?.[0];

    if (!post) {
        throw error(404, 'Post not found');
    }

    return {
        post
    };
}