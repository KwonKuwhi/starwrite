import { baseApi } from '../../../shared/api/BaseApi';

// 카테고리 리스트 axios
export const getCategoriesApi = async (nickname: string) => {
  try {
    const response = await baseApi.get(`/category/getCategoryById/${nickname}`);
    console.log('getCategoriesApi', response.data);
    return response.data;
  } catch (error) {
    console.error('getCategories Error', error);
    throw error;
  }
};

// 카테고리 추가 axios post
export const newCategoryApi = async (name: string) => {
  try {
    const response = await baseApi.post('/category', name);
    console.log('newCategoryApi', response.data);
    return response.data;
  } catch (error) {
    console.error('newCategoryApi Error', error);
    throw error;
  }
};

// 카테고리 이름 수정 axios
export const patchCategoryApi = async (id: string) => {
  try {
    const response = await baseApi.put('/category', id);
    console.log('patchCategoryApi', response.data);
    return response.data;
  } catch (error) {
    console.error('patchCategoryApiError', error);
    throw error;
  }
};

// 카테고리 삭제 axios
export const deleteCategoryApi = async (id: string) => {
  try {
    const response = await baseApi.delete(`/category/${id}`);
    console.log('deleteCategoryApi', response.data);
    return response.data;
  } catch (error) {
    console.error('deleteCategoryError', error);
    throw error;
  }
};
