
// "use client";

// import { useEffect, useRef, useState } from "react";
// import socket from "@/services/common/socketService";

// interface Props {
//   roomId: string;
//   role: "admin" | "owner";
// }

// export default function VideoCall({ roomId, role }: Props) {
//   const localVideoRef = useRef<HTMLVideoElement>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement>(null);
//   const peerRef = useRef<RTCPeerConnection | null>(null);
//   const localStreamRef = useRef<MediaStream | null>(null);
//   const endingRef = useRef(false); 

//   const [inCall, setInCall] = useState(false);

//   /* -------------------- SOCKET SETUP -------------------- */
//   useEffect(() => {
//     socket.emit("join-room", roomId);

//     socket.on("offer", handleOffer);
//     socket.on("answer", handleAnswer);
//     socket.on("ice-candidate", handleIceCandidate);
//     socket.on("end-call", handleRemoteEndCall);

//     return () => {
//       endCall(false);
//       socket.emit("leave-room", roomId);
//       socket.off();
//     };
//   }, []);

  
//   const startCall = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//     localStreamRef.current = stream;
//     if (localVideoRef.current) localVideoRef.current.srcObject = stream;

//     const peer = createPeer();
//     stream.getTracks().forEach(track => peer.addTrack(track, stream));
//     peerRef.current = peer;

//     const offer = await peer.createOffer();
//     await peer.setLocalDescription(offer);
//     socket.emit("offer", { roomId, offer });

//     setInCall(true);
//   };

  
//   const handleOffer = async (offer: RTCSessionDescriptionInit) => {
//     if (role !== "owner") return;

//     const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//     localStreamRef.current = stream;
//     if (localVideoRef.current) localVideoRef.current.srcObject = stream;

//     const peer = createPeer();
//     stream.getTracks().forEach(track => peer.addTrack(track, stream));
//     peerRef.current = peer;

//     await peer.setRemoteDescription(new RTCSessionDescription(offer));

//     const answer = await peer.createAnswer();
//     await peer.setLocalDescription(answer);
//     socket.emit("answer", { roomId, answer });

//     setInCall(true);
//   };

//   const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
//     await peerRef.current?.setRemoteDescription(new RTCSessionDescription(answer));
//   };

//   const handleIceCandidate = async (candidate: RTCIceCandidateInit) => {
//     await peerRef.current?.addIceCandidate(new RTCIceCandidate(candidate));
//   };


//   const createPeer = () => {
//     const peer = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });

//     peer.ontrack = (event) => {
//       if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
//     };

//     peer.onicecandidate = (event) => {
//       if (event.candidate) {
//         socket.emit("ice-candidate", { roomId, candidate: event.candidate });
//       }
//     };

//     return peer;
//   };

  
//   const endCall = (emit: boolean = true) => {
//     if (endingRef.current) return;
//     endingRef.current = true;

//     // Stop local stream
//     localStreamRef.current?.getTracks().forEach(track => track.stop());
//     localStreamRef.current = null;

//     // Close peer connection
//     peerRef.current?.close();
//     peerRef.current = null;

//     // Clear video elements
//     if (localVideoRef.current) localVideoRef.current.srcObject = null;
//     if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

//     // Notify remote
//     if (emit) socket.emit("end-call", roomId);

//     setInCall(false);
//     endingRef.current = false;
//   };

//   const handleRemoteEndCall = () => {
//     console.log("Remote ended the call");
//     endCall(false); // Don't emit again
//   };

  
//   return (
//     <div className="space-y-3">
//       {/* Start Call Button (Admin only) */}
//       {role === "admin" && !inCall && (
//         <button
//           onClick={startCall}
//           className="px-4 py-2 bg-green-600 text-white rounded"
//         >
//           Start Verification Call
//         </button>
//       )}

//       {/* End Call Button */}
//       {inCall && (
//         <button
//           onClick={() => endCall()}
//           className="px-4 py-2 bg-red-600 text-white rounded"
//         >
//           End Call
//         </button>
//       )}

//       {/* Video Grid */}
//       <div className="grid grid-cols-2 gap-2">
//         {/* Local Video */}
//         <div className="relative">
//           <span className="absolute top-1 left-1 text-xs bg-black/70 text-white px-2 rounded">
//             {role === "admin" ? "Admin (You)" : "Owner (You)"}
//           </span>
//           <video ref={localVideoRef} autoPlay muted className="rounded bg-black w-full h-60" />
//         </div>

