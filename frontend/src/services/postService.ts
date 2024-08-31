'use server'
import apiClient from '../utils/axiosInstance';

interface PostPayload {
    content: string;
}

export const createPost = async (token: string, data: PostPayload) => {
    console.log("createPost(). token:\n",token)
    const response = await apiClient.post('/posts', data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log(response.data)
    return response.data;
};

export const updatePost = async (token: string, postId: number, data: PostPayload) => {
    const response = await apiClient.patch(`/posts/${postId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const deletePost = async (token: string, postId: number) => {
    const response = await apiClient.delete(`/posts/${postId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getLast100Posts = async (token: string) => {
    const response = await apiClient.get('/posts/recent', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
