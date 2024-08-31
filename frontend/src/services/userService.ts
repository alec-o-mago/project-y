'use server'
import apiClient from '../utils/axiosInstance';

export const getUserDetails = async (token: string) => {
    const response = await apiClient.get('/user/me', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const updateUserDetails = async (token: string, data: { visibleName?: string }) => {
    const response = await apiClient.patch('/user/me', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const deleteUserAccount = async (token: string) => {
    const response = await apiClient.delete('/user/me', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
