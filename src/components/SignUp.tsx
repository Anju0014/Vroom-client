
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { AuthService } from "@/services/customer/authService";
import { OwnerAuthService } from "@/services/carOwner/authService";
import { useAuthStore } from "@/store/customer/authStore";
import { useAuthStoreOwner } from "@/store/carOwner/authStore";
import RegistrationForm from "@/components/RegistrationForm";

interface SignUpRoleProps {
  role: "customer" | "carOwner";
}


const SignupPage: React.FC<SignUpRoleProps> = ({ role }) => {
  const router = useRouter();
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

  const handleRegistrationSuccess = () => {
    setTimeout(() => router.push("/otp"), 2000);
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
  
        const response =
          role === "customer"
            ? await AuthService.googlesigninCustomer(payload)
            : await OwnerAuthService.googlesigninOwner(payload);
  
        let accessToken, user, accessTokenOwner;
  
      
        if (role === "customer") {
          ({ accessToken, user } = response.data);
        } else {
          ({ accessTokenOwner, user } = response.data);
        }
  
        // Check if the user exists and if either token is available
        if (user) {
          if (role === "customer" && accessToken) {
            setAuth(user, accessToken);
            setStorageItem(localStorage, "accessToken", accessToken);
          } else if (accessTokenOwner) {
            setAuthOwner(user, accessTokenOwner);
            setStorageItem(localStorage, "accessTokenOwner", accessTokenOwner);
          } else {
            throw new Error("No valid access token found.");
          }
  
          // Store session-related data in sessionStorage
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
              <RegistrationForm 
                role={role}
                onSuccess={handleRegistrationSuccess}
              />
              
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