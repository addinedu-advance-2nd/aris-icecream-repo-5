import api from '../axiosInstance';
import type { ISaleProduct } from './saleProductService';

export interface Cart {
  cart_id: number;
  customer_id: number;
  sale_product_id_json: number[];
}

export interface CartResponse {
  customer_id: number;
  cart_id: number;
  sale_products: ISaleProduct[]
}

export interface CartRequest {
  customer_id: number;
  sale_product_id_json: number[];
}

const CART_URL = '/cart';

export const getCarts = async (
  page: number,
  pageSize: number
): Promise<CartResponse[]> => {
  const response = await api.get<CartResponse[]>(CART_URL, {
    params: { page, pageSize },
  });
  return response.data;
};

export const getCart = async (cartId: string): Promise<CartResponse> => {
  const response = await api.get<CartResponse>(`${CART_URL}/${cartId}`);
  return response.data;
};

export const createCart = async (data: CartRequest): Promise<number> => {
  try {
      const response = await api.post<CartResponse>(CART_URL, data);
      if (response.data && response.data.cart_id !== undefined) {
          return response.data.cart_id; 
      } else {
          throw new Error("cart_id 응답에 포함되어 있지 않습니다."); 
      }
  } catch (error) {
      console.error('주문 생성 중 오류:', error);
      throw error; 
  }
};

export const deleteCart = async (cartId: number): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>(`${CART_URL}/${cartId}`);
  return response.data;
};