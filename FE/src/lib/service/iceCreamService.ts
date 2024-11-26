import api from '../axiosInstance';

export interface IceCream {
  ice_cream_id: number;
  name: string;
  flavor: string;
  price: number;
  image?: string;
}

export interface PaginatedIceCreamResponse {
  items: IceCream[];
}

export interface IceCreamFormData {
  name: string;
  flavor: string;
  price: number;
  image: File;
}

const ICE_CREAM_URL = '/ice_cream'

export const getIceCreams = async (
  page: number,
  pageSize: number
): Promise<PaginatedIceCreamResponse> => {
  const response = await api.get(ICE_CREAM_URL, {
    params: { page, pageSize },
  });
  return response.data;
};

export const createIceCream = async (data: IceCreamFormData): Promise<IceCream> => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('flavor', data.flavor);
  formData.append('price', data.price.toString());
  formData.append('image', data.image);

  const response = await api.post(ICE_CREAM_URL, formData);
  return response.data;
};
