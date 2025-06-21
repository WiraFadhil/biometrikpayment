import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FingerprintScanner from "@/components/FingerprintScanner";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Users, Clock } from "lucide-react";

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

  const features = [
    {
      icon: Shield,
      title: "Keamanan Biometrik",
      description: "Autentikasi sidik jari untuk keamanan maksimal",
    },
    {
      icon: Zap,
      title: "Transaksi Cepat",
      description: "Proses pembayaran dalam hitungan detik",
    },
    {
      icon: Users,
      title: "Multi Bank",
      description: "Mendukung berbagai bank di Indonesia",
    },
    {
      icon: Clock,
      title: "24/7 Tersedia",
      description: "Layanan tersedia kapan saja",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-security-50 via-background to-financial-50">
      {/* Header */}
      <header className="relative z-10 pt-8 pb-4">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 security-gradient rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-security-900">
                SecurePay
              </h1>
              <Badge variant="secondary" className="text-xs">
                v2.0
              </Badge>
            </div>
            <p className="text-muted-foreground text-lg">
              Sistem Pembayaran dengan Autentikasi Biometrik
            </p>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Scanner */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <Card className="p-8 shadow-xl bg-white/80 backdrop-blur-sm border-security-200">
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 bg-security-100 rounded-full">
                      <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-security-700">
                        Sistem Online
                      </span>
                    </div>

                    <h2 className="text-3xl font-bold text-security-900 leading-tight">
                      Autentikasi Biometrik untuk
                      <span className="text-financial-600">
                        {" "}
                        Pembayaran Aman
                      </span>
                    </h2>

                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Letakkan jari Anda pada sensor untuk memulai proses
                      autentikasi. Setelah terverifikasi, pilih bank dan
                      masukkan nominal transaksi.
                    </p>
                  </div>

                  <FingerprintScanner
                    onScanComplete={handleScanComplete}
                    onScanStart={handleScanStart}
                    className="py-6"
                  />

                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">
                      🔐 Dilindungi teknologi enkripsi tingkat bank
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Mendukung sensor sidik jari fisik dan virtual
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Column - Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-security-900">
                  Mengapa Memilih SecurePay?
                </h3>
                <p className="text-muted-foreground">
                  Platform pembayaran terdepan dengan teknologi biometrik untuk
                  keamanan dan kemudahan transaksi yang optimal.
                </p>
              </div>

              <div className="grid gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <Card className="p-6 hover:shadow-md transition-shadow border-security-100">
                      <CardContent className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 financial-gradient rounded-lg flex items-center justify-center">
                            <feature.icon className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-security-900">
                            {feature.title}
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-security-200">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-sm text-muted-foreground"
          >
            <p>© 2024 SecurePay. Semua hak dilindungi undang-undang.</p>
            <p className="mt-1">
              Didukung oleh teknologi biometrik terdepan untuk keamanan optimal.
            </p>
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
