import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Fingerprint, CheckCircle, AlertCircle } from "lucide-react";

interface FingerprintScannerProps {
  onScanComplete: (success: boolean) => void;
  onScanStart?: () => void;
  className?: string;
  disabled?: boolean;
}

type ScanStatus = "idle" | "scanning" | "success" | "error";

export default function FingerprintScanner({
  onScanComplete,
  onScanStart,
  className,
  disabled = false,
}: FingerprintScannerProps) {
  const [scanStatus, setScanStatus] = useState<ScanStatus>("idle");
  const [progress, setProgress] = useState(0);

  const startScan = () => {
    if (disabled || scanStatus === "scanning") return;

    setScanStatus("scanning");
    setProgress(0);
    onScanStart?.();

    // Simulate scanning progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Simulate success/failure (90% success rate)
          const success = Math.random() > 0.1;
          setScanStatus(success ? "success" : "error");

          setTimeout(() => {
            onScanComplete(success);
            if (!success) {
              setScanStatus("idle");
              setProgress(0);
            }
          }, 1000);

          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const reset = () => {
    setScanStatus("idle");
    setProgress(0);
  };

  useEffect(() => {
    if (scanStatus === "error") {
      const timeout = setTimeout(reset, 2000);
      return () => clearTimeout(timeout);
    }
  }, [scanStatus]);

  return (
    <div className={cn("flex flex-col items-center space-y-6", className)}>
      {/* Scanner Area */}
      <div className="relative">
        {/* Pulse rings for scanning state */}
        <AnimatePresence>
          {scanStatus === "scanning" && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border-2 border-warning-400"
                  initial={{ scale: 0.8, opacity: 1 }}
                  animate={{ scale: 2.4, opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeOut",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Main scanner button */}
        <motion.button
          onClick={startScan}
          disabled={disabled || scanStatus === "scanning"}
          className={cn(
            "relative w-32 h-32 rounded-full border-4 transition-all duration-300",
            "flex items-center justify-center",
            "focus:outline-none focus:ring-4 focus:ring-offset-4",
            {
              "border-security-300 bg-security-50 hover:bg-security-100 focus:ring-security-200":
                scanStatus === "idle",
              "border-warning-400 bg-warning-50 cursor-not-allowed":
                scanStatus === "scanning",
              "border-success-400 bg-success-50": scanStatus === "success",
              "border-destructive bg-destructive/5": scanStatus === "error",
              "opacity-50 cursor-not-allowed": disabled,
            },
          )}
          whileHover={scanStatus === "idle" && !disabled ? { scale: 1.05 } : {}}
          whileTap={scanStatus === "idle" && !disabled ? { scale: 0.95 } : {}}
        >
          {/* Progress ring */}
          {scanStatus === "scanning" && (
            <svg
              className="absolute inset-0 w-full h-full -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="46"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-muted"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="46"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                className="text-warning-500"
                strokeDasharray={`${2 * Math.PI * 46}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 46 }}
                animate={{
                  strokeDashoffset: (1 - progress / 100) * 2 * Math.PI * 46,
                }}
                transition={{ duration: 0.1 }}
              />
            </svg>
          )}

          {/* Icon */}
          <motion.div
            className="relative z-10"
            animate={{
              scale: scanStatus === "scanning" ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 1,
              repeat: scanStatus === "scanning" ? Infinity : 0,
            }}
          >
            {scanStatus === "success" ? (
              <CheckCircle className="w-12 h-12 text-success-600" />
            ) : scanStatus === "error" ? (
              <AlertCircle className="w-12 h-12 text-destructive" />
            ) : (
              <Fingerprint
                className={cn("w-12 h-12", {
                  "text-security-600": scanStatus === "idle",
                  "text-warning-600": scanStatus === "scanning",
                })}
              />
            )}
          </motion.div>
        </motion.button>
      </div>

      {/* Status Text */}
      <motion.div
        className="text-center space-y-2"
        layout
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
      >
        <h3 className="text-xl font-semibold">
          {scanStatus === "idle" && "Letakkan jari Anda"}
          {scanStatus === "scanning" && "Memindai sidik jari..."}
          {scanStatus === "success" && "Autentikasi berhasil!"}
          {scanStatus === "error" && "Gagal memindai"}
        </h3>

        <p className="text-muted-foreground">
          {scanStatus === "idle" && "Sentuh sensor untuk memulai autentikasi"}
          {scanStatus === "scanning" && `Progress: ${Math.round(progress)}%`}
          {scanStatus === "success" && "Mengarahkan ke pemilihan bank..."}
          {scanStatus === "error" && "Silakan coba lagi"}
        </p>
      </motion.div>

      {/* Progress bar for scanning */}
      {scanStatus === "scanning" && (
        <motion.div
          className="w-64 h-2 bg-muted rounded-full overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <motion.div
            className="h-full bg-warning-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </motion.div>
      )}
    </div>
  );
}
