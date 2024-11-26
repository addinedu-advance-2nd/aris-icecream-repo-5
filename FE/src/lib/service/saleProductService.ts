import api from '../axiosInstance';

export interface SaleProductResponse {
  sale_product_id: number;
  ice_cream_id: number;
  topping_id_json: number;
  product_price: number;
}

export interface ISaleProduct {
  ice_cream_id: number;
  topping_id_json: number[];
  product_price: number;
  sale_product_id: number;
  ice_cream_name: string;
  topping_data: ITopping[]
}

interface ITopping {
  name: string;
  extra_price: number;
}

export interface SaleProductRequest {
  ice_cream_id: number;
  topping_id_json: number;
  product_price: number;
}

const SALE_PRODUCT_URL = '/sale_product';

export const createSaleProduct = async (saleProductRequest: SaleProductRequest): Promise<SaleProductResponse> => {
  try {
      const response = await api.post<SaleProductResponse>(SALE_PRODUCT_URL, saleProductRequest);
          return response.data;
  } catch (error) {
      console.error('판매상품 생성 중 오류:', error);
      throw error; 
  }
};