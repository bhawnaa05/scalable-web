'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { apiMethods } from '@/lib/api';
import { Task } from '@/types/task';
import { TaskFormData } from '@/lib/validation';
import TaskModal from '@/components/dashboard/TaskModal';
import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
    MagnifyingGlassIcon,
    DocumentTextIcon,
    ClockIcon,
    ArchiveBoxIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';

export default function DashboardPage() {
    const { user } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [search, setSearch] = useState('');

    const fetchTasks = async () => {
        try {
            setIsLoading(true);
            const data = await apiMethods.getTasks({
                search,
            });
            setTasks(data.tasks);
        } catch (error) {
            console.error('Failed to fetch tasks', error);
            toast.error('Failed to load tasks');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [search]);

    const handleCreateTask = () => {
        setSelectedTask(null);
        setIsModalOpen(true);
    };

    const handleEditTask = (task: Task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const handleDeleteTask = async (taskId: string) => {
        if (!confirm('Are you sure you want to delete this task?')) return;

        try {
            await apiMethods.deleteTask(taskId);
            setTasks(tasks.filter(t => t._id !== taskId));
            toast.success('Task deleted');
        } catch (error) {
            console.error('Failed to delete task', error);
            toast.error('Failed to delete task');
        }
    };

    const handleFormSubmit = async (data: TaskFormData) => {
        try {
            setIsSaving(true);
            if (selectedTask) {
                const response = await apiMethods.updateTask(selectedTask._id, data);
                setTasks(tasks.map(t => t._id === selectedTask._id ? response.task : t));
            } else {
                const response = await apiMethods.createTask(data);
                setTasks([response.task, ...tasks]);
            }
            setIsModalOpen(false);
            toast.success(selectedTask ? 'Task updated' : 'Task created');
        } catch (error) {
            console.error(error);
            toast.error('Failed to save task');
        } finally {
            setIsSaving(false);
        }
    };

    const totalTasks = tasks.length;
    const activeTasks = tasks.filter(t => t.status !== 'done').length;

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="glass rounded-xl p-6 border border-white/20 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Welcome back, {user?.name}!
                        </h1>
                        <p className="text-gray-600 mt-2">
                            Here's what's happening with your tasks today.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="glass rounded-xl p-6 border border-white/20 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Tasks</p>
                            <p className="mt-2 text-3xl font-bold text-gray-900">{totalTasks}</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center">
                            <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                <div className="glass rounded-xl p-6 border border-white/20 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Active</p>
                            <p className="mt-2 text-3xl font-bold text-gray-900">{activeTasks}</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center">
                            <ClockIcon className="h-6 w-6 text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="glass rounded-xl p-6 border border-white/20 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Storage</p>
                            <p className="mt-2 text-3xl font-bold text-gray-900">Unlimited</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center">
                            <ArchiveBoxIcon className="h-6 w-6 text-purple-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Create */}
            <div className="glass rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between border border-white/20 shadow-sm">
                <div className="relative flex-1 w-full">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        className="block w-full rounded-lg border border-gray-200 bg-white/50 py-2.5 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 sm:text-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <button
                    type="button"
                    onClick={handleCreateTask}
                    className="inline-flex items-center justify-center rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-500 transition-colors shadow-lg shadow-primary-500/20"
                >
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Create Task
                </button>
            </div>

            {/* Tasks Grid */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-900">All Tasks</h2>
                    <span className="text-sm text-gray-500">{totalTasks} total</span>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {isLoading ? (
                        [...Array(3)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-gray-100 rounded-xl p-6 h-48 border border-gray-200"></div>
                        ))
                    ) : tasks.length === 0 ? (
                        <div className="col-span-full py-12 text-center bg-gray-50 rounded-xl border border-gray-200 border-dashed">
                            <p className="text-gray-500">No tasks found. Create one to get started!</p>
                        </div>
                    ) : (
                        tasks.map((task) => (
                            <div key={task._id} className="glass rounded-xl p-6 group hover:shadow-md transition-all border border-white/20 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 truncate">{task.title}</h3>
                                    {task.status === 'done' && <div className="h-2 w-2 rounded-full bg-green-500"></div>}
                                    {task.status === 'in-progress' && <div className="h-2 w-2 rounded-full bg-yellow-500"></div>}
                                    {task.status === 'todo' && <div className="h-2 w-2 rounded-full bg-gray-300"></div>}
                                </div>
                                <p className="text-sm text-gray-500 mb-6 line-clamp-3">
                                    {task.description || "No description provided."}
                                </p>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <span className="text-xs text-gray-400">
                                        {new Date(task.updatedAt || Date.now()).toLocaleDateString()}
                                    </span>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => handleEditTask(task)}
                                            className="p-1.5 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50"
                                        >
                                            <PencilSquareIcon className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTask(task._id)}
                                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"
                                        >
                                            <TrashIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <TaskModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                onSubmit={handleFormSubmit}
                initialData={selectedTask}
            />
        </div>
    );
}