// "use client";
// import { OwnerAuthService } from "@/services/carOwner/authService";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import InputField from "./InputField";
// import { changePasswordSchema } from "@/lib/validation";

// const ChangePasswordModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
//   const [formData, setFormData] = useState({
//     oldPassword: "",
//     newPassword: "",
//     confirmPassword: ""
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     const result = changePasswordSchema.safeParse(formData);
//     if (!result.success) {
//       const errorMessages = result.error.errors.map((err) => err.message).join(", ");
//       toast.error(errorMessages);
//       return;
//     }
    
//     try {
     
//       const response = await OwnerAuthService.changePassword(formData);
//       if (response) {
//         toast.success("Password Changed Successfully");
//         onClose(); 
//       }
//     } catch (err) {
//       if (err instanceof Error) {
//         toast.error(err.message);
//       }
//     }
//   };

//   if (!isOpen) return null;
  
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 backdrop-blur-sm">
//     {/* <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 backdrop-blur-sm"> */}
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-xl font-semibold mb-4">Change Password</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <InputField
//             type="password"
//             label="Current Password"
//             name="oldPassword"
//             value={formData.oldPassword}
//             onChange={handleChange}
//             required
//           />

//           <InputField
//             type="password"
//             label="New Password"
//             name="newPassword"
//             value={formData.newPassword}
//             onChange={handleChange}
//             required
//           />

//           <InputField
//             type="password"
//             label="Confirm Password"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             required
//           />

//           <div className="flex justify-between pt-4">
//             <button
//               type="button"
//               className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//             <button 
//               type="submit" 
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ChangePasswordModal;



"use client";
import { AuthService } from "@/services/customer/authService";
import { OwnerAuthService } from "@/services/carOwner/authService";
import { useState } from "react";
import toast from "react-hot-toast";
import InputField from "./InputField";
import { changePasswordSchema } from "@/lib/validation";

const ChangePasswordModal = ({
  isOpen,
  onClose,
  role, // "customer" or "carOwner"
}: { 
  isOpen: boolean; 
  onClose: () => void;
  role: "customer" | "carOwner"; 
}) => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = changePasswordSchema.safeParse(formData);
    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => err.message).join(", ");
      toast.error(errorMessages)
      console.log("error from parse",errorMessages)
      return;
    }

    try {
      const service = role === "carOwner" ? OwnerAuthService : AuthService;
      
      const response = await service.changePassword({oldPassword:formData.oldPassword,newPassword:formData.newPassword});
       
    console.log("esnding data")
      if (response) {
        toast.success("Password Changed Successfully");
        onClose();
      }
    } catch (err:any) {
     
        const errorMessage = err.response?.data?.message || err.message || "An unexpected error occurred.";
        console.log("error after response")
        toast.error(errorMessage);
      
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            type="password"
            label="Current Password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            required
          />

          <InputField
            type="password"
            label="New Password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />

          <InputField
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <div className="flex justify-between pt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
