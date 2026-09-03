# SPEC-4: Real AI Interview Pipeline

## Objective
Replace placeholder/simulated interview metrics with a true, real-time telemetry analysis pipeline for the AI Interview Prep feature.

## Core Technologies
- **Speech Recognition**: Browser-native `window.webkitSpeechRecognition` or `window.SpeechRecognition`.
- **Eye-Contact/Head Pose**: MediaPipe Tasks Vision (`@mediapipe/tasks-vision`) `FaceLandmarker`.
- **Content Scoring**: Groq (Llama 3) via Supabase Edge Function.

## Architecture

### 1. Real-Time Frontend Processing
- **Audio/Transcript**: As the user speaks, the browser's native Web Speech API captures interim and final transcripts.
  - A regex engine scans the incoming transcript buffer for filler words ("um", "uh", "like") to increment a counter.
  - Pace (WPM) is calculated continuously based on the transcript word count and a session timer.
- **Video/Vision**: The webcam stream is passed to MediaPipe via a `requestAnimationFrame` loop.
  - `FaceLandmarker` extracts the facial transformation matrix.
  - Head yaw and pitch are calculated. If the user's head is pointing within an acceptable threshold towards the camera, it is recorded as a "looking frame."
  - Eye Contact % is derived from `looking frames / total frames`.

### 2. Post-Processing & Backend Analysis
- When the user finishes an answer, the microphone and video analysis loops pause.
- The raw transcript text and the original question are sent to a dedicated Supabase Edge Function (`score-interview`).
- The Edge Function prompts Groq to analyze the transcript and return a structured JSON evaluation:
  - `confidence`: Int 0-100 (vocabulary authority)
  - `voiceClarity`: Int 0-100 (coherence)
  - `feedback`: String (qualitative advice)
- The frontend merges the local real-time metrics (Pace, Eye Contact, Filler Words) with the AI backend metrics.

### 3. Data Integrity & Logging
- The combined, accurate metrics payload is passed to `eventService.logEvent()`.
- This ensures the `events` table in Supabase contains legitimate telemetry for downstream features (like the Chat Interlinking Engine, per SPEC-2) to read and reference in future interactions.
