


import SignUp from "@/components/SignUp";

const SignUpPage = () => {
 return <SignUp role='customer'/>
};

export default SignUpPage;



// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { SignupData } from "@/types/authTypes";
// import { AuthService } from "@/services/authService/authService";
// import InputField from "@/components/InputField";
// import Button from "@/components/Button"
// import { validateSignup } from "@/lib/validation";
// import {toast} from "react-hot-toast"
// import { showSuccessToast, showErrorToast, closeToast } from "@/utils/toast";

// const SignupPage = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState<SignupData>({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phoneNumber: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('')
    

//     const validationErrors = validateSignup(formData);
//     if (Object.keys(validationErrors).length > 0) {
//       const errorMessage = Object.values(validationErrors).join(", ");
//       setError(errorMessage)
//     toast.error(errorMessage);
//     setLoading(false);
//     return;
//   }

//     try {
//      const response= await AuthService.register(formData);
     
//       showSuccessToast("Signup Successful!");
//       sessionStorage.setItem("customerEmail", response.data.email);
//       setTimeout(() => router.push("/otp"), 2000);
//     } catch (err: any) {
//       showErrorToast(err.response?.data?.message || "Signup failed");
//       setError(err.response?.data?.message)
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (


// <div className="flex items-center justify-center min-h-screen w-full bg-cover bg-center" 
//      style={{ backgroundImage: "url('images/desert-background.png')" }}>
//   <div className="bg-white/0 backdrop-blur-lg  p-8 rounded-2xl shadow-lg w-96">
//     <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Vroom</h2>

//     {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//     <form onSubmit={handleSubmit} className="space-y-4">
//       <InputField label="Full Name" name="fullName" type="text" onChange={handleChange} required />
//       <InputField label="Email" name="email" type="email" onChange={handleChange} required />
//       <InputField label="Password" name="password" type="password" onChange={handleChange} required />
//       <InputField label="Confirm Password" name="confirmPassword" type="password" onChange={handleChange} required />
//       <InputField label="Phone Number" name="phoneNumber" type="text" onChange={handleChange} required />

//       <button 
//         type="submit" 
//         className="w-full py-3 text-white font-semibold rounded-xl bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 transition-all"
//         disabled={loading}
//       >
//         {loading ? "Signing Up..." : "Sign Up"}
//       </button>
//     </form>
//   </div>
// </div>

//   );
// };

// export default SignupPage;






