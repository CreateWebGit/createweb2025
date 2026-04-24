import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
    const res = await fetch(
        `http://cwvps:3000/api/globals/site-pages?depth=5&draft=false&locale=undefined&trash=false`
    );

    const data = await res.json();

    if (!data) {
        throw error(404, 'Post not found');
    }

    return {
        content: data
    };
}