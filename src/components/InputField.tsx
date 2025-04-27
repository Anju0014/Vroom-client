// import React from "react";

// interface InputProps {
//   label: string;
//   name: string;
//   type: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   required?: boolean;
//   suppressHydrationWarning?: boolean;
// }

// const InputField: React.FC<InputProps> = ({ label, name, type, onChange, required ,suppressHydrationWarning}) => {
//   return (
//     <div className="mb-2">
//       <label className="block text-sm font-medium">{label}</label>
//       <input className="w-full p-2  border rounded" type={type} name={name} onChange={onChange} required={required} suppressHydrationWarning={suppressHydrationWarning}/>
//     </div>
//   );
// };

// export default InputField;



interface InputProps {
  label: string;
  name: string;
  type: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  suppressHydrationWarning?: boolean;
  disabled?:boolean
  placeholder?:string;
}
const InputField: React.FC<InputProps> = ({ 
  label, 
  name, 
  type, 
  value,
  onChange, 
  required,
  suppressHydrationWarning,
  disabled=false, 
  placeholder
}) => {
  return (
    <div className="mb-2">
      <label className="block text-sm font-medium">{label}</label>
      <input 
        className={`w-full p-2 border rounded bg-gray-100 ${disabled ? 'cursor-not-allowed' : 'cursor-text'}`} 
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        suppressHydrationWarning={suppressHydrationWarning}
        disabled={disabled} 
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;



