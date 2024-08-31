'use server'
import apiClient from '../utils/axiosInstance';
import { cookies } from 'next/headers'

interface RegisterPayload {
    visibleName: string;
    username: string;
    password: string;
}

interface LoginPayload {
    username: string;
    password: string;
}

const cookieStore = cookies()

export const registerUser = async (data: RegisterPayload) => {
    const response = await apiClient.post('/auth/register', data)
    cookieStore.set('authToken', response.data.token)
    cookieStore.set('user', JSON.stringify(response.data.user))
    return response.data;
};

export const loginUser = async (data: LoginPayload) => {
    const response = await apiClient.post('/auth/login', data);
    //cookieStore.set()
    cookieStore.set('authToken', response.data.token)
    cookieStore.set('user', JSON.stringify(response.data.user))
    return response.data;
};

export const logoutUser = () => {
    cookieStore.delete('authToken')
    cookieStore.delete('user')
}