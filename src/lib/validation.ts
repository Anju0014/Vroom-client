
import {z} from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

export const signupSchema=z.object({

    fullName:z
        .string()
        .nonempty({message:"Full name is required"})
        .trim()
        .min(3,{message:"Name must be at least 3 characters"}),
   
    email:z
        .string()
        .nonempty({message:"Email is requuired"})
        .trim()
        .email({message:"Invalid email format"}),

    password:z
        .string()
        .nonempty({message:"Password is required"})
        .trim()
        .min(6, { message: "Password must be at least 6 characters" }),
    
    confirmPassword:z
        .string()
        .nonempty({message:"Confirm Password is required"}),
    
    phoneNumber:z
        .string()
        .nonempty({message:"Phone NUmber is required"})
        .regex(/^\d{10}$/,{message:"Phone number is required"}),
})
.refine((data)=>data.password===data.confirmPassword,{
    message:"Passwords do not match",
    path:["confirmPassword"]
})

export const loginSchema=z.object({
    email:z
        .string()
        .nonempty({message:"Email is requuired"})
        .trim()
        .email({message:"Invalid email format"}),

    password:z
        .string()
        .nonempty({message:"Password is required"})
        .trim()
        .min(6, { message: "Password must be at least 6 characters" }),

})

export const emailSchema = z.string().email({ message: "Invalid email format" });



export const resetPasswordSchema = z.object({
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .regex(passwordRegex, {
        message: "Password must contain at least 1 uppercase, 1 lowercase, 1 digit, and 1 special character",
      }),
    
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Error will show under confirmPassword
  });




// export const validateSignup = (data: { fullName: string; email: string; password: string; confirmPassword: string; phoneNumber: string }) => {
//     const errors: Record<string, string> = {};
  
//     if (!data.fullName.trim()) errors.firstName = "Name is required";
//     if (!data.email.includes("@")) errors.email = "Invalid email format";
//     if (data.password.length < 6) errors.password = "Password must be at least 6 characters";
//     if (data.password !== data.confirmPassword) errors.confirmPassword = "Passwords do not match";
//     if (!/^\d{10}$/.test(data.phoneNumber)) errors.phoneNumber = "Phone number must be 10 digits";
  
//     return errors;
//   };
  