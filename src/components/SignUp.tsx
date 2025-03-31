
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignupData } from "@/types/authTypes";
import InputField from "@/components/InputField";
import { signupSchema } from "@/lib/validation";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { AuthService } from "@/services/customer/authService";
import { OwnerAuthService } from "@/services/carOwner/authService";
import { useAuthStore } from "@/store/customer/authStore";
import { useAuthStoreOwner } from "@/store/carOwner/authStore";

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
  const [isHydrated, setIsHydrated] = useState(false);
  const { data: session } = useSession();
  const { setAuth } = useAuthStore();
  const { setAuthOwner } = useAuthStoreOwner();


  useEffect(() => {
    setIsHydrated(true);
  }, []);


  const setStorageItem = (storage: Storage, key: string, value: string) => {
    if (typeof window !== "undefined") {
      storage.setItem(key, value);
    }
  };

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
      setStorageItem(sessionStorage, "userEmail", response.data.email);
      setStorageItem(sessionStorage, "role", role);
      
 
      setTimeout(() => router.push("/otp"), 2000);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signIn("google", { redirect:false});
    } catch (error) {
      console.error("Google Signup Failed:", error);
      toast.error("Google Signup Failed");
    }
  };

 
  useEffect(() => {
    if (!isHydrated || !session?.user) return;

    const handleGoogleResponse = async () => {
      try {
        const payload = {
          fullName: session.user.name ?? "",
          email: session.user.email ?? "",
          profileImage: session.user.image ?? "",
          provider: "google",
        };

        const response = role === "customer"
          ? await AuthService.googlesigninCustomer(payload)
          : await OwnerAuthService.googlesigninOwner(payload);

        const { accessToken, user } = response.data;
        if (user && accessToken) {
          if (role === "customer") {
            setAuth(user, accessToken);
          } else {
            setAuthOwner(user, accessToken);
          }

        
          setStorageItem(localStorage, "accessToken", accessToken);
          setStorageItem(sessionStorage, "provider", "google");
          setStorageItem(sessionStorage, "userEmail", session.user.email ?? "");
          setStorageItem(sessionStorage, "role", role);

          toast.success("Google Signup Successful!");

       
          const redirectPath = role === "customer" ? "/customer/home" : "/carOwner/home";
          router.push(redirectPath);
        } else {
          throw new Error("User or access token is missing.");
        }
      } catch (error) {
        console.error("Google Signup Failed:", error);
        toast.error("Google Signup Failed");
      }
    };

    handleGoogleResponse();
  }, [session, role, router, setAuth, setAuthOwner, isHydrated]);

  // Custom InputField component with hydration warning suppression
  const SafeInputField = ({ label, name, type, required }: {
    label: string;
    name: string;
    type: string;
    required?: boolean;
  }) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        onChange={handleChange}
        required={required}
        className="w-full p-2 border rounded-md"
        suppressHydrationWarning
      />
    </div>
  );

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
              priority
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
      

      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              Create an account for {role === "customer" ? "Customer" : "Car Owner"}
            </h2>
            <p className="mt-2 text-gray-600">Join Vroom and start your journey today</p>
          </div>
          
        
          {isHydrated && (
            <>
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <InputField 
                  label="Full Name" 
                  name="fullName" 
                  type="text" 
                  onChange={handleChange} 
                  required 
                  suppressHydrationWarning
                />
                <InputField 
                  label="Email" 
                  name="email" 
                  type="email" 
                  onChange={handleChange} 
                  required 
                  suppressHydrationWarning
                />
                <InputField 
                  label="Password" 
                  name="password" 
                  type="password" 
                  onChange={handleChange} 
                  required 
                  suppressHydrationWarning
                />
                <InputField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  onChange={handleChange}
                  required
                  suppressHydrationWarning
                />
                <InputField 
                  label="Phone Number" 
                  name="phoneNumber" 
                  type="text" 
                  onChange={handleChange} 
                  required 
                  suppressHydrationWarning
                />
      
                <button
                  type="submit"
                  className="w-full py-3 text-white font-semibold rounded-xl bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 transition-all flex justify-center items-center"
                  disabled={loading}
                  suppressHydrationWarning
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

              <button
                type="button"
                onClick={handleGoogleSignup}
                className="w-full py-3 text-white font-semibold rounded-xl bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 transition-all"
                suppressHydrationWarning
              >
                Sign up with Google
              </button>
              
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => router.push("/login")}
                    className="text-red-600 hover:text-red-800 font-medium"
                    suppressHydrationWarning
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignupPage;