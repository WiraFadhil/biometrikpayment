import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FingerprintScanner from "@/components/FingerprintScanner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);

  const handleScanComplete = (success: boolean) => {
    if (success) {
      setTimeout(() => {
        navigate("/bank-selection");
      }, 1500);
    }
  };

  const handleScanStart = () => {
    setIsScanning(true);
  };

  return (
    <div className="h-screen bg-gradient-to-br from-security-50 via-background to-financial-50 flex flex-col">
      {/* Header */}
      <header className="relative z-10 pt-6 pb-4">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 security-gradient rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-security-900">SecurePay</h1>
              <Badge variant="secondary" className="text-xs">
                v2.0
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm">
              Sistem Pembayaran dengan Autentikasi Biometrik
            </p>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 flex items-center justify-center">
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <Card className="p-6 shadow-xl bg-white/90 backdrop-blur-sm border-security-200">
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 bg-security-100 rounded-full">
                    <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-security-700">
                      Sistem Online
                    </span>
                  </div>

                  <h2 className="text-2xl font-bold text-security-900 leading-tight">
                    Autentikasi Biometrik
                  </h2>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Letakkan jari Anda pada sensor untuk memulai proses
                    autentikasi dan pilih bank tujuan.
                  </p>
                </div>

                <FingerprintScanner
                  onScanComplete={handleScanComplete}
                  onScanStart={handleScanStart}
                  className="py-4"
                />

                <div className="text-center space-y-1">
                  <p className="text-xs text-muted-foreground">
                    🔐 Dilindungi teknologi enkripsi tingkat bank
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Mendukung sensor sidik jari fisik dan virtual
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 border-t border-security-200/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-xs text-muted-foreground"
          >
            <p>© 2024 SecurePay. Teknologi biometrik terdepan.</p>
          </motion.div>
        </div>
      </footer>

      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 security-gradient rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 financial-gradient rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      </div>
    </div>
  );
}
