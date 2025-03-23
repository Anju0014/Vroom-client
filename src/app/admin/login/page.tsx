
"use client"
import { useState } from 'react';
import Head from 'next/head';
import { AdminAuthService } from '@/services/admin/adminService';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router=useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
  
      const response = await  AdminAuthService.loginAdmin({email:email,
        password:password})
      const accessToken = response.data.accessToken;

      if (accessToken) {
        if (rememberMe) {
          localStorage.setItem("accessToken", accessToken);
        } else {
          sessionStorage.setItem("accessToken", accessToken);
        }
      }

      
      if (rememberMe) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "admin");
      } else {
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("userRole", "admin");
      }
       toast.success(`Login successful as Admin`)
      
       setTimeout(() => router.push('/admin/dashboard'), 1500);
      
    } catch (err:unknown) {
        if(err instanceof Error){
      setError(err.message || 'An error occurred during login');}
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-blue-300">
      <Head>
        <title>Admin Login | Vroom</title>
        <meta name="description" content="Admin login portal for Vroom" />
      </Head>
      
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Vroom Admin</h1>
          <p className="mt-2 text-sm text-gray-600">Please sign in to your admin account</p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            
            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              Forgot your password?
            </a>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
        
        <div className="mt-6">
          <p className="text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Vroom. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}