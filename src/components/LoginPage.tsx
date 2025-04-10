
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { loginSchema } from "@/lib/validation";
import { AuthService } from "@/services/customer/authService";
import { OwnerAuthService } from "@/services/carOwner/authService";
import { useAuthStore } from "@/store/customer/authStore";
import { useAuthStoreOwner } from "@/store/carOwner/authStore";
import { signIn, useSession } from "next-auth/react";
import { LoginData } from "@/types/authTypes";


interface LoginComponentProps {
  defaultRole?: "customer" | "carOwner";
  // onLoginSuccess?: (role: string, token?: string) => void;
}
const LoginComponent = ({ defaultRole = "customer" }: LoginComponentProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
    role: defaultRole,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { data: session, status } = useSession();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role: "customer" | "carOwner") => {
    setFormData({ ...formData, role });
  };

  const storeSessionData = (role: string, accessToken: string) => {
    sessionStorage.setItem("accessToken", accessToken);
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("userRole", role);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = loginSchema.safeParse({
      email: formData.email,
      password: formData.password,
    });
    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => err.message).join(", ");
      setError(errorMessages);
      toast.error(errorMessages);
      return;
    }

    setLoading(true);
    try {
      let response;
      let accessToken, user;

      if (formData.role === "customer") {
        response = await AuthService.loginCustomer({
          email: formData.email,
          password: formData.password,
        });
        accessToken = response.data.customerAccessToken;
        user = response.data.user;
      } else {
        response = await OwnerAuthService.loginCarOwner({
          email: formData.email,
          password: formData.password,
        });
        accessToken = response.data.ownerAccessToken;
        user = response.data.user;
      }

      if (user && accessToken) {
        // Save the user data and token
        if (formData.role === "customer") {
          useAuthStore.getState().setAuth(user, accessToken);
        } else {
          useAuthStoreOwner.getState().setAuthOwner(user, accessToken);
        }

        storeSessionData(formData.role, accessToken);

        toast.success(`Login successful as ${formData.role}!`);
        const redirectPath = formData.role === "customer" ? "/customer/home" : "/carOwner/home";
        setTimeout(() => router.push(redirectPath), 1500);
      } else {
        throw new Error("User or access token is missing.");
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Login failed. Please check your credentials.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
        sessionStorage.setItem("googleLoginRole", formData.role);
        try {
          await signIn("google", {
            // callbackUrl: formData.role === "customer" ? "/customer/home" : "/carOwner/home",
            redirect: false,
          });
        } catch (error) {
          console.error("Google Login Failed:", error);
          toast.error("Google Login Failed");
        }
      };
  const handleGoogleSignIn = async () => {
    if (status !== "authenticated" || !session?.user) return;

    const storedRole = sessionStorage.getItem("googleLoginRole") || "customer";
    setLoading(true);

    try {
      let response;
      let accessToken, user;

      if (storedRole === "customer") {
        response = await AuthService.googlesigninCustomer({
          fullName: session.user.name ?? "",
          email: session.user.email ?? "",
          profileImage: session.user.image ?? "",
          provider: "google",
          role: "customer",
        });
        accessToken = response.data.customerAccessToken;
        user = response.data.user;
      } else {
        response = await OwnerAuthService.googlesigninOwner({
          fullName: session.user.name ?? "",
          email: session.user.email ?? "",
          profileImage: session.user.image ?? "",
          provider: "google",
          role: "carOwner",
        });
        accessToken = response.data.ownerAccessToken;
        user = response.data.user;
      }

      if (user && accessToken) {
        if (storedRole === "customer") {
          useAuthStore.getState().setAuth(user, accessToken);
        } else {
          useAuthStoreOwner.getState().setAuthOwner(user, accessToken);
        }

        storeSessionData(storedRole, accessToken);
        sessionStorage.setItem("provider", "google");
        sessionStorage.setItem("userEmail", session.user.email ?? "");

        toast.success("Google Login Successful!");
        router.push(storedRole === "customer" ? "/customer/home" : "/carOwner/home");
        sessionStorage.removeItem("googleLoginRole");
      } else {
        throw new Error("User or access token is missing.");
      }
    } catch (error: any) {
      console.error("Google Login Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Google login failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      handleGoogleSignIn();
    }
  }, [status, session]);


// const LoginComponent = ({ defaultRole = "customer" }: LoginComponentProps) => {
//   const router = useRouter();
//   const [formData, setFormData] = useState<LoginData>({
//     email: "",
//     password: "",
//     role: defaultRole,
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   // const [rememberMe, setRememberMe] = useState(false);
//   const { data: session, status } = useSession();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleRoleChange = (role: "customer" | "carOwner") => {
//     setFormData({ ...formData, role });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     const result = loginSchema.safeParse({ email: formData.email, password: formData.password });
//     if (!result.success) {
//       const errorMessages = result.error.errors.map((err) => err.message).join(", ");
//       setError(errorMessages);
//       toast.error(errorMessages);
//       return;
//     }

//     setLoading(true);
//     try {
//       let response;
   

//       if (formData.role === "customer") {
//         response = await AuthService.loginCustomer({
//           email: formData.email,
//           password: formData.password,
//         });
//         let accessToken = response.data.customerAccessToken;
//        let  user = response.data.user;
//         if (user && accessToken) {
//           useAuthStore.getState().setAuth(user, accessToken);
//           sessionStorage.setItem("accessToken", accessToken);
//         } else {
//           throw new Error("User or access token is missing.");
//         }
//       } else {
//         response = await OwnerAuthService.loginCarOwner({
//           email: formData.email,
//           password: formData.password,
//         });
//         let accessTokenOwner = response.data.ownerAccessToken;
//         let user = response.data.user;
//         if (user && accessTokenOwner) {
//           useAuthStoreOwner.getState().setAuthOwner(user, accessTokenOwner);
//           sessionStorage.setItem("accessToken", accessTokenOwner);
//         } else {
//           throw new Error("User or access token is missing.");
//         }
//       }

//       // if (accessToken) {
//       //   if (rememberMe) {
//       //     localStorage.setItem("accessToken", accessToken);
//       //   } else {
//       //     sessionStorage.setItem("accessToken", accessToken);
//       //   }
//       // }

//       // if (rememberMe) {
//       //   localStorage.setItem("isLoggedIn", "true");
//       //   localStorage.setItem("userRole", formData.role);
//       // } else {
//         sessionStorage.setItem("isLoggedIn", "true");
//         sessionStorage.setItem("userRole", formData.role);
//       // }

//       toast.success(`Login successful as ${formData.role}!`);
//       // if (onLoginSuccess) {
//       //   onLoginSuccess(formData.role, accessToken);
//       // }
//       const redirectPath = formData.role === "customer" ? "/customer/home" : "/carOwner/home";
//       setTimeout(() => router.push(redirectPath), 1500);
//     } catch (err: any) {
//       const errorMessage = err.response?.data?.message || "Login failed. Please check your credentials.";
//       setError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     sessionStorage.setItem("googleLoginRole", formData.role);
//     try {
//       await signIn("google", {
//         // callbackUrl: formData.role === "customer" ? "/customer/home" : "/carOwner/home",
//         redirect: false,
//       });
//     } catch (error) {
//       console.error("Google Login Failed:", error);
//       toast.error("Google Login Failed");
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     if (status !== "authenticated" || !session?.user) return;

//     const storedRole = sessionStorage.getItem("googleLoginRole") || "customer";
//     setLoading(true);

//     try {
//       let response;
//       // let accessToken;
//       // let user;

//       if (storedRole === "customer") {
//         response = await AuthService.googlesigninCustomer({
//           fullName: session.user.name ?? "",
//           email: session.user.email ?? "",
//           profileImage: session.user.image ?? "",
//           provider: "google",
//           role: "customer",
//         });


//         let accessToken = response.data.customerAccessToken;
//         let  user = response.data.user;
//          if (user && accessToken) {
//            useAuthStore.getState().setAuth(user, accessToken);
//            sessionStorage.setItem("accessToken", accessToken);
//          } else {
//            throw new Error("User or access token is missing.");
//          }

//       } else {
//         response = await OwnerAuthService.googlesigninOwner({
//           fullName: session.user.name ?? "",
//           email: session.user.email ?? "",
//           profileImage: session.user.image ?? "",
//           provider: "google",
//           role: "carOwner",
//         });

//         let accessTokenOwner = response.data.ownerAccessToken;
//         let user = response.data.user;
//         if (user && accessTokenOwner) {
//           useAuthStoreOwner.getState().setAuthOwner(user, accessTokenOwner);
//           sessionStorage.setItem("accessToken", accessTokenOwner);
//         } else {
//           throw new Error("User or access token is missing.");
//         }
//       }
//       // let accessToken = response?.data?.accessToken;
//       // let user = response?.data?.user;
//       // if (!accessToken || !user) {
//       //   throw new Error("User or access token is missing.");
//       // }

//       // if (storedRole === "customer") {
//       //   useAuthStore.getState().setAuth(user, accessToken);
//       // } else {
//       //   useAuthStoreOwner.getState().setAuthOwner(user, accessToken);
//       // }
//       // if (rememberMe) {
//       //   localStorage.setItem("accessToken", accessToken);
//       //   localStorage.setItem("isLoggedIn", "true");
//       //   localStorage.setItem("userRole", storedRole);
//       // } else {
//       //   sessionStorage.setItem("accessToken", accessToken);
//         sessionStorage.setItem("isLoggedIn", "true");
//         sessionStorage.setItem("userRole", storedRole);
//       // }

//       sessionStorage.setItem("provider", "google");
//       sessionStorage.setItem("userEmail", session.user.email ?? "");

//       toast.success("Google Login Successful!");
//       router.push(storedRole === "customer" ? "/customer/home" : "/carOwner/home");
//       sessionStorage.removeItem("googleLoginRole");
//     } catch (error: any) {
//       console.error("Google Login Error:", error.response?.data || error.message);
//       toast.error(error.response?.data?.message || "Google login failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (status === "authenticated" && session?.user) {
//       handleGoogleSignIn();
//     }
//   }, [status, session]);

  return (
    <div className="flex min-h-screen">
      <div className=" hidden md:flex md:w-1/2 bg-gradient-to-br from-red-600 to-orange-500 flex-col justify-center items-center p-12 relative">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-6">Vroom</h1>
          <p className="text-xl max-w-md">
            Welcome back! Log in to access your account and manage your car{" "}
            {formData.role === "customer" ? "rentals" : "listings"}.
          </p>
          <div>
            <Image src="/images/car-convertible.png" alt="Car Image" width={500} height={300} priority layout="responsive" />
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

          <div className="mt-4 mb-2">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <label className="text-sm font-medium text-red-600 mx-2">Login as: </label>
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
                <Link
                  href="/forgotpassword/emailStore"
                  onClick={() => sessionStorage.setItem("userRole", formData.role)}
                  className="text-sm text-red-600 hover:text-red-800"
                >
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

            {/* <div className="flex items-center">
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
            </div> */}

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
            disabled={loading}
          >
            {loading ? "Processing..." : "Login through Google"}
          </button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href={formData.role === "customer" ? "/signup" : "/carOwner/signup"}
                className="text-red-600 hover:text-red-800 font-medium"
              >
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



























































