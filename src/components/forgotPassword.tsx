
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { AuthService } from "@/services/customer/authService";
import { OwnerAuthService } from "@/services/carOwner/authService";
import { emailSchema } from '@/lib/validation';
import Image from 'next/image';


const ForgotPassword = () => {

  const router = useRouter();
      const [email, setEmail] = useState('');
      const [role, setRole] = useState<"customer" | "carOwner" | null>(null);
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!role) {
          toast.error("Role not found. Please log in again.");
          router.push('/login');
          return;
        }
    
        const result = emailSchema.safeParse(email);
        if (!result.success) {
          toast.error("Invalid email format");
          return;
        }
    
        try {
          if (role === "customer") {
            await AuthService.forgotPasswordCustomer({ email });
          } else {
            await OwnerAuthService.forgotPasswordCarOwner({ email });
          }
          toast.success('Reset link sent! Check your inbox.');

        } catch (err: any) {
          const errorMessage = err.response?.data?.message || "Failed to send reset link.";
          toast.error(errorMessage);
        } finally{
          router.push('/login')
        }
      };
    
    
      useEffect(() => {
        if (typeof window !== "undefined") {
          const storedRole = sessionStorage.getItem("userRole") as "customer" | "carOwner" | null;
          if (storedRole) {
            setRole(storedRole);
          } else {
            toast.error("Role not found. Please log in again.");
          }
        }
      }, []);
  return (
    <div>
<div className="flex min-h-screen">
    
       <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-red-600 to-orange-500 relative overflow-hidden">
         <div className="absolute inset-0 flex flex-col justify-between p-12">          <div>
            <h1 className="text-4xl font-bold text-white">Vroom</h1>
<p className="text-white text-xl mt-2">Your journey starts here</p>
           </div>
              
          {/* <div className="relative w-full h-64 mb-8"> */}
                <div>
                      <Image 
                        src="/images/car-convertible.png"
                        alt="Car Image"
                        width={500}
                        height={300}
                      />
                    </div>
          
              {/* </div> */}
              
              <div className="text-white opacity-80">
                <p className="text-lg font-semibold mb-2">Why choose Vroom?</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Fast & convenient car rentals</li>
                  <li>Wide selection of premium vehicles</li>
                  <li>24/7 customer support</li>
                  <li>No hidden fees, transparent pricing</li>
                </ul>
              </div>
            </div>
          </div>
          
        
          <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
            <div className="max-w-md w-full space-y-8">
             
               <div className="flex justify-center items-center min-h-screen ">
       <div className="bg-white p-6 rounded-xl shadow-md w-96">
         <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Enter Your OTP</h2>
         <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <button type="submit" className="w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 transition-all flex justify-center items-center">Send Reset Link</button>
    </form>

        
      </div>
    </div>
           </div>
          </div>
    </div>

 
    </div>
  );
}

export default ForgotPassword;