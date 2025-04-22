
import React from "react";
import { Button } from "@/components/ui/button";

export type ErrorHandlingComponentProps = {
  message: string;
  errorType: "validation" | "network";
  onRetry?: () => void;
  // รองรับ message จาก React Hook Form (สามารถส่งมาเป็น children)
  children?: React.ReactNode;
};

const getIcon = (errorType: "validation" | "network") => {
  if (errorType === "validation") {
    return (
      <svg
        className="w-6 h-6 text-red-500 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m9.86-6.36l-1.42-2.42A9 9 0 1012 21l4.58-2.64 2.42-1.42A9 9 0 0021.86 8.64z" />
      </svg>
    );
  }
  // network
  return (
    <svg
      className="w-6 h-6 text-orange-500 shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m2 4h.017M17 21H7a2 2 0 01-2-2V7a2 2 0 012-2h2l2-2 2 2h2a2 2 0 012 2v12a2 2 0 01-2 2z" />
    </svg>
  );
};

export const ErrorHandlingComponent: React.FC<ErrorHandlingComponentProps> = ({
  message,
  errorType,
  onRetry,
  children
}) => {
  return (
    <div className={`
      flex flex-col items-center justify-center max-w-md mx-auto p-6 rounded-lg shadow-md
      bg-white border border-red-200 my-6
      ${errorType === 'network' ? "bg-orange-50 border-orange-200" : "bg-red-50 border-red-200"}
    `}>
      <div className="flex items-center gap-3 mb-3">
        {getIcon(errorType)}
        <span className="font-semibold text-lg text-red-700">
          {errorType === 'validation' ? 'Validation Error' : 'Network Error'}
        </span>
      </div>
      <div className="w-full text-center text-gray-600 mb-4 text-base">
        {message}
        {children}
      </div>
      {errorType === 'network' && onRetry && (
        <Button onClick={onRetry} variant="destructive">
          ลองใหม่อีกครั้ง
        </Button>
      )}
    </div>
  );
};

export default ErrorHandlingComponent;
