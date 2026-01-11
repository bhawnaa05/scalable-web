import { Task } from '@/types/task';
import { TaskFormData } from '@/lib/validation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
const API_BASE = `${API_URL}/api/tasks`;

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
    };
};

interface GetTasksParams {
    search?: string;
}

interface TasksResponse {
    tasks: Task[];
}

interface SingleTaskResponse {
    task: Task;
}

interface AuthResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

export const apiMethods = {
    getTasks: async (params?: GetTasksParams): Promise<TasksResponse> => {
        const searchParams = new URLSearchParams();
        if (params?.search) {
            searchParams.append('search', params.search);
        }

        const response = await fetch(`${API_BASE}?${searchParams.toString()}`, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        return response.json();
    },

    createTask: async (data: TaskFormData): Promise<SingleTaskResponse> => {
        const response = await fetch(API_BASE, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to create task');
        }
        return response.json();
    },

    updateTask: async (id: string, data: TaskFormData): Promise<SingleTaskResponse> => {
        const response = await fetch(`${API_BASE}/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to update task');
        }
        return response.json();
    },

    deleteTask: async (id: string): Promise<void> => {
        const response = await fetch(`${API_BASE}/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
    },

    login: async (email: string, password: string): Promise<AuthResponse> => {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Login failed');
        }
        return response.json();
    },

    register: async (name: string, email: string, password: string): Promise<AuthResponse> => {
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Registration failed');
        }
        return response.json();
    }
};
