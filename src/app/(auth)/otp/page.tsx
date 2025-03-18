"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { AuthService } from "@/services/customer/authService";
import { OwnerAuthService } from "@/services/carOwner/authService";
import Image from "next/image";


const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(300);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();
  // const role=sessionStorage.getItem("role")


  useEffect(() => {
    const storedEmail = sessionStorage.getItem("userEmail");
    setRole(sessionStorage.getItem("role"))
    if (!storedEmail) {
      setEmailError(true);
      toast.error("Email not found. Please sign up first.");
      setTimeout(() => router.push("/signup"), 2000);
    } else {
      setEmail(storedEmail);
    }
  }, [router]);


  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setOtp(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits");
      return;
    }

    setLoading(true);
    try {
      let response;
      if (role === "customer") {
                  response = await AuthService.verifyotpCustomer({ email, otp });
          } else {
                  response = await OwnerAuthService.verifyotpCarOwner({ email, otp });
          }
      // const response = await AuthService.verifyotpCustomer({ email, otp });
      console.log(response);
      toast.success("OTP Verified! Redirecting...");
      const redirectPath = role === "customer" ? "/login" : "/owner/login";
       setTimeout(() => router.push(redirectPath), 2000);
      // setTimeout(() => router.push("/login"), 2000); 
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (timeLeft > 0) return;
    
    setResending(true);
    try {
      if (role === "customer") {
        await AuthService.resendotpCustomer({ email });
      } else {
      await OwnerAuthService.resendotpCarOwner({ email });
      }
      
      toast.success("OTP Resent!");
      setTimeLeft(300); 
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  if (emailError) {
    return null;
  }

  return (
    <div>

    
<div className="flex min-h-screen">
    
       <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-red-500 to-orange-400 relative overflow-hidden">
         <div className="absolute inset-0 flex flex-col justify-between p-12">          
          <div>
            <h1 className="text-4xl font-bold text-white">Vroom</h1>
<p className="text-white text-xl mt-2">Your journey starts here</p>
           </div>
              
          <div>
                      <Image 
                        src="/images/car-convertible.png"
                        alt="Car Image"
                        width={500}
                        height={300}
                      />
                    </div>
              
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
             
               <div className="flex justify-center items-center min-h-screen bg-gray-100">
       <div className="bg-white p-6 rounded-xl shadow-md w-96">
         <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Enter OTP</h2>
         <p className="text-sm text-gray-500 text-center mb-4">
           We sent a 6-digit OTP to your email. Expires in:{" "}
           <span className={`font-semibold ${timeLeft < 60 ? "text-red-500" : "text-blue-500"}`}>
             {formatTime(timeLeft)}
          </span>
         </p>

        <form onSubmit={handleSubmit} className="space-y-4">
         <input
            type="text"
            value={otp}
            onChange={handleChange}
            maxLength={6}
            className="w-full px-4 py-2 border rounded-lg text-center text-xl tracking-widest"
            placeholder="123456"
            required
          />
          <button
            type="submit"
            className="w-full py-3 text-white font-semibold rounded-xl bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 transition-all flex justify-center items-center"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Didn't receive OTP?{" "}
          <button
            type="button"
            disabled={timeLeft > 0 || resending}
            onClick={handleResendOTP}
            className={`${
              timeLeft > 0 || resending
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-500 font-semibold hover:underline"
            }`}
          >
            {resending ? "Resending..." : "Resend OTP"}
          </button>
        </p>
      </div>
    </div>
           </div>
          </div>
    </div>

 
    </div>
  );
};

export default OTPVerification;