//         {/* Remote Video */}
//         <div className="relative">
//           <span className="absolute top-1 left-1 text-xs bg-black/70 text-white px-2 rounded">
//             {role === "admin" ? "Owner" : "Admin"}
//           </span>
//           <video ref={remoteVideoRef} autoPlay className="rounded bg-black w-full h-60" />
//         </div>
//       </div>
//     </div>
//   );
// }





// "use client";
// import { useEffect, useRef, useState } from "react";
// import socket from "@/services/common/socketService";

// interface VideoCallProps {
//   roomId: string;
//   role?: "admin" | "owner"; // Optional for admin-owner flow
//   myName?: string; // For peer-to-peer
//   otherName?: string; // For peer-to-peer
//   onClose?: () => void; // For peer-to-peer modal
//   isAdminOwner?: boolean; // Flag to distinguish between the two modes
// }

// export default function VideoCall({
//   roomId,
//   role,
//   myName,
//   otherName,
//   onClose,
//   isAdminOwner = false,
// }: VideoCallProps) {
//   const localVideoRef = useRef<HTMLVideoElement>(null);
//   const remoteVideoRef = useRef<HTMLVideoElement>(null);
//   const peerRef = useRef<RTCPeerConnection | null>(null);
//   const localStreamRef = useRef<MediaStream | null>(null);
//   const endingRef = useRef(false);
//   const pendingCandidatesRef = useRef<RTCIceCandidateInit[]>([]);

//   const [inCall, setInCall] = useState(false);
//   const [incomingOffer, setIncomingOffer] = useState<RTCSessionDescriptionInit | null>(null);
//   const [calling, setCalling] = useState(false);
//   const [localStreamReady, setLocalStreamReady] = useState(false); // 🆕 Track if preview is ready
//   const [connecting, setConnecting] = useState(false); // 🆕 For receiver after accepting

//   /* -------------------- START LOCAL PREVIEW ON MOUNT -------------------- */
//   useEffect(() => {
//     // 🆕 Start local video preview immediately when component mounts
//     const initializeLocalStream = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: true,
//         });
//         localStreamRef.current = stream;
//         if (localVideoRef.current) {
//           localVideoRef.current.srcObject = stream;
//         }
//         setLocalStreamReady(true);
//       } catch (err) {
//         console.error("Media error:", err);
//         alert("Cannot access camera/microphone. Please grant permissions.");
//       }
//     };

//     initializeLocalStream();

//     // Cleanup on unmount
//     return () => {
//       if (localStreamRef.current) {
//         localStreamRef.current.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   /* -------------------- SOCKET SETUP -------------------- */
//   useEffect(() => {
//     socket.emit("join-room", roomId);

//     const handleOffer = async (data: { offer: RTCSessionDescriptionInit }) => {
//       console.log("Received offer", data);
//       // For admin-owner: only owner accepts
//       if (isAdminOwner && role !== "owner") return;
      
//       setIncomingOffer(data.offer);
      
//       // Auto-accept for admin-owner flow when owner receives offer
//       if (isAdminOwner && role === "owner") {
//         await acceptCall(data.offer);
//       }
//     };

//     const handleAnswer = async (data: { answer: RTCSessionDescriptionInit }) => {
//       console.log("Received answer", data);
//       if (!peerRef.current) return;

//       try {
//         await peerRef.current.setRemoteDescription(
//           new RTCSessionDescription(data.answer)
//         );

//         // 🆕 Set inCall when answer is received (for caller side)
//         setCalling(false);
//         setConnecting(false); // 🆕 Clear connecting state
//         setInCall(true);

//         // Process any pending ICE candidates
//         for (const candidate of pendingCandidatesRef.current) {
//           await peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
//         }
//         pendingCandidatesRef.current = [];
//       } catch (err) {
//         console.error("Error setting remote description:", err);
//       }
//     };

//     const handleIceCandidate = async (data: { candidate: RTCIceCandidateInit }) => {
//       console.log("Received ICE candidate", data);
//       if (peerRef.current && peerRef.current.remoteDescription) {
//         try {
//           await peerRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
//         } catch (err) {
//           console.error("Error adding ICE candidate:", err);
//         }
//       } else {
//         // Queue candidates if remote description not set yet
//         pendingCandidatesRef.current.push(data.candidate);
//       }
//     };

