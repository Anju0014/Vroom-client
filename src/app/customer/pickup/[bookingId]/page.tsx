"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AuthService } from "@/services/customer/authService";
import { useAuthStore } from "@/store/customer/authStore";
import LoadingButton from "@/components/common/LoadingButton";

type Step = "START" | "OTP" | "DONE";

export default function PickupPage() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const router = useRouter();
  const { user } = useAuthStore();

  const [booking, setBooking] = useState<any>(null);
  const [step, setStep] = useState<Step>("START");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (!bookingId || !user) return;

    (async () => {
      try {
        const data = await AuthService.getBookingById(bookingId);

        // if (data.pickupVerified) {
        //   router.replace(`/customer/dashboard/ongoing/${bookingId}`);
        //   return;
        // }

        const today = new Date().toDateString();
        const start = new Date(data.startDate).toDateString();
        // if (today !== start) {
        //   throw new Error("Pickup allowed only on booking start date");
        // }

        setBooking(data);
      } catch (err: any) {
        toast.error(err.message || "Invalid booking");
        router.replace("/customer/dashboard/bookings");
      } finally {
        setLoading(false);
      }
    })();
  }, [bookingId, user, router]);

  useEffect(() => {
    if (!resendTimer) return;
    const timer = setTimeout(() => setResendTimer((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const requestOtp = async () => {
    try {
      setActionLoading(true);
      await AuthService.requestPickupOTP(bookingId);
      toast.success("OTP has sent to your email");
      setStep("OTP");
      setResendTimer(5*60);
    } catch {
      toast.error("Failed to send OTP");
    } finally {
      setActionLoading(false);
    }
  };

  
  const verifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error("Enter valid 6 digit OTP");
      return;
    }

    try {
      setActionLoading(true);
      await AuthService.verifyPickupOTP(bookingId, otp);
      toast.success("Pickup verified");
      setStep("DONE");

      setTimeout(() => {
        router.replace(`/customer/dashboard/bookings`);
      }, 1200);
    } catch {
      toast.error("Invalid OTP");
      setOtp("");
    } finally {
      setActionLoading(false);
    }
  };
  if (!user) {
    router.replace("/login");
    return null;
  }

  if (loading) {
    return (
         <div className="flex items-center justify-center h-20">
      <div className="w-8 h-8 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
       <p>Loading pickup details...</p>
    </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-xl mx-auto space-y-6">

        <div className="bg-slate-800 p-5 rounded-xl">
          <h2 className="text-xl font-bold">Vehicle Pickup</h2>
          {/* <p className="text-slate-300">{booking.carName}</p> */}
          {/* <p className="text-sm text-slate-400 mt-1">
            {booking.pickupLocation}
          </p> */}
        </div>
        {step === "START" && (
          <LoadingButton
            onClick={requestOtp}
            disabled={actionLoading}
            className="w-full py-4 bg-green-600 rounded-xl font-bold"
          >
            {actionLoading ? "Requesting OTP..." : "I'm at Pickup Location"}
          </LoadingButton>
        )}

        {step === "OTP" && (
          <div className="bg-slate-800 p-5 rounded-xl space-y-4">
            <p className="text-center text-slate-300">
              Enter OTP from your email
            </p>

            <input
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
              }
              className="w-full text-center text-2xl py-3 bg-slate-700 rounded-lg tracking-widest"
            />

            <button
              onClick={verifyOtp}
              disabled={actionLoading}
              className="w-full py-3 bg-orange-600 rounded-xl font-bold"
            >
              {actionLoading ? "Verifying..." : "Verify & Start Trip"}
            </button>

            <button
              onClick={requestOtp}
              disabled={resendTimer > 0}
              className="w-full text-sm text-slate-400"
            >
              {resendTimer
                ? `Resend OTP in ${Math.floor(resendTimer / 60)}:${String(resendTimer % 60).padStart(2, "0")}`
                : "Resend OTP"}
            </button>
          </div>
        )}

    
        {step === "DONE" && (
          <div className="text-center text-green-400 text-lg">
            Pickup Verified ✔ Redirecting...
          </div>
        )}
      </div>
    </div>
  );
}
