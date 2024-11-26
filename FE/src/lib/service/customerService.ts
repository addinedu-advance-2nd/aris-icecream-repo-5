import api from '../axiosInstance';

export interface CustomerBase {
  name: string;
  phone_last_digits: string;
  created_at: Date;
}

export interface CustomerCreate extends CustomerBase {
  feature_vector: number[];
}

export interface CustomerUpdate extends CustomerBase {
  feature_vector: number[];
}

export interface CustomerResponse extends CustomerBase {
  customer_id: number;
}

const CUSTOMER_URL = '/customer';

// 고객 목록 가져오기 (페이징 지원)
export const getCustomers = async (
  page: number,
  pageSize: number
): Promise<CustomerResponse[]> => {
  const response = await api.get(CUSTOMER_URL, {
    params: { page, pageSize },
  });
  return response.data;
};

// 고객 생성
export const createCustomer = async (data: CustomerCreate): Promise<{ customer_id: number; message: string }> => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('phone_last_digits', data.phone_last_digits);
  formData.append('created_at', data.created_at.toISOString());
  data.feature_vector.forEach((value, index) => {
    formData.append(`feature_vector[${index}]`, value.toString());
  });

  const response = await api.post(CUSTOMER_URL, formData);
  return response.data;
};

// 고객 검색
export const searchCustomer = async (
  featureVector: number[],
  threshold: number = 0.7
): Promise<{ message: string }> => {
  const formData = new FormData();
  featureVector.forEach((value, index) => {
    formData.append(`feature_vector[${index}]`, value.toString());
  });
  formData.append('threshold', threshold.toString());

  const response = await api.post(`${CUSTOMER_URL}/search`, formData);
  return response.data;
};

// 고객 정보 업데이트
export const updateCustomer = async (
  customerId: number,
  data: CustomerUpdate
): Promise<{ message: string }> => {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('phone_last_digits', data.phone_last_digits);
  formData.append('created_at', data.created_at.toISOString());
  data.feature_vector.forEach((value, index) => {
    formData.append(`feature_vector[${index}]`, value.toString());
  });

  const response = await api.put(`${CUSTOMER_URL}/${customerId}`, formData);
  return response.data;
};

// 이미지 전송 및 처리
export const sendImageAndGetResult = async (imageData: Blob): Promise<{ message: string }> => {
  const formData = new FormData();
  formData.append('image', imageData);

  const response = await api.post(`${CUSTOMER_URL}/process-image`, formData);
  return response.data;
};
