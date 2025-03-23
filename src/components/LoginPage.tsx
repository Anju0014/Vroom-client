"use client";

import { useState,useEffect} from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import Link from "next/link";
import { toast } from "react-hot-toast";
import { loginSchema } from "@/lib/validation";
import { AuthService } from "@/services/customer/authService";
import { OwnerAuthService } from "@/services/carOwner/authService";
import { useAuthStore } from "@/store/customer/authStore";
import { useAuthStoreOwner } from "@/store/carOwner/authStore";
import { IUser } from "@/types/authTypes";
import { signIn, useSession } from "next-auth/react";


interface LoginData {
  email: string;
  password: string;
  role: "customer" | "carOwner";
}

interface LoginComponentProps {
  defaultRole?: "customer" | "carOwner";
  onLoginSuccess?: (role: string,token?:string) => void;
}

const LoginComponent = ({ defaultRole = "customer", onLoginSuccess }: LoginComponentProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
    role: defaultRole,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { setAuth } = useAuthStore();
  const { setAuthOwner } = useAuthStoreOwner();
  const {data:session} =useSession();



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role: "customer" | "carOwner") => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = loginSchema.safeParse({ email: formData.email, password: formData.password });
    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => err.message).join(", ");
      setError(errorMessages);
      toast.error(errorMessages);
      return;
    }

    setLoading(true);
    try {
      let response;
      let accessToken;
      let user;
  
      if (formData.role === "customer") {
        response = await AuthService.loginCustomer({
          email: formData.email,
          password: formData.password,
        });

        accessToken = response.data.accessToken;
        user = response.data.user;
        if(user && accessToken){
          setAuth(user,accessToken);
        }else {
          throw new Error("User or access token is missing.");
        }
        
      } else {
        response = await OwnerAuthService.loginCarOwner({
          email: formData.email,
          password: formData.password,
        });
  
        accessToken = response.data.accessToken;
        user = response.data.user;
        if(user && accessToken){
          setAuthOwner(user,accessToken);
        }else {
          throw new Error("User or access token is missing.");
        }
        
      }

      
      if (accessToken) {
        if (rememberMe) {
          localStorage.setItem("accessToken", accessToken);
        } else {
          sessionStorage.setItem("accessToken", accessToken);
        }
      }
      

      if (rememberMe) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", formData.role);
      } else {
        sessionStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("userRole", formData.role);
      }


      toast.success(`Login successful as ${formData.role}!`);
      if (onLoginSuccess) {
        onLoginSuccess(formData.role, accessToken);
      }
      const redirectPath = formData.role === "customer" ? "/customer/home" : "/owner/home";
      setTimeout(() => router.push(redirectPath), 1500);
    } catch (err:any) {
      const errorMessage = err.response?.data?.message || "Login failed. Please check your credentials.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };


  const handleGoogleLogin = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Google Login Failed:", error);
      toast.error("Google Login Failed");
    }
  };

  useEffect(() => {
    const handleGoogleLoginResponse = async () => {
      if (session?.user) {
        try {
          let response;
          let accessToken;
          let user;

          if (formData.role === "customer") {
            response = await AuthService.googlesigninCustomer({
              fullName: session.user.name ?? "",
              email: session.user.email ?? "",
              image: session.user.image ?? "",
              provider: "google",
            });
            accessToken = response.data.accessToken;
            user = response.data.user;
            if (user && accessToken) {
              setAuth(user, accessToken);
            }
          } else {
            response = await OwnerAuthService.googlesigninOwner({
              fullName: session.user.name ?? "",
              email: session.user.email ?? "",
              image: session.user.image ?? "",
              provider: "google",
              role: "carOwner",
            });
            accessToken = response.data.accessToken;
            user = response.data.user;
            if (user && accessToken) {
              setAuthOwner(user, accessToken);
            }
          }

          if (!accessToken) {
            throw new Error("Access token is missing.");
          }

          // Store tokens based on rememberMe
          if (rememberMe) {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userRole", formData.role);
          } else {
            sessionStorage.setItem("accessToken", accessToken);
            sessionStorage.setItem("isLoggedIn", "true");
            sessionStorage.setItem("userRole", formData.role);
          }
          sessionStorage.setItem("provider", "google");
          sessionStorage.setItem("userEmail", session.user.email ?? "");

          toast.success("Google Login Successful!");

          if (formData.role === "customer") {
            router.push("/");
          } else {
            router.push("/carOwner/home");
          }
        } catch (error) {
          console.error("Google Login Failed:", error);
          toast.error("Google Login Failed");
        }
      }
    };

    handleGoogleLoginResponse();
  }, [session, formData.role, router, rememberMe, setAuth, setAuthOwner]);

    // const handleGoogleSignup = async () => {
    //   await signIn("google", { callbackUrl: "/" });

    // };



    //  const handleGoogleSignup = async () => {
    //     try {
    //       await signIn("google", { callbackUrl: "/" });
    //     } catch (error) {
    //       console.error("Google Signup Failed:", error);
    //       toast.error("Google Signup Failed");
    //     }
    //   };
    
    //   useEffect(() => {
    //     const handleGoogleSignUp = async () => {
    //       let  accessToken ;
    //       if (session?.user) {
    //         try {
    //           if (role === "customer") {
    //             const response= await AuthService.googlesigninCustomer({
    //               fullName: session.user.name ?? "",
    //               email: session.user.email ?? "",
    //               image: session.user.image ?? "",
    //               provider: "google",
    //             });
    //             let accessToken = response.data.accessToken;
    //             const user1 = response.data.user;
    //             if(user1 && accessToken){
    //               setAuth(user1,accessToken);
    //               sessionStorage.setItem("provider", "google");
    //             }else {
    //               throw new Error("User or access token is missing.");
    //             }
    //           } else {
    //             const response= await OwnerAuthService.googlesigninOwner({
    //               fullName: session.user.name ?? "",
    //               email: session.user.email ?? "",
    //               image: session.user.image ?? "",
    //               provider: "google",
    //               role: "carOwner",
    //             });
    //             let  accessToken = response.data.accessToken;
    //             const user1 = response.data.user;
    //             if(user1 && accessToken){
    //               setAuthOwner(user1,accessToken);
    //               sessionStorage.setItem("provider", "google");
    //             }else {
    //               throw new Error("User or access token is missing.");
    //             }
    //           }
              
    //           if (accessToken) {
    //               localStorage.setItem("accessToken", accessToken);
    //           }
    //           toast.success("Google Signup Successful!");
    
    //           sessionStorage.setItem("userEmail", session.user.email ?? "");
    //           sessionStorage.setItem("role", role);
    //           if (role === "customer") {
    //             router.push("/");
    //           } else {
    //             router.push("/carOwner/home");
    //           }
    //         } catch (error) {
    //           console.error("Google Signup Failed:", error);
    //           toast.error("Google Signup Failed");
    //         }
    //       }
    //     };
      
    //     handleGoogleSignUp();
    //   }, [session, role, router]);
      

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-red-600 to-orange-500 flex-col justify-center items-center p-12 relative">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-6">Vroom</h1>
          <p className="text-xl max-w-md">Welcome back! Log in to access your account and manage your car {formData.role === "customer" ? "rentals" : "listings"}.</p>
          <div>
            <Image 
              src="/images/car-convertible.png"
              alt="Car Image"
              width={500}
              height={300}
            />
          </div>
        </div>
        
        <div className="absolute bottom-8 text-white opacity-80">
          <p className="font-medium">"The journey of a thousand miles begins with a single login."</p>
        </div>
      </div>
      

      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p className="mt-2 text-gray-600">Please sign in to your account</p>
          </div>


          {/* <div className="flex rounded-lg overflow-hidden border border-gray-200">
            <button
              onClick={() => handleRoleChange("customer")}
              className={`flex-1 py-3 text-center font-medium ${
                formData.role === "customer"
                  ? "bg-gradient-to-r from-red-600 to-orange-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Customer
            </button>
            <button
              onClick={() => handleRoleChange("carOwner")}
              className={`flex-1 py-3 text-center font-medium ${
                formData.role === "carOwner"
                  ? "bg-gradient-to-r from-red-600 to-orange-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Car Owner
            </button>
          </div> */}
          

          <div className="mt-4 mb-2">
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
              <label className="text-sm font-medium text-red-600 mx-2 ">Login as :  </label>
                <input
                  id="customer-role"
                  name="role-selection"
                  type="radio"
                  checked={formData.role === "customer"}
                  onChange={() => handleRoleChange("customer")}
                  className="h-4 w-4 accent-red-500 focus:ring-red-500 border-gray-300"
                />
                <label htmlFor="customer-role" className="ml-2 block text-sm text-gray-700">
                  Customer
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="carOwner-role"
                  name="role-selection"
                  type="radio"
                  checked={formData.role === "carOwner"}
                  onChange={() => handleRoleChange("carOwner")}
                  className="h-4 w-4 accent-red-600 focus:ring-red-500 border-gray-300"
                />
                <label htmlFor="carOwner-role" className="ml-2 block text-sm text-gray-700">
                  Car Owner
                </label>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link href="/forgotpassword/emailStore" onClick={() => sessionStorage.setItem("userRole", formData.role)} className="text-sm text-red-600 hover:text-red-800">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 transition-all flex justify-center items-center"
              disabled={loading}
            >
              {loading ? `Signing In as ${formData.role}...` : `Sign In as ${formData.role}`}
            </button>
          </form>
          <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 transition-all flex justify-center items-center"
            >
             Login through Google
            </button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href={formData.role === "customer" ? "/signup" : "/carOwner/signup"} className="text-red-600 hover:text-red-800 font-medium">
                Sign Up as {formData.role === "customer" ? "Customer" : "Car Owner"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;