import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
 Eye,
 Volume2,
 MessageSquare,
 CheckCircle,
 AlertTriangle,
 TrendingUp,
 Camera,
 Mic,
 X,
 Sparkles,
} from "lucide-react";
import Button from "../../shared/ui/Button";
import Card from "../../shared/ui/Card";
import { useMediaStream } from "../../../contexts/MediaStreamContext";
import { eventService } from "../../../services/eventService";
import { EVENT_TYPES, FEATURES } from "../../../lib/constants";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { supabase } from "../../../lib/supabase";

const AIInterviewSession: React.FC = () => {
 const { type } = useParams<{ type: "college" | "job" }>();
 const navigate = useNavigate();
 const { stream, stopStream } = useMediaStream();
 const videoRef = useRef<HTMLVideoElement>(null);
 
 const [currentQuestion, setCurrentQuestion] = useState(0);
 const [isAnswering, setIsAnswering] = useState(false);
 const [timer, setTimer] = useState(0);
 const [showExitModal, setShowExitModal] = useState(false);
 const [isProcessing, setIsProcessing] = useState(false);

 // Real-time tracking state
 const [transcript, setTranscript] = useState("");
 const [fillerWords, setFillerWords] = useState(0);
 const [eyeContactScore, setEyeContactScore] = useState(100);

 // MediaPipe FaceLandmarker ref
 const faceLandmarkerRef = useRef<FaceLandmarker | null>(null);
 const lastVideoTimeRef = useRef<number>(-1);
 const requestRef = useRef<number>(0);
 const totalFramesRef = useRef<number>(0);
 const lookingFramesRef = useRef<number>(0);

 // Speech Recognition ref
 const recognitionRef = useRef<any>(null);

 const questions = type === "college"
 ? [
 "Tell me about yourself and why you're interested in our college.",
 "What are your academic interests and how do you plan to pursue them here?",
 "Describe a challenge you've overcome and what you learned from it.",
 "How have you contributed to your community?",
 "What questions do you have for us about our college?",
 ]
 : [
 "Tell me about yourself and your background.",
 "Why are you interested in this position?",
 "Describe a time when you faced a challenge at work or school. How did you handle it?",
 "What are your greatest strengths and how would they benefit our team?",
 "Where do you see yourself in 5 years?",
 ];

 // Initialize MediaPipe FaceLandmarker
 useEffect(() => {
 const initializeMediaPipe = async () => {
 try {
 const filesetResolver = await FilesetResolver.forVisionTasks(
 "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
 );
 const faceLandmarker = await FaceLandmarker.createFromOptions(
 filesetResolver,
 {
 baseOptions: {
 modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
 delegate: "GPU"
 },
 outputFaceBlendshapes: true,
 outputFacialTransformationMatrixes: true,
 runningMode: "VIDEO",
 numFaces: 1,
 }
 );
 faceLandmarkerRef.current = faceLandmarker;
 } catch (err) {
 console.error("Failed to initialize FaceLandmarker", err);
 }
 };
 initializeMediaPipe();
 
 return () => {
 if (faceLandmarkerRef.current) {
 faceLandmarkerRef.current.close();
 }
 cancelAnimationFrame(requestRef.current);
 };
 }, []);

 // Set video source from context
 useEffect(() => {
 if (videoRef.current && stream) {
 videoRef.current.srcObject = stream;
 }
 }, [stream]);

 // Video processing loop for Eye Contact tracking
 const predict = () => {
 if (videoRef.current && faceLandmarkerRef.current && isAnswering) {
 const video = videoRef.current;
 const startTimeMs = performance.now();
 
 if (lastVideoTimeRef.current !== video.currentTime) {
 lastVideoTimeRef.current = video.currentTime;
 const results = faceLandmarkerRef.current.detectForVideo(video, startTimeMs);
 
 totalFramesRef.current += 1;

 if (results.facialTransformationMatrixes && results.facialTransformationMatrixes.length > 0) {
 // Extract basic head pose from transformation matrix
 // Matrix index 2 is approx pitch, index 6 is yaw
 const matrix = results.facialTransformationMatrixes[0].data;
 const yaw = Math.asin(-matrix[2]);
 const pitch = Math.atan2(matrix[6], matrix[10]);

 // Simple thresholding: if absolute pitch and yaw are small, they are looking forward
 if (Math.abs(yaw) < 0.3 && Math.abs(pitch) < 0.3) {
 lookingFramesRef.current += 1;
 }
 }
 
 // Update eye contact score
 if (totalFramesRef.current > 0 && totalFramesRef.current % 15 === 0) { // update UI every ~15 frames
 const score = (lookingFramesRef.current / totalFramesRef.current) * 100;
 setEyeContactScore(Math.round(score));
 }
 }
 }
 
 if (isAnswering) {
 requestRef.current = requestAnimationFrame(predict);
 }
 };

 useEffect(() => {
 if (isAnswering) {
 requestRef.current = requestAnimationFrame(predict);
 } else {
 cancelAnimationFrame(requestRef.current);
 }
 return () => cancelAnimationFrame(requestRef.current);
 }, [isAnswering]);

 // Setup Speech Recognition
 useEffect(() => {
 // @ts-ignore
 const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
 if (SpeechRecognition) {
 const recognition = new SpeechRecognition();
 recognition.continuous = true;
 recognition.interimResults = true;
 
 recognition.onresult = (event: any) => {
 let currentTranscript = "";
 for (let i = event.resultIndex; i < event.results.length; ++i) {
 currentTranscript += event.results[i][0].transcript;
 }
 setTranscript(currentTranscript);
 
 // Count filler words
 const fillerMatches = currentTranscript.match(/\b(um|uh|like|you know)\b/gi);
 if (fillerMatches) {
 setFillerWords(fillerMatches.length);
 }
 };

 recognition.onerror = (event: any) => {
 console.error("Speech recognition error", event.error);
 };

 recognitionRef.current = recognition;
 } else {
 console.warn("Speech Recognition not supported in this browser.");
 }
 }, []);

 // Timer
 useEffect(() => {
 if (isAnswering) {
 const interval = setInterval(() => {
 setTimer((prev) => prev + 1);
 }, 1000);
 return () => clearInterval(interval);
 }
 }, [isAnswering]);

 const handleStartAnswer = () => {
 setIsAnswering(true);
 setTimer(0);
 setTranscript("");
 setFillerWords(0);
 setEyeContactScore(100);
 totalFramesRef.current = 0;
 lookingFramesRef.current = 0;
 
 if (recognitionRef.current) {
 try {
 recognitionRef.current.start();
 } catch (e) {
 console.error("Could not start speech recognition:", e);
 }
 }
 };

 const handleStopAnswer = async () => {
 setIsAnswering(false);
 setIsProcessing(true);
 
 if (recognitionRef.current) {
 recognitionRef.current.stop();
 }
 
 // Calculate local metrics
 const finalPace = timer > 0 ? Math.round((transcript.split(" ").length / timer) * 60) : 0; 
 // Normalized pace score (ideal pace is ~130-150 wpm)
 let paceScore = 100;
 if (finalPace < 100) paceScore = Math.max(0, 100 - (100 - finalPace));
 if (finalPace > 180) paceScore = Math.max(0, 100 - (finalPace - 180));
 
 // Send to Edge Function to score the transcript using Groq
 let confidenceScore = 50;
 let voiceClarityScore = 50;
 let aiFeedback = "No feedback generated.";
 
 try {
 if (transcript.trim().length > 5) {
 const { data, error } = await supabase.functions.invoke('score-interview', {
 body: { question: questions[currentQuestion], transcript }
 });
 
 if (error) throw error;
 
 if (data && data.confidence !== undefined) {
 confidenceScore = data.confidence;
 voiceClarityScore = data.voiceClarity;
 aiFeedback = data.feedback || aiFeedback;
 }
 }
 } catch (err) {
 console.error("Error scoring interview with AI", err);
 }

 const finalMetrics = {
 eyeContact: eyeContactScore,
 voiceClarity: voiceClarityScore,
 pace: paceScore,
 confidence: confidenceScore,
 fillerWords: fillerWords,
 feedback: aiFeedback,
 };

 // Calculate weakest area
 let weakestArea = 'eyeContact';
 let lowestScore = finalMetrics.eyeContact;
 
 Object.entries(finalMetrics).forEach(([key, value]) => {
 if (key !== 'fillerWords' && value < lowestScore) {
 lowestScore = value;
 weakestArea = key;
 }
 });

 // Log REAL completion event to database
 await eventService.logEvent(
 EVENT_TYPES.INTERVIEW_COMPLETED,
 {
 ...finalMetrics,
 weakest_area: weakestArea,
 interview_type: type,
 transcript_length: transcript.length
 },
 FEATURES.PREPARE_FUTURE
 );
 
 setTimeout(async () => {
 setIsProcessing(false);
 if (currentQuestion < questions.length - 1) {
 setCurrentQuestion(currentQuestion + 1);
 setTranscript(""); 
 } else {
 // go to report
 navigate(`/interview-practice/${type}/report`, {
 state: { finalMetrics: finalMetrics, totalTime: timer },
 });
 stopStream();
 }
 }, 1000);
 };

 const handleExit = () => {
 stopStream();
 navigate("/student-dashboard");
 };

 const formatTime = (seconds: number) => {
 const mins = Math.floor(seconds / 60);
 const secs = seconds % 60;
 return `${mins}:${secs.toString().padStart(2, "0")}`;
 };

 const getMetricColor = (value: number) => {
 if (value >= 80) return "text-green-600";
 if (value >= 60) return "text-yellow-600";
 return "text-red-600";
 };

 const getMetricBg = (value: number) => {
 if (value >= 80) return "bg-green-500";
 if (value >= 60) return "bg-yellow-500";
 return "bg-red-500";
 };

 return (
 <div className="min-h-screen bg-gradient-to-br from-brand-mist/30 via-white to-brand-mist/30 p-6">
 <div className="max-w-7xl mx-auto">
 {/* Header */}
 <div className="mb-6 flex items-center justify-between">
 <div className="flex items-center gap-3">
 <div className="w-10 h-10 bg-gradient-to-br from-brand-ink to-brand-darkgreen rounded-lg flex items-center justify-center">
 <Camera className="w-6 h-6 text-white" />
 </div>
 <div>
 <h1 className="text-2xl font-bold text-brand-ink">
 AI Interview in Progress
 </h1>
 <p className="text-sm text-brand-slate">
 Question {currentQuestion + 1} of {questions.length}
 </p>
 </div>
 </div>
 <Button
 variant="outline"
 onClick={() => setShowExitModal(true)}
 className="border-red-200 text-red-600 hover:bg-red-50"
 >
 <X className="w-4 h-4 mr-2" />
 Exit Interview
 </Button>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 {/* Main Interview Area */}
 <div className="lg:col-span-2 space-y-6">
 {/* Video Feed */}
 <Card className="border-2 border-brand-slate/10">
 <div className="relative bg-brand-ink rounded-xl overflow-hidden aspect-video">
 {/* Real video feed */}
 {stream ? (
 <video
 ref={videoRef}
 autoPlay
 playsInline
 muted
 className="absolute inset-0 w-full h-full object-cover"
 />
 ) : (
 <div className="absolute inset-0 flex items-center justify-center">
 <div className="w-40 h-40 bg-gradient-to-br from-brand-ink to-brand-darkgreen rounded-full animate-pulse"></div>
 </div>
 )}
 
 {/* Recording indicator */}
 <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
 <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
 Recording
 </div>

 {/* Timer */}
 {isAnswering && (
 <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg font-mono text-lg">
 {formatTime(timer)}
 </div>
 )}

 {/* Live metrics overlay */}
 <div className="absolute bottom-4 left-4 right-4 flex gap-2">
 <div className="flex-1 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
 <div className="flex items-center gap-2 text-white text-xs">
 <Eye className="w-4 h-4" />
 <span className="font-medium">Live Eye Contact</span>
 <span className={`ml-auto ${getMetricColor(eyeContactScore)}`}>
 {eyeContactScore}%
 </span>
 </div>
 </div>
 <div className="flex-1 bg-black/70 backdrop-blur-sm rounded-lg px-3 py-2">
 <div className="flex items-center gap-2 text-white text-xs">
 <Volume2 className="w-4 h-4" />
 <span className="font-medium">Analyzing Voice...</span>
 </div>
 </div>
 </div>
 </div>
 </Card>

 {/* Question Card */}
 <Card className="border-2 border-brand-neon/20 bg-brand-mist">
 <div className="flex items-start gap-4">
 <div className="w-12 h-12 bg-gradient-to-br from-brand-ink to-brand-darkgreen rounded-lg flex items-center justify-center flex-shrink-0">
 <MessageSquare className="w-6 h-6 text-white" />
 </div>
 <div className="flex-1">
 <h3 className="text-lg font-bold text-brand-ink mb-3">
 Question {currentQuestion + 1}
 </h3>
 <p className="text-brand-slate text-lg leading-relaxed mb-6">
 {questions[currentQuestion]}
 </p>
 
 {!isAnswering && !isProcessing ? (
 <Button
 onClick={handleStartAnswer}
 className="bg-gradient-to-r from-brand-ink to-brand-darkgreen"
 >
 <Mic className="w-4 h-4 mr-2" />
 Start Answering
 </Button>
 ) : isAnswering ? (
 <Button
 onClick={handleStopAnswer}
 className="bg-red-500 hover:bg-red-600"
 >
 Stop & Score Transcript
 </Button>
 ) : (
 <Button disabled className="bg-brand-slate/50">
 Processing with AI...
 </Button>
 )}
 {/* Debug Transcript Output */}
 <div className="mt-4 p-3 bg-white/50 rounded text-sm text-brand-slate italic h-24 overflow-y-auto">
 {transcript || "Speak to see your transcript..."}
 </div>
 </div>
 </div>
 </Card>

 {/* Real-time Tips */}
 {isAnswering && (
 <Card className="border-2 border-[#C8A860]/20 bg-[#C8A860]/5 animate-fade-in">
 <div className="flex items-start gap-3">
 <Sparkles className="w-5 h-5 text-[#C8A860] flex-shrink-0 mt-1" />
 <div>
 <h4 className="font-semibold text-brand-ink mb-2">
 Real-time Tip
 </h4>
 <p className="text-sm text-brand-slate">
 {eyeContactScore < 70 && "Try to maintain more eye contact with the camera."}
 {eyeContactScore >= 70 && "Excellent eye contact! Keep up the confident delivery."}
 </p>
 </div>
 </div>
 </Card>
 )}
 </div>

 {/* Metrics Sidebar */}
 <div className="space-y-6">
 {/* Performance Metrics */}
 <Card className="border-2 border-brand-slate/10">
 <h3 className="text-lg font-bold text-brand-ink mb-4">
 Live Performance Metrics
 </h3>
 <p className="text-xs text-brand-slate mb-4">Pace, Confidence, and Voice Clarity are scored by AI after you finish answering.</p>
 <div className="space-y-4">
 {/* Eye Contact */}
 <div>
 <div className="flex items-center justify-between mb-2">
 <div className="flex items-center gap-2">
 <Eye className="w-4 h-4 text-brand-darkgreen" />
 <span className="text-sm font-medium">Eye Contact</span>
 </div>
 <span className={`text-sm font-bold ${getMetricColor(eyeContactScore)}`}>
 {eyeContactScore}%
 </span>
 </div>
 <div className="w-full rounded-full h-2 bg-brand-slate/10">
 <div
 className={`h-2 rounded-full transition-all duration-500 ${getMetricBg(eyeContactScore)}`}
 style={{ width: `${eyeContactScore}%` }}
 ></div>
 </div>
 </div>

 {/* Filler Words */}
 <div className="pt-4 border-t border-brand-slate/10">
 <div className="flex items-center justify-between">
 <div className="flex items-center gap-2">
 <AlertTriangle className="w-4 h-4 text-yellow-600" />
 <span className="text-sm font-medium">Live Filler Words</span>
 </div>
 <span className="text-sm font-bold text-yellow-600">
 {fillerWords}
 </span>
 </div>
 <p className="text-xs text-brand-slate mt-1">
 "um", "uh", "like", "you know"
 </p>
 </div>
 </div>
 </Card>

 {/* Progress */}
 <Card className="border-2 border-[#C8A860]/20 bg-[#C8A860]/5">
 <h3 className="text-lg font-bold text-brand-ink mb-4">
 Interview Progress
 </h3>
 <div className="space-y-2">
 {questions.map((_, idx) => (
 <div
 key={idx}
 className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
 idx < currentQuestion
 ? "bg-green-100 border border-green-300"
 : idx === currentQuestion
 ? "bg-[#3EBFB0]/20 border-2 border-[#3EBFB0]"
 : "bg-brand-slate/10 border border-brand-slate/10"
 }`}
 >
 {idx < currentQuestion ? (
 <CheckCircle className="w-5 h-5 text-green-600" />
 ) : (
 <div className={`w-5 h-5 rounded-full border-2 ${
 idx === currentQuestion ? "border-[#3EBFB0]" : "border-brand-slate/20"
 }`}></div>
 )}
 <span className={`text-sm font-medium ${
 idx === currentQuestion ? "text-brand-ink" : "text-brand-slate"
 }`}>
 Question {idx + 1}
 </span>
 </div>
 ))}
 </div>
 </Card>
 </div>
 </div>

 {/* Exit Confirmation Modal */}
 {showExitModal && (
 <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
 <Card className="max-w-md w-full">
 <h3 className="text-xl font-bold text-brand-ink mb-3">
 Exit Interview?
 </h3>
 <p className="text-brand-slate mb-6">
 Are you sure you want to exit? Your progress will not be saved.
 </p>
 <div className="flex gap-3">
 <Button
 variant="outline"
 onClick={() => setShowExitModal(false)}
 className="flex-1"
 >
 Continue Interview
 </Button>
 <Button
 onClick={handleExit}
 className="flex-1 bg-red-500 hover:bg-red-600"
 >
 Exit
 </Button>
 </div>
 </Card>
 </div>
 )}
 </div>
 </div>
 );
};

export default AIInterviewSession;