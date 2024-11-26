import { getIceCreams } from '$lib/service/iceCreamService';
import { getToppings } from '$lib/service/toppingService';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
    const page = Number(url.searchParams.get('page') || 1);
    const pageSize = Number(url.searchParams.get('pageSize') || 10);

    const iceCreamData = await getIceCreams(page, pageSize);
    const toppingData = await getToppings(page, pageSize);

    return {
        iceCreamData,
        toppingData
    };
};
