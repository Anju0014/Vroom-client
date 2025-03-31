'use client';
import { useState,useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { resetPasswordSchema} from '@/lib/validation';
import { toast } from 'react-hot-toast';
import { AuthService } from '@/services/customer/authService';
import { OwnerAuthService } from '@/services/carOwner/authService';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    setToken(searchParams.get('token'));
    setRole(searchParams.get('role'));
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = resetPasswordSchema.safeParse({newPassword,confirmPassword});
    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => err.message).join(", ");
      toast.error(errorMessages);
      return;
    }
     try{
      if (role === "customer") {
                await AuthService.resetPasswordCustomer({ token,newPassword });
              } else {
                await OwnerAuthService.resetPasswordCarOwner({ token,newPassword});
              }
   
    toast.success("Password reset successful. Please log in.");
      router.push('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reset password.");
    }
  };
  return (
     <div className="flex min-h-screen">
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-red-600 to-orange-500 
          flex-col justify-center items-center p-12 relative">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-6">Vroom</h1>
              <p className="text-xl max-w-md">Reset Your Password to  Log in to  your account.</p>
              <div>
                <Image 
                  src="/images/car-convertible.png"
                  alt="Car Image"
                  width={500}
                  height={300}
                />
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
          <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            
            <h2 className="mt-2 ">Password Reset</h2>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md w-96">
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
      <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
      <button type="submit" className="w-full py-3 text-white font-semibold rounded-xl bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 transition-all flex justify-center items-center"
            >Reset Password</button>
    </form>
    </div>
    </div>
    </div>
    </div>

  );
}
