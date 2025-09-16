
"use client"
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useAuthStoreAdmin } from '@/store/admin/authStore';
import { AdminAuthService } from '@/services/admin/adminService';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import InputField from '@/components/InputField';
import { useHasHydrated } from "@/hooks/useHasHydrated";

export default function AdminLogin() {
  const router=useRouter()
  const hasHydrated = useHasHydrated();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await  AdminAuthService.loginAdmin({email:email,password:password})
      const accessTokenAdmin = response.data.adminAccessToken;
      const user = response.data.user;
      if (user && accessTokenAdmin) {
        useAuthStoreAdmin.getState().setAuthAdmin(user,accessTokenAdmin)
      } 
     
      if (accessTokenAdmin) {
   
        localStorage.setItem("accessTokenAdmin", accessTokenAdmin);
        sessionStorage.setItem("accessTokenAdmin", accessTokenAdmin);
      }
     
      toast.success(`Login successful as Admin`)
      setTimeout(() => router.push('/admin/dashboard'), 1500);
      
    }catch (err){
      toast.error("Invalid Credentials")
    }finally {
      setLoading(false);
    }
  };

  if (!hasHydrated) {
    return <div className="text-gray-500">Loading…</div>;
  }

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
    
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
      
            <InputField
             label="Email Address"
             name="email"
             type="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             placeholder="your.email@example.com"
             className=" focus:ring-blue-500 focus:border-blue-500"
            />
         

            <InputField
              label="Password" 
              name="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              // suppressHydrationWarning
            />
          </div>
          
          {/* <div className="flex items-center justify-between">
           <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              Forgot your password?
            </a>
          </div> */}
          
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
            &copy; {year ?? ""} Vroom. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}