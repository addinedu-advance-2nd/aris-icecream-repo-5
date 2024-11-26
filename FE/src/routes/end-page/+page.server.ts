import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
    const orderId = url.searchParams.get('order_id');
    console.log('Order ID:', orderId);


    return { orderId };
};
