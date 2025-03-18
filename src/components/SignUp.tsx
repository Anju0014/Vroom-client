

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignupData } from "@/types/authTypes";

import InputField from "@/components/InputField";
import { signupSchema } from "@/lib/validation";
import { toast } from "react-hot-toast";
import Image from "next/image";


import {AuthService} from "@/services/customer/authService";
import {OwnerAuthService} from "@/services/carOwner/authService";


interface SignUpRoleProps {
  role: "customer" | "carOwner";
}

const SignupPage: React.FC<SignUpRoleProps> = ({ role }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<SignupData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    
    const result = signupSchema.safeParse(formData);
    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => err.message).join(", ");
      toast.error(errorMessages);
      setLoading(false);
      return;
    }

    
    try {
        
        let response;
        if (role === "customer") {
            response = await AuthService.registerCustomer(formData);
          } else {
            response = await OwnerAuthService.registerCarOwner(formData);
          }
    
      toast.success("Signup Successful!");

  
      sessionStorage.setItem("userEmail", response.data.email);
      sessionStorage.setItem("role",role);

      
      const redirectPath = role === "customer" ? "/otp" : "/owner/otp";
      setTimeout(() => router.push(redirectPath), 2000);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
          <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-red-600 to-orange-500 flex-col justify-center items-center p-12 relative">
                  <div className="text-center text-white">
                    <h1 className="text-5xl font-bold mb-6">Vroom</h1>
                    <p className="text-xl max-w-md">Your journey starts here</p>
                    <div>
                      <Image 
                        src="/images/car-convertible.png"
                        alt="Car Image"
                        width={500}
                        height={300}
                      />
                    </div>
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
          
    //       {/* Right side - Form */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
            <div className="max-w-md w-full space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800">Create an account for  {role === "customer" ? "Customer" : "Car Owner"}</h2>
                <p className="mt-2 text-gray-600">Join Vroom and start your journey today</p>
              </div>
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <InputField label="Full Name" name="fullName" type="text" onChange={handleChange} required />
                <InputField label="Email" name="email" type="email" onChange={handleChange} required />
                <InputField label="Password" name="password" type="password" onChange={handleChange} required />
                <InputField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  onChange={handleChange}
                  required
                />
                <InputField label="Phone Number" name="phoneNumber" type="text" onChange={handleChange} required />
    
                <button
                  type="submit"
                  className="w-full py-3 text-white font-semibold rounded-xl bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 transition-all flex justify-center items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing Up...
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </form>
              
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
    //                 onClick={() => router.push("/login")}
    // onClick={() => router.push(role === "customer" ? "/customer/login" : "/owner/login")}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
  );
};

export default SignupPage;
