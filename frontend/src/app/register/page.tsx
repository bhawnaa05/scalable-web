'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { User, Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type FormData = z.infer<typeof formSchema>;

export default function RegisterPage() {
    const [isVisible, setIsVisible] = useState(false);
    const { register: registerAuth, isLoading } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        try {
            await registerAuth(data.name, data.email, data.password);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-gray-50">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary-200/30 rounded-full blur-[100px] animate-float"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-200/30 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="w-full max-w-md relative z-10 perspective-1000 animate-fade-in">
                <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100 transform transition-all duration-300 hover:shadow-2xl">
                    <div className="text-center mb-8">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 mb-6 shadow-lg shadow-primary-500/30 animate-bounce-subtle">
                            <Sparkles className="h-6 w-6 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900">
                            Create Account
                        </h2>
                        <p className="mt-2 text-sm text-gray-500">
                            Join Notionary and get organized
                        </p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        <div className="group">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                                Full Name
                            </label>
                            <div className="relative transform transition-all duration-200 group-hover:scale-[1.01]">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                                </div>
                                <input
                                    {...register('name')}
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200"
                                    placeholder="John Doe"
                                />
                            </div>
                            {errors.name && (
                                <p className="mt-1 text-xs text-red-400 flex items-center animate-slide-up ml-1">
                                    <span className="w-1 h-1 rounded-full bg-red-400 mr-2"></span>
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div className="group">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                                Email address
                            </label>
                            <div className="relative transform transition-all duration-200 group-hover:scale-[1.01]">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                                </div>
                                <input
                                    {...register('email')}
                                    type="email"
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200"
                                    placeholder="you@example.com"
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-xs text-red-400 flex items-center animate-slide-up ml-1">
                                    <span className="w-1 h-1 rounded-full bg-red-400 mr-2"></span>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="group">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                                Password
                            </label>
                            <div className="relative transform transition-all duration-200 group-hover:scale-[1.01]">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                                </div>
                                <input
                                    {...register('password')}
                                    type={isVisible ? 'text' : 'password'}
                                    className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer hover:text-gray-600 transition-colors"
                                    onClick={() => setIsVisible(!isVisible)}
                                >
                                    {isVisible ? (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-xs text-red-400 flex items-center animate-slide-up ml-1">
                                    <span className="w-1 h-1 rounded-full bg-red-400 mr-2"></span>
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div className="group">
                            <label htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                                Confirm Password
                            </label>
                            <div className="relative transform transition-all duration-200 group-hover:scale-[1.01]">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-primary-500 transition-colors" />
                                </div>
                                <input
                                    {...register('confirmPassword')}
                                    type={isVisible ? 'text' : 'password'}
                                    className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200"
                                    placeholder="••••••••"
                                />
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-1 text-xs text-red-400 flex items-center animate-slide-up ml-1">
                                    <span className="w-1 h-1 rounded-full bg-red-400 mr-2"></span>
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-br from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-primary-500/30"
                        >
                            {isLoading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating account...
                                </span>
                            ) : (
                                <span className="flex items-center">
                                    Create Account <ArrowRight className="ml-2 h-5 w-5" />
                                </span>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-500">
                            Already have an account?{' '}
                            <Link href="/login" className="font-semibold text-primary-600 hover:text-primary-500 transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
                <p className="text-center text-xs text-gray-500 mt-8">
                    &copy; 2026 Notionary Inc. All rights reserved.
                </p>
            </div>
        </div>
    );
}