//     const handleRemoteEndCall = () => {
//       console.log("Remote ended the call");
//       endCall(false);
//     };

//     socket.on("offer", handleOffer);
//     socket.on("answer", handleAnswer);
//     socket.on("ice-candidate", handleIceCandidate);
//     socket.on("end-call", handleRemoteEndCall);

//     return () => {
//       // Only end call if actually in a call
//       if (peerRef.current) {
//         endCall(false);
//       }
//       socket.emit("leave-room", roomId);
//       socket.off("offer", handleOffer);
//       socket.off("answer", handleAnswer);
//       socket.off("ice-candidate", handleIceCandidate);
//       socket.off("end-call", handleRemoteEndCall);
//     };
//   }, [roomId, role, isAdminOwner]);

//   /* -------------------- PEER SETUP -------------------- */
//   const createPeer = () => {
//     const peer = new RTCPeerConnection({
//       iceServers: [
//         { urls: "stun:stun.l.google.com:19302" },
//         { urls: "stun:stun1.l.google.com:19302" },
//       ],
//     });

//     peer.ontrack = (event) => {
//       console.log("Received remote track");
//       if (remoteVideoRef.current && event.streams[0]) {
//         remoteVideoRef.current.srcObject = event.streams[0];
//         // 🆕 Set inCall when remote track arrives (for receiver side)
//         setCalling(false);
//         setConnecting(false); // 🆕 Clear connecting state
//         setInCall(true);
//       }
//     };

//     peer.onicecandidate = (event) => {
//       if (!peer.localDescription) return;
//       if (event.candidate) {
//         console.log("Sending ICE candidate");
//         socket.emit("ice-candidate", {
//           roomId,
//           candidate: event.candidate,
//         });
//       }
//     };

//     peer.onconnectionstatechange = () => {
//       console.log("Connection state:", peer.connectionState);
//       if (peer.connectionState === "failed" || peer.connectionState === "disconnected") {
//         console.log("Connection failed/disconnected");
//         endCall();
//       }
//     };

//     peer.oniceconnectionstatechange = () => {
//       console.log("ICE connection state:", peer.iceConnectionState);
//     };

//     return peer;
//   };

//   /* -------------------- CALL FUNCTIONS -------------------- */
//   const startCall = async () => {
//     console.log("Starting call...");
    
//     // 🆕 Use existing stream if available
//     const stream = localStreamRef.current;
//     if (!stream) {
//       alert("Please allow camera/microphone access first");
//       return;
//     }

//     const peer = createPeer();
//     peerRef.current = peer;

//     stream.getTracks().forEach((track) => {
//       peer.addTrack(track, stream);
//     });

//     const offer = await peer.createOffer();
//     await peer.setLocalDescription(offer);

//     console.log("Sending offer");
//     socket.emit("offer", { roomId, offer });

//     setCalling(true);
//   };

//   const acceptCall = async (offer?: RTCSessionDescriptionInit) => {
//     const offerToUse = offer || incomingOffer;
//     if (!offerToUse) return;

//     console.log("Accepting call...");
    
//     // 🆕 Use existing stream if available
//     const stream = localStreamRef.current;
//     if (!stream) {
//       alert("Please allow camera/microphone access first");
//       return;
//     }

//     const peer = createPeer();
//     peerRef.current = peer;

//     stream.getTracks().forEach((track) => {
//       peer.addTrack(track, stream);
//     });

//     await peer.setRemoteDescription(new RTCSessionDescription(offerToUse));

//     // Process any pending ICE candidates
//     for (const candidate of pendingCandidatesRef.current) {
//       await peer.addIceCandidate(new RTCIceCandidate(candidate));
//     }
//     pendingCandidatesRef.current = [];

//     const answer = await peer.createAnswer();
//     await peer.setLocalDescription(answer);

//     console.log("Sending answer");
//     socket.emit("answer", { roomId, answer });

//     setIncomingOffer(null);
//     setConnecting(true); // 🆕 Show "connecting" for receiver
//     // The inCall state will be set when remote track arrives in ontrack
//   };

//   const endCall = (emit = true) => {
//     if (endingRef.current) return;
//     endingRef.current = true;

//     console.log("Ending call...");

//     // Close peer connection
//     peerRef.current?.close();
//     peerRef.current = null;

//     // Clear remote video only (keep local stream running)
//     if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

//     // Clear pending candidates
//     pendingCandidatesRef.current = [];

