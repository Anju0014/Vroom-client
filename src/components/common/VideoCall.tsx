
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


"use client";

import { useEffect, useRef, useState } from "react";
import socket from "@/services/common/socketService";

interface VideoCallProps {
  roomId: string;
  currentUserId: string;
  currentUserRole: "admin" | "carOwner" | "customer";
}

export default function VideoCall({
  roomId,
  currentUserId,
  currentUserRole,
}: VideoCallProps) {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const peerRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const endingRef = useRef(false);

  const [inCall, setInCall] = useState(false);


  useEffect(() => {
    socket.emit("join-video-room", roomId);

    socket.on("video-offer", handleOffer);
    socket.on("video-answer", handleAnswer);
    socket.on("video-ice-candidate", handleIceCandidate);
    socket.on("video-end-call", handleRemoteEndCall);

    return () => {
      endCall(false);
      socket.emit("leave-video-room", roomId);
      socket.off("video-offer");
      socket.off("video-answer");
      socket.off("video-ice-candidate");
      socket.off("video-end-call");
    };
  }, []);

 
  const startCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    localStreamRef.current = stream;
    if (localVideoRef.current) localVideoRef.current.srcObject = stream;

    const peer = createPeer();
    stream.getTracks().forEach(track => peer.addTrack(track, stream));
    peerRef.current = peer;

    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);

    socket.emit("video-offer", {
      roomId,
      offer,
      from: currentUserId,
      role: currentUserRole,
    });

    setInCall(true);
  };


  const handleOffer = async ({ offer, from }: any) => {
  if (from === currentUserId) return; // ✅ MUST HAVE

  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  localStreamRef.current = stream;
  if (localVideoRef.current) localVideoRef.current.srcObject = stream;

  const peer = createPeer();
  peerRef.current = peer;

  stream.getTracks().forEach(track =>
    peer.addTrack(track, stream)
  );

  await peer.setRemoteDescription(
    new RTCSessionDescription(offer)
  );

  const answer = await peer.createAnswer();
  await peer.setLocalDescription(answer);

  socket.emit("video-answer", {
    roomId,
    answer,
    from: currentUserId, // ✅ ADD THIS
  });

  setInCall(true);
};
const handleAnswer = async ({ answer, from }: any) => {
  if (from === currentUserId) return; // ✅ important
  if (!peerRef.current) return;

  await peerRef.current.setRemoteDescription(
    new RTCSessionDescription(answer)
  );
};

  
  const handleIceCandidate = async ({ candidate, from }: any) => {
  if (from === currentUserId) return; // ✅ CRITICAL
  if (!peerRef.current) return;

  await peerRef.current.addIceCandidate(
    new RTCIceCandidate(candidate)
  );
};


  const createPeer = () => {
    const peer = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    peer.ontrack = event => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

   peer.onicecandidate = event => {
  if (event.candidate) {
    socket.emit("video-ice-candidate", {
      roomId,
      candidate: event.candidate,
      from: currentUserId,
    });
  }
};

    return peer;
  };


  const endCall = (emit = true) => {
    if (endingRef.current) return;
    endingRef.current = true;

    localStreamRef.current?.getTracks().forEach(t => t.stop());
    localStreamRef.current = null;

    peerRef.current?.close();
    peerRef.current = null;

    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

    if (emit) socket.emit("video-end-call", roomId);

    setInCall(false);
    endingRef.current = false;
  };

  const handleRemoteEndCall = () => {
    endCall(false);
  };

 
  return (
    <div className="space-y-3">
      {!inCall && (
        <button
          onClick={startCall}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Start Video Call
        </button>
      )}

      {inCall && (
        <button
          onClick={() => endCall()}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          End Call
        </button>
      )}

      <div className="grid grid-cols-2 gap-2">
        <video ref={localVideoRef} autoPlay muted className="bg-black h-56 rounded" />
        <video ref={remoteVideoRef} autoPlay className="bg-black h-56 rounded" />
      </div>
    </div>
  );
}
