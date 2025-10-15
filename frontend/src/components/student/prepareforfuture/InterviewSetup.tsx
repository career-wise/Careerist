import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Camera,
  Mic,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Video,
  Volume2,
  Eye,
  Sparkles,
  Clock,
  MessageSquare,
} from "lucide-react";
import Button from "../../shared/ui/Button";
import Card from "../../shared/ui/Card";
import { useMediaStream } from "../../../contexts/MediaStreamContext";

const InterviewSetup: React.FC = () => {
  const { type } = useParams<{ type: "college" | "job" }>();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { setStream } = useMediaStream();

  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [micEnabled, setMicEnabled] = useState(false);
  const [cameraStatus, setCameraStatus] = useState<"checking" | "success" | "error">("checking");
  const [micStatus, setMicStatus] = useState<"checking" | "success" | "error">("checking");
  const [permissionError, setPermissionError] = useState<string>("");

  // Check device availability on mount
  useEffect(() => {
    checkDevices();
    return () => {
      // Cleanup: stop all tracks when component unmounts only if not navigating to session
      if (streamRef.current && !window.location.pathname.includes('/session')) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const checkDevices = async () => {
    try {
      // Check if mediaDevices API is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        setCameraStatus("error");
        setMicStatus("error");
        setPermissionError("Media devices not supported in this browser");
        return;
      }

      // Check available devices
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasCamera = devices.some(device => device.kind === "videoinput");
      const hasMicrophone = devices.some(device => device.kind === "audioinput");

      setCameraStatus(hasCamera ? "success" : "error");
      setMicStatus(hasMicrophone ? "success" : "error");

      if (!hasCamera || !hasMicrophone) {
        setPermissionError("Camera or microphone not found. Please connect devices and refresh.");
      }
    } catch (error) {
      console.error("Error checking devices:", error);
      setCameraStatus("error");
      setMicStatus("error");
      setPermissionError("Unable to check devices. Please check browser permissions.");
    }
  };

  const enableCamera = async () => {
    try {
      setPermissionError("");
      
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: "user"
        },
        audio: false
      });

      // Store stream reference
      if (streamRef.current) {
        const existingTracks = streamRef.current.getTracks();
        existingTracks.forEach(track => {
          if (track.kind === 'video') {
            track.stop();
          }
        });
      }

      if (streamRef.current) {
        // Add video track to existing stream
        const videoTrack = stream.getVideoTracks()[0];
        streamRef.current.addTrack(videoTrack);
      } else {
        streamRef.current = stream;
      }

      // Set video element source
      if (videoRef.current) {
        videoRef.current.srcObject = streamRef.current;
      }

      setCameraEnabled(true);
      setCameraStatus("success");
    } catch (error: any) {
      console.error("Camera access error:", error);
      setCameraEnabled(false);
      
      if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
        setPermissionError("Camera access denied. Please allow camera access in your browser settings.");
      } else if (error.name === "NotFoundError") {
        setPermissionError("No camera found. Please connect a camera and try again.");
      } else {
        setPermissionError("Unable to access camera. Please check your device and browser settings.");
      }
      setCameraStatus("error");
    }
  };

  const disableCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        if (track.kind === "video") {
          track.stop();
        }
      });
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraEnabled(false);
  };

  const enableMicrophone = async () => {
    try {
      setPermissionError("");
      
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true
      });

      // Add audio track to existing stream or create new one
      if (streamRef.current) {
        const audioTrack = stream.getAudioTracks()[0];
        streamRef.current.addTrack(audioTrack);
      } else {
        streamRef.current = stream;
      }

      setMicEnabled(true);
      setMicStatus("success");
    } catch (error: any) {
      console.error("Microphone access error:", error);
      setMicEnabled(false);
      
      if (error.name === "NotAllowedError" || error.name === "PermissionDeniedError") {
        setPermissionError("Microphone access denied. Please allow microphone access in your browser settings.");
      } else if (error.name === "NotFoundError") {
        setPermissionError("No microphone found. Please connect a microphone and try again.");
      } else {
        setPermissionError("Unable to access microphone. Please check your device and browser settings.");
      }
      setMicStatus("error");
    }
  };

  const disableMicrophone = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        if (track.kind === "audio") {
          track.stop();
        }
      });
    }
    setMicEnabled(false);
  };

  const handleStartInterview = () => {
    if (cameraEnabled && micEnabled && streamRef.current) {
      // Store stream in context
      setStream(streamRef.current);
      navigate(`/interview-practice/${type}/session`);
    }
  };

  const features = [
    {
      icon: Eye,
      title: "Eye Contact Analysis",
      description: "Track and improve your eye contact",
    },
    {
      icon: Volume2,
      title: "Voice Analysis",
      description: "Monitor tone, pace, and clarity",
    },
    {
      icon: MessageSquare,
      title: "Content Evaluation",
      description: "Get feedback on your answers",
    },
    {
      icon: Sparkles,
      title: "Real-time Tips",
      description: "Receive instant coaching",
    },
  ];

  const tips = type === "college"
    ? [
        "Be authentic and share your genuine interests",
        "Prepare examples of your achievements",
        "Show enthusiasm for the school",
        "Ask thoughtful questions",
      ]
    : [
        "Use the STAR method for behavioral questions",
        "Research the company beforehand",
        "Highlight relevant skills and experience",
        "Prepare questions about the role",
      ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-[#3EBFB0]/5 to-[#2B3674]/5 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#2B3674] to-[#3EBFB0] rounded-xl flex items-center justify-center shadow-lg">
              <Video className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#2B3674] to-[#3EBFB0] bg-clip-text text-transparent">
                {type === "college" ? "College" : "Job"} Interview Setup
              </h1>
              <p className="text-gray-600">
                Prepare your camera and microphone for the practice session
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Setup Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Camera Preview */}
            <Card className="border-2 border-[#2B3674]/10">
              <h3 className="text-lg font-bold text-[#2B3674] mb-4">
                Camera Preview
              </h3>
              <div className="relative bg-gray-900 rounded-xl overflow-hidden aspect-video mb-4">
                {cameraEnabled ? (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      Camera Active
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <Camera className="w-16 h-16 mb-4 text-gray-400" />
                    <p className="text-gray-400">Camera is off</p>
                    <p className="text-gray-500 text-sm mt-2">Click "Turn On" to enable</p>
                  </div>
                )}
              </div>

              {/* Permission Error */}
              {permissionError && (
                <div className="mb-4 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-red-900 mb-1">Permission Error</p>
                    <p className="text-red-700">{permissionError}</p>
                  </div>
                </div>
              )}

              {/* Device Controls */}
              <div className="space-y-4">
                {/* Camera Control */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      cameraStatus === "success" ? "bg-green-100" : "bg-gray-200"
                    }`}>
                      <Camera className={`w-5 h-5 ${
                        cameraStatus === "success" ? "text-green-600" : "text-gray-400"
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Camera</p>
                      <p className="text-sm text-gray-600">
                        {cameraStatus === "checking" && "Checking device..."}
                        {cameraStatus === "success" && cameraEnabled && "Active"}
                        {cameraStatus === "success" && !cameraEnabled && "Ready"}
                        {cameraStatus === "error" && "Not available"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => cameraEnabled ? disableCamera() : enableCamera()}
                    disabled={cameraStatus === "error"}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      cameraEnabled
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-green-500 text-white hover:bg-green-600"
                    } disabled:bg-gray-300 disabled:cursor-not-allowed`}
                  >
                    {cameraEnabled ? "Turn Off" : "Turn On"}
                  </button>
                </div>

                {/* Microphone Control */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      micStatus === "success" ? "bg-green-100" : "bg-gray-200"
                    }`}>
                      <Mic className={`w-5 h-5 ${
                        micStatus === "success" ? "text-green-600" : "text-gray-400"
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Microphone</p>
                      <p className="text-sm text-gray-600">
                        {micStatus === "checking" && "Checking device..."}
                        {micStatus === "success" && micEnabled && "Active"}
                        {micStatus === "success" && !micEnabled && "Ready"}
                        {micStatus === "error" && "Not available"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => micEnabled ? disableMicrophone() : enableMicrophone()}
                    disabled={micStatus === "error"}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      micEnabled
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-green-500 text-white hover:bg-green-600"
                    } disabled:bg-gray-300 disabled:cursor-not-allowed`}
                  >
                    {micEnabled ? "Turn Off" : "Turn On"}
                  </button>
                </div>
              </div>

              {/* Warning */}
              {(!cameraEnabled || !micEnabled) && !permissionError && (
                <div className="mt-4 flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-900 mb-1">
                      Enable Camera and Microphone
                    </p>
                    <p className="text-yellow-700">
                      Both camera and microphone must be enabled for the AI to provide accurate feedback on your interview performance.
                    </p>
                  </div>
                </div>
              )}
            </Card>

            {/* Features Preview */}
            <Card className="border-2 border-[#2B3674]/10">
              <h3 className="text-lg font-bold text-[#2B3674] mb-4">
                What We'll Analyze
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-[#3EBFB0]/5 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#2B3674] to-[#3EBFB0] rounded-lg flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-[#2B3674] mb-1">
                        {feature.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Session Info */}
            <Card className="border-2 border-[#2B3674]/10">
              <h3 className="text-lg font-bold text-[#2B3674] mb-4">
                Session Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-[#3EBFB0]/5 rounded-lg">
                  <Clock className="w-5 h-5 text-[#3EBFB0]" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Duration</p>
                    <p className="text-xs text-gray-600">~15-20 minutes</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#C8A860]/5 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-[#C8A860]" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Questions</p>
                    <p className="text-xs text-gray-600">5-7 questions</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#2B3674]/5 rounded-lg">
                  <Sparkles className="w-5 h-5 text-[#2B3674]" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Feedback</p>
                    <p className="text-xs text-gray-600">Instant & detailed</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Tips */}
            <Card className="border-2 border-[#3EBFB0]/20 bg-[#3EBFB0]/5">
              <h3 className="text-lg font-bold text-[#2B3674] mb-4">
                Quick Tips
              </h3>
              <div className="space-y-2">
                {tips.map((tip, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-[#3EBFB0] flex-shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Start Button */}
            <Button
              onClick={handleStartInterview}
              disabled={!cameraEnabled || !micEnabled}
              className="w-full bg-gradient-to-r from-[#2B3674] to-[#3EBFB0] py-6 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Interview
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewSetup;