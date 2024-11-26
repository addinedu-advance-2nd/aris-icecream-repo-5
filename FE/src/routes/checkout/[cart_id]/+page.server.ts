import { getCart } from '$lib/service/cartService';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const cartId = params.cart_id;

    if (!cartId) {
        throw new Error('cart_id가 누락되었습니다.');
    }

    const cartData = await getCart(cartId);

    return { cartData };
};