//     // Notify remote
//     if (emit) {
//       socket.emit("end-call", roomId);
//     }

//     setInCall(false);
//     setCalling(false);
//     setConnecting(false); // 🆕 Clear connecting state
//     setIncomingOffer(null);

//     // Reset ending flag after a delay to allow new calls
//     setTimeout(() => {
//       endingRef.current = false;
//     }, 1000);

//     // Close modal for peer-to-peer
//     if (onClose) {
//       onClose();
//     }
//   };

//   /* -------------------- RENDER -------------------- */
//   // Admin-Owner UI
//   if (isAdminOwner) {
//     return (
//       <div className="space-y-3">
//         {/* Start Call Button (Admin only) */}
//         {role === "admin" && !inCall && !calling && (
//           <button
//             onClick={startCall}
//             disabled={!localStreamReady}
//             className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50"
//           >
//             {localStreamReady ? "Start Verification Call" : "Loading camera..."}
//           </button>
//         )}

//         {/* Calling/Connecting State */}
//         {calling && (
//           <div className="text-center text-sm text-gray-600">
//             Connecting...
//           </div>
//         )}

//         {/* End Call Button */}
//         {inCall && (
//           <button
//             onClick={() => endCall()}
//             className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
//           >
//             End Call
//           </button>
//         )}

//         {/* Video Grid */}
//         <div className="grid grid-cols-2 gap-2">
//           {/* Local Video */}
//           <div className="relative">
//             <span className="absolute top-1 left-1 text-xs bg-black/70 text-white px-2 rounded z-10">
//               {role === "admin" ? "Admin (You)" : "Owner (You)"}
//             </span>
//             <video
//               ref={localVideoRef}
//               autoPlay
//               muted
//               playsInline
//               className="rounded bg-black w-full h-60 object-cover"
//             />
//           </div>

//           {/* Remote Video */}
//           <div className="relative">
//             <span className="absolute top-1 left-1 text-xs bg-black/70 text-white px-2 rounded z-10">
//               {role === "admin" ? "Owner" : "Admin"}
//             </span>
//             <video
//               ref={remoteVideoRef}
//               autoPlay
//               playsInline
//               className="rounded bg-black w-full h-60 object-cover"
//             />
//             {!inCall && (
//               <div className="absolute inset-0 flex items-center justify-center text-white text-sm">
//                 Waiting for connection...
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Peer-to-Peer UI
//   return (
//     <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-5xl relative">
//       <button
//         onClick={() => endCall()}
//         className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded z-10"
//       >
//         Close
//       </button>

//       <h2 className="text-white text-2xl mb-6 text-center">
//         Video Call with {otherName}
//       </h2>

//       {/* Call Controls */}
//       {!inCall && !incomingOffer && !calling && (
//         <div className="flex justify-center gap-6 mb-6">
//           <button
//             onClick={startCall}
//             disabled={!localStreamReady}
//             className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg text-lg disabled:opacity-50"
//           >
//             {localStreamReady ? "Start Call" : "Loading camera..."}
//           </button>
//         </div>
//       )}

//       {/* Calling State - Only shown to the caller */}
//       {calling && !inCall && !incomingOffer && (
//         <div className="text-center mb-6">
//           <p className="text-white text-xl mb-4">
//             Calling {otherName}...
//           </p>
//           <div className="text-gray-400">Waiting for response...</div>
//           <button
//             onClick={() => endCall()}
//             className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
//           >
//             Cancel Call
//           </button>
//         </div>
//       )}

//       {/* Incoming Call - Only shown to the receiver */}
//       {incomingOffer && !inCall && (
//         <div className="text-center mb-6">
//           <p className="text-white text-xl mb-4">
//             📞 Incoming call from {otherName}...
//           </p>
//           <div className="flex justify-center gap-4">
//             <button
//               onClick={() => acceptCall()}
//               disabled={!localStreamReady}
//               className="px-10 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg text-lg disabled:opacity-50"
//             >
//               {localStreamReady ? "✓ Accept" : "Loading camera..."}
//             </button>
//             <button
//               onClick={() => {
//                 setIncomingOffer(null);
//                 socket.emit("end-call", roomId);
//               }}
//               className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg text-lg"
//             >
//               ✗ Decline
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Connecting State - After receiver accepts */}
//       {connecting && !inCall && (
//         <div className="text-center mb-6">
//           <p className="text-white text-xl mb-4">
//             Connecting to {otherName}...
//           </p>
//           <div className="text-gray-400">Establishing connection...</div>
//         </div>
//       )}

//       {/* Video Grid - Always show local preview */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="relative">
//           <span className="absolute top-2 left-2 bg-black/60 text-white px-3 py-1 rounded text-sm z-10">
//             You ({myName})
//           </span>
//           <video
//             ref={localVideoRef}
//             autoPlay
//             muted
//             playsInline
//             className="w-full h-64 md:h-96 bg-black rounded-xl object-cover"
//           />
//         </div>

//         <div className="relative">
//           <span className="absolute top-2 left-2 bg-black/60 text-white px-3 py-1 rounded text-sm z-10">
//             {otherName}
//           </span>
//           <video
//             ref={remoteVideoRef}
//             autoPlay
//             playsInline
//             className="w-full h-64 md:h-96 bg-black rounded-xl object-cover"
//           />
//           {!inCall && (
//             <div className="absolute inset-0 flex items-center justify-center text-white text-lg">
//               {calling ? "Connecting..." : "Not connected"}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* End Call Button (when in call) */}
//       {inCall && (
//         <div className="mt-6 text-center">
//           <button
//             onClick={() => endCall()}
//             className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg text-lg"
//           >
//             End Call
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }



"use client";
import { useEffect, useRef, useState } from "react";
import socket from "@/services/common/socketService";

interface VideoCallProps {
  roomId: string;
  role?: "admin" | "owner"; // Optional for admin-owner flow
  myName?: string; // For peer-to-peer
  otherName?: string; // For peer-to-peer
  onClose?: () => void; // For peer-to-peer modal
  isAdminOwner?: boolean; // Flag to distinguish between the two modes
}

