import React, { createContext, useContext, useState, useRef, ReactNode } from "react";

interface MediaStreamContextType {
  stream: MediaStream | null;
  setStream: (stream: MediaStream | null) => void;
  stopStream: () => void;
}

const MediaStreamContext = createContext<MediaStreamContextType | undefined>(undefined);

export const MediaStreamProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const streamRef = useRef<MediaStream | null>(null);
  const [, forceUpdate] = useState({});

  const setStream = (stream: MediaStream | null) => {
    streamRef.current = stream;
    forceUpdate({});
  };

  const stopStream = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      forceUpdate({});
    }
  };

  return (
    <MediaStreamContext.Provider value={{ 
      stream: streamRef.current, 
      setStream, 
      stopStream 
    }}>
      {children}
    </MediaStreamContext.Provider>
  );
};

export const useMediaStream = () => {
  const context = useContext(MediaStreamContext);
  if (!context) {
    throw new Error("useMediaStream must be used within MediaStreamProvider");
  }
  return context;
};