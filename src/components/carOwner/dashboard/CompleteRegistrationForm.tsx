"use client";

import React, { useState } from "react";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { ownerRegisterSchema } from "@/lib/validation";
import { OwnerAuthService } from "@/services/carOwner/authService";
import InputField from "@/components/InputField";
import FileUpload from "@/components/FileUpload";
import { Address, CarOwner } from "@/types/authTypes";

interface CompleteRegistrationFormProps {
  ownerDetails: CarOwner;
}

const CompleteRegistrationForm: React.FC<CompleteRegistrationFormProps> = ({ ownerDetails }) => {
  const [formData, setFormData] = useState({
    phoneNumber: ownerDetails.phoneNumber || "",
    altPhoneNumber: "",
    idProof: "",
    address: ownerDetails.address || { addressLine1: "", city: "", state: "", postalCode: "", country: "" },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const key = name.split(".")[1]; // Extracts 'addressLine1', 'city', etc.
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileUpload = async (uploadedUrl: string | string[]) => {
    if (typeof uploadedUrl === "string") {
      setFormData((prev) => ({ ...prev, idProof: uploadedUrl }));
      toast.success("ID Proof uploaded successfully!");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("hihihi,,,,,,ojojo")

    const result = ownerRegisterSchema.safeParse(formData);
    if (!result.success) {
        const errorMessages = result.error.errors.map((err) => err.message).join(", ");
        setError(errorMessages);
        toast.error(errorMessages);
        return;
      }

    setLoading(true);
    try {
        console.log("reg")
      await OwnerAuthService.completeRegistration(formData);
      console.log("rogggg")
      toast.success("Registration completed successfully!");
     
    //   window.location.reload();
    } catch (error) {
      console.error("Failed to complete registration:", error);
      toast.error("Failed to complete registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Complete Your Registration</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField label="Phone Number *" name="phoneNumber" type="text" value={formData.phoneNumber} onChange={handleChange} required />
        <InputField label="Alternate Phone Number" name="altPhoneNumber" type="text" value={formData.altPhoneNumber} onChange={handleChange} />

        <div>
          <label className="block text-gray-700">Upload ID Proof *</label>
          <FileUpload accept="image/*,application/pdf" multiple={false} onUploadComplete={handleFileUpload} />
          {formData.idProof && <p className="text-green-600 mt-1">File uploaded successfully.</p>}
        </div>

        <h2 className="text-lg font-semibold mt-4">Address</h2>
        <InputField label="Address Line 1 *" name="address.addressLine1" type="text" value={formData.address.addressLine1} onChange={handleChange} required />
        <InputField label="City *" name="address.city" type="text" value={formData.address.city} onChange={handleChange} required />
        <InputField label="State" name="address.state" type="text" value={formData.address.state} onChange={handleChange} />
        <InputField label="Postal Code" name="address.postalCode" type="text" value={formData.address.postalCode} onChange={handleChange} />
        <InputField label="Country *" name="address.country" type="text" value={formData.address.country} onChange={handleChange} required />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition" disabled={loading}>
          {loading ? "Submitting..." : "Complete Registration"}
        </button>
      </form>
    </div>
  );
};

export default CompleteRegistrationForm;





// "use client";

// import React, { useState } from "react";
// import { OwnerAuthService } from "@/services/carOwner/authService";
// import { toast } from "react-hot-toast";
// import FileUpload from "@/components/FileUpload";
// import { Address, CarOwner } from "@/types/authTypes";

// interface CompleteRegistrationFormProps {
//   ownerDetails: CarOwner;
// }

// const CompleteRegistrationForm: React.FC<CompleteRegistrationFormProps> = ({ ownerDetails }) => {
//   const [phoneNumber, setPhoneNumber] = useState(ownerDetails.phoneNumber || "");
//   const [altPhoneNumber, setAltPhoneNumber] = useState("");
//   const [idProof, setIdProof] = useState<string | null>(null);
//   const [address, setAddress] = useState<Address>(ownerDetails.address || { addressLine1: "", city: "", state: "", postalCode: "", country: "" });
//   const [loading, setLoading] = useState(false);

//   const handleFileUpload = async (uploadedUrl: string | string[]) => {
//     if (typeof uploadedUrl === "string") {
//       setIdProof(uploadedUrl);
//       toast.success("ID Proof uploaded successfully!");
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//       const result = ownerRegisterSchema.safeParse({phoneNumber,idProof,address.addressLine1,address.City});
//         if (!result.success) {
//           const errorMessages = result.error.errors.map((err) => err.message).join(", ");
//           setError(errorMessages);
//           toast.error(errorMessages);
//           return;
//         }
//     // if (!phoneNumber || !idProof || !address.addressLine1 || !address.city) {
//     //   toast.error("Please fill all required fields.");
//     //   return;
//     // }

//     setLoading(true);

//     try {
//       await OwnerAuthService.completeRegistration({
//         phoneNumber,
//         altPhoneNumber,
//         idProof,
//         address,
//       });

//       toast.success("Registration completed successfully!");
//       window.location.reload(); // Refresh the page to reflect changes
//     } catch (error) {
//       console.error("Failed to complete registration:", error);
//       toast.error("Failed to complete registration.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//       <h1 className="text-2xl font-bold mb-6 text-center">Complete Your Registration</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Phone Number */}
//         <div>
//           <label className="block text-gray-700">Phone Number *</label>
//           <input
//             type="text"
//             className="w-full p-2 border rounded"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//             required
//           />
//         </div>

//         {/* Alternate Phone Number */}
//         <div>
//           <label className="block text-gray-700">Alternate Phone Number</label>
//           <input
//             type="text"
//             className="w-full p-2 border rounded"
//             value={altPhoneNumber}
//             onChange={(e) => setAltPhoneNumber(e.target.value)}
//           />
//         </div>

//         {/* ID Proof Upload */}
//         <div>
//           <label className="block text-gray-700">Upload ID Proof *</label>
//           <FileUpload accept="image/*,application/pdf" multiple={false} onUploadComplete={handleFileUpload} />
//           {idProof && <p className="text-green-600 mt-1">File uploaded successfully.</p>}
//         </div>

//         {/* Address */}
//         <div>
//           <label className="block text-gray-700">Address *</label>
//           <input
//             type="text"
//             className="w-full p-2 border rounded mb-2"
//             placeholder="Address Line 1"
//             value={address.addressLine1}
//             onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
//             required
//           />
//           <input
//             type="text"
//             className="w-full p-2 border rounded mb-2"
//             placeholder="City"
//             value={address.city}
//             onChange={(e) => setAddress({ ...address, city: e.target.value })}
//             required
//           />
//           <input
//             type="text"
//             className="w-full p-2 border rounded mb-2"
//             placeholder="State"
//             value={address.state}
//             onChange={(e) => setAddress({ ...address, state: e.target.value })}
//           />
//           <input
//             type="text"
//             className="w-full p-2 border rounded mb-2"
//             placeholder="Postal Code"
//             value={address.postalCode}
//             onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
//           />
//           <input
//             type="text"
//             className="w-full p-2 border rounded"
//             placeholder="Country"
//             value={address.country}
//             onChange={(e) => setAddress({ ...address, country: e.target.value })}
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
//           disabled={loading}
//         >
//           {loading ? "Submitting..." : "Complete Registration"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CompleteRegistrationForm;
