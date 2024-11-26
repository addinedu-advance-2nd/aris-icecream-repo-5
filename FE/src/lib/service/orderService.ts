import api from '../axiosInstance';

export interface Order {
  order_datetime: string;
  customer_id: number;
  cart_id: number;
  total_price: number;
  status: string;
}

export interface OrderResponse extends Order {
  order_id: number;
}

export interface OrderRequest extends Order {}

// 주문 URL
const ORDER_URL = '/order';

export const getOrders = async (
  page: number,
  pageSize: number
): Promise<OrderResponse[]> => {
  const response = await api.get<OrderResponse[]>(ORDER_URL, {
    params: { page, pageSize },
  });
  return response.data;
};

export const createOrder = async (data: OrderRequest): Promise<number> => {
    try {
        const response = await api.post<OrderResponse>(ORDER_URL, data);
        if (response.data && response.data.order_id !== undefined) {
            return response.data.order_id; 
        } else {
            throw new Error("order_id가 응답에 포함되어 있지 않습니다."); 
        }
    } catch (error) {
        console.error('주문 생성 중 오류:', error);
        throw error; 
    }
};
