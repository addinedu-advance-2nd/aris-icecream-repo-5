import api from '../axiosInstance';

export interface Topping {
  topping_id: number;
  name: string;
  extra_price: number;
  image?: string;
}

const TOPPING_URL = '/topping'

export const getToppings = async (
  page: number,
  pageSize: number
): Promise<Topping[]> => {
  const response = await api.get(TOPPING_URL, {
    params: { page, pageSize },
  });
  return response.data;
};