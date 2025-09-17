"use client"
import React,{useState} from 'react';

type ButtonUpgradedProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  debounce?: number;
};

const ButtonUpgraded: React.FC<ButtonUpgradedProps> = ({
  debounce = 1000,
  onClick,
  children,
  className = "",
  ...rest
}) => {
    const [disabled,setDisabled]=useState(false);

    const handleClick= async (e:React.MouseEvent<HTMLButtonElement>)=>{
        if(disabled) return;
        setDisabled(true);
        try{
            await onClick?.(e);
        }finally{
            setTimeout(()=>setDisabled(false),debounce);
        }
    };

    return (
        <button
        {...rest}
        onClick={handleClick}
        disabled={disabled|| rest.disabled}
        className={`relative px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 
        disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
        >
             {disabled && (
        <span className="absolute left-2 top-1/2 -translate-y-1/2 animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
      )}
      {children}
        </button>
    )

}
export default ButtonUpgraded