export default function VideoCall({
  roomId,
  role,
  myName,
  otherName,
  onClose,
  isAdminOwner = false,
}: VideoCallProps) {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const endingRef = useRef(false);
  const pendingCandidatesRef = useRef<RTCIceCandidateInit[]>([]);

  const [inCall, setInCall] = useState(false);
  const [incomingOffer, setIncomingOffer] = useState<RTCSessionDescriptionInit | null>(null);
  const [calling, setCalling] = useState(false);
  const [localStreamReady, setLocalStreamReady] = useState(false); // 🆕 Track if preview is ready
  const [connecting, setConnecting] = useState(false); // 🆕 For receiver after accepting

  /* -------------------- START LOCAL PREVIEW ON MOUNT -------------------- */
  useEffect(() => {
    // 🆕 Start local video preview immediately when component mounts
    const initializeLocalStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        localStreamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        setLocalStreamReady(true);
      } catch (err) {
        console.error("Media error:", err);
        alert("Cannot access camera/microphone. Please grant permissions.");
      }
    };

    initializeLocalStream();

    // Cleanup on unmount
    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  /* -------------------- SOCKET SETUP -------------------- */
  useEffect(() => {
    console.log("🔌 Joining room:", roomId, "Role:", role, "isAdminOwner:", isAdminOwner);
    socket.emit("join-room", roomId);

    const handleOffer = async (data: { offer: RTCSessionDescriptionInit }) => {
      console.log("📞 Received offer", data);
      console.log("📞 Current state - isAdminOwner:", isAdminOwner, "role:", role);
      
      // For admin-owner: only owner accepts
      if (isAdminOwner && role !== "owner") {
        console.log("⏭️ Ignoring offer - admin-owner mode and not owner");
        return;
      }
      
      // 🔴 FIX: Clear calling state if we were calling and received an offer
      // This handles the case where both users click "Start Call" at the same time
      console.log("✅ Setting incoming offer");
      setCalling(false);
      
      setIncomingOffer(data.offer);
      
      // Auto-accept for admin-owner flow when owner receives offer
      if (isAdminOwner && role === "owner") {
        console.log("🤖 Auto-accepting (admin-owner mode)");
        await acceptCall(data.offer);
      }
    };

    const handleAnswer = async (data: { answer: RTCSessionDescriptionInit }) => {
      console.log("Received answer", data);
      if (!peerRef.current) return;

      try {
        await peerRef.current.setRemoteDescription(
          new RTCSessionDescription(data.answer)
        );

        // 🆕 Set inCall when answer is received (for caller side)
        setCalling(false);
        setConnecting(false); // 🆕 Clear connecting state
        setInCall(true);

        // Process any pending ICE candidates
        for (const candidate of pendingCandidatesRef.current) {
          await peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        }
        pendingCandidatesRef.current = [];
      } catch (err) {
        console.error("Error setting remote description:", err);
      }
    };

    const handleIceCandidate = async (data: { candidate: RTCIceCandidateInit }) => {
      console.log("Received ICE candidate", data);
      if (peerRef.current && peerRef.current.remoteDescription) {
        try {
          await peerRef.current.addIceCandidate(new RTCIceCandidate(data.candidate));
        } catch (err) {
          console.error("Error adding ICE candidate:", err);
        }
      } else {
        // Queue candidates if remote description not set yet
        pendingCandidatesRef.current.push(data.candidate);
      }
    };

    const handleRemoteEndCall = () => {
      console.log("Remote ended the call");
      endCall(false);
    };

    const handleCallDeclined = () => {
      console.log("❌ Call was declined");
      setCalling(false);
      setIncomingOffer(null);
      alert("Call was declined");
    };

    socket.on("offer", handleOffer);
    socket.on("answer", handleAnswer);
    socket.on("ice-candidate", handleIceCandidate);
    socket.on("end-call", handleRemoteEndCall);
    socket.on("call-declined", handleCallDeclined);

    return () => {
      // Only end call if actually in a call
      if (peerRef.current) {
        endCall(false);
      }
      socket.emit("leave-room", roomId);
      socket.off("offer", handleOffer);
      socket.off("answer", handleAnswer);
      socket.off("ice-candidate", handleIceCandidate);
      socket.off("end-call", handleRemoteEndCall);
      socket.off("call-declined", handleCallDeclined);
    };
  }, [roomId, role, isAdminOwner]);

  /* -------------------- PEER SETUP -------------------- */
  const createPeer = () => {
    const peer = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
      ],
    });

    peer.ontrack = (event) => {
      console.log("Received remote track");
      if (remoteVideoRef.current && event.streams[0]) {
        remoteVideoRef.current.srcObject = event.streams[0];
        setCalling(false);
        setConnecting(false); 
        setInCall(true);
      }
    };

    peer.onicecandidate = (event) => {
      if (!peer.localDescription) return;
      if (event.candidate) {
        console.log("Sending ICE candidate");
        socket.emit("ice-candidate", {
          roomId,
          candidate: event.candidate,
        });
      }
    };

    peer.onconnectionstatechange = () => {
      console.log("Connection state:", peer.connectionState);
      if (peer.connectionState === "failed" || peer.connectionState === "disconnected") {
        console.log("Connection failed/disconnected");
        endCall();
      }
    };

    peer.oniceconnectionstatechange = () => {
      console.log("ICE connection state:", peer.iceConnectionState);
    };

    return peer;
  };

  /* -------------------- CALL FUNCTIONS -------------------- */
  const startCall = async () => {
    console.log("📞 Starting call...");
    
    // 🆕 Use existing stream if available
    const stream = localStreamRef.current;
    if (!stream) {
      alert("Please allow camera/microphone access first");
      return;
    }

    const peer = createPeer();
    peerRef.current = peer;

    stream.getTracks().forEach((track) => {
      peer.addTrack(track, stream);
    });

    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);

    console.log("📤 Sending offer to room:", roomId);
    socket.emit("offer", { roomId, offer });

    setCalling(true);
  };

  const acceptCall = async (offer?: RTCSessionDescriptionInit) => {
    const offerToUse = offer || incomingOffer;
    if (!offerToUse) return;

    console.log("Accepting call...");
    
    
    const stream = localStreamRef.current;
    if (!stream) {
      alert("Please allow camera/microphone access first");
      return;
    }

    const peer = createPeer();
    peerRef.current = peer;

    stream.getTracks().forEach((track) => {
      peer.addTrack(track, stream);
    });

    await peer.setRemoteDescription(new RTCSessionDescription(offerToUse));

   
    for (const candidate of pendingCandidatesRef.current) {
      await peer.addIceCandidate(new RTCIceCandidate(candidate));
    }
    pendingCandidatesRef.current = [];

    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);

    console.log("Sending answer");
    socket.emit("answer", { roomId, answer });

    setIncomingOffer(null);
    setConnecting(true); 
  };

  const endCall = (emit = true) => {
    if (endingRef.current) return;
    endingRef.current = true;

    console.log("Ending call...");

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }


    peerRef.current?.close();
    peerRef.current = null;

   
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

  
    pendingCandidatesRef.current = [];


    if (emit) {
      socket.emit("end-call", roomId);
    }

    setInCall(false);
    setCalling(false);
    setConnecting(false); 
    setIncomingOffer(null);
    setLocalStreamReady(false); 

   
    setTimeout(() => {
      endingRef.current = false;
    }, 1000);


    if (onClose) {
      onClose();
    }
  };


  if (isAdminOwner) {
    return (
      <div className="space-y-3">
    
        {role === "admin" && !inCall && !calling && (
          <button
            onClick={startCall}
            disabled={!localStreamReady}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50"
          >
            {localStreamReady ? "Start Verification Call" : "Loading camera..."}
          </button>
        )}

    
        {calling && (
          <div className="text-center text-sm text-gray-600">
            Connecting...
          </div>
        )}

        {inCall && (
          <button
            onClick={() => endCall()}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            End Call
          </button>
        )}

  
        <div className="grid grid-cols-2 gap-2">

          <div className="relative">
            <span className="absolute top-1 left-1 text-xs bg-black/70 text-white px-2 rounded z-10">
              {role === "admin" ? "Admin (You)" : "Owner (You)"}
            </span>
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="rounded bg-black w-full h-60 object-cover"
            />
          </div>

          <div className="relative">
            <span className="absolute top-1 left-1 text-xs bg-black/70 text-white px-2 rounded z-10">
              {role === "admin" ? "Owner" : "Admin"}
            </span>
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              className="rounded bg-black w-full h-60 object-cover"
            />
            {!inCall && (
              <div className="absolute inset-0 flex items-center justify-center text-white text-sm">
                Waiting for connection...
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-5xl relative">
      <button
        onClick={() => endCall()}
        className="absolute top-4 right-4 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded z-10"
      >
        Close
      </button>

      <h2 className="text-white text-2xl mb-6 text-center">
        Video Call with {otherName}
      </h2>


      {!inCall && !incomingOffer && !calling && (
        <div className="flex justify-center gap-6 mb-6">
          <button
            onClick={startCall}
            disabled={!localStreamReady}
            className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg text-lg disabled:opacity-50"
          >
            {localStreamReady ? "Start Call" : "Loading camera..."}
          </button>
        </div>
      )}

  
      {calling && !inCall && !incomingOffer && (
        <div className="text-center mb-6">
          <p className="text-white text-xl mb-4">
            Calling {otherName}...
          </p>
          <div className="text-gray-400">Waiting for response...</div>
          <button
            onClick={() => endCall()}
            className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            Cancel Call
          </button>
        </div>
      )}

  
      {incomingOffer && !inCall && (
        <div className="text-center mb-6">
          <p className="text-white text-xl mb-4">
            📞 Incoming call from {otherName}...
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => acceptCall()}
              disabled={!localStreamReady}
              className="px-10 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg text-lg disabled:opacity-50"
            >
              {localStreamReady ? "✓ Accept" : "Loading camera..."}
            </button>
            <button
              onClick={() => {
                setIncomingOffer(null);
                socket.emit("call-declined", roomId);
              }}
              className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg text-lg"
            >
              ✗ Decline
            </button>
          </div>
        </div>
      )}

      {connecting && !inCall && (
        <div className="text-center mb-6">
          <p className="text-white text-xl mb-4">
            Connecting to {otherName}...
          </p>
          <div className="text-gray-400">Establishing connection...</div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <span className="absolute top-2 left-2 bg-black/60 text-white px-3 py-1 rounded text-sm z-10">
            You ({myName})
          </span>
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-64 md:h-96 bg-black rounded-xl object-cover"
          />
        </div>

        <div className="relative">
          <span className="absolute top-2 left-2 bg-black/60 text-white px-3 py-1 rounded text-sm z-10">
            {otherName}
          </span>
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-64 md:h-96 bg-black rounded-xl object-cover"
          />
          {!inCall && (
            <div className="absolute inset-0 flex items-center justify-center text-white text-lg">
              {calling ? "Connecting..." : "Not connected"}
            </div>
          )}
        </div>
      </div>

   
      {inCall && (
        <div className="mt-6 text-center">
          <button
            onClick={() => endCall()}
            className="px-10 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg text-lg"
          >
            End Call
          </button>
        </div>
      )}
    </div>
  );
}