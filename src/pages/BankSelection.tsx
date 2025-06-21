import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import BankCard, { Bank, SAMPLE_BANKS } from "@/components/BankCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  Users,
  CheckCircle2,
} from "lucide-react";

export default function BankSelection() {
  const navigate = useNavigate();
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
  };

  const handleContinue = () => {
    if (selectedBank) {
      navigate("/transaction", { state: { selectedBank } });
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const availableBanks = SAMPLE_BANKS.filter((bank) => bank.isAvailable);
  const unavailableBanks = SAMPLE_BANKS.filter((bank) => !bank.isAvailable);

  return (
    <div className="min-h-screen bg-gradient-to-br from-security-50 via-background to-financial-50">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-security-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali</span>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 security-gradient rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-security-900">SecurePay</h1>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-success-100 rounded-full">
                <CheckCircle2 className="w-5 h-5 text-success-600" />
                <span className="font-medium text-success-700">
                  Autentikasi Berhasil
                </span>
              </div>

              <h2 className="text-3xl font-bold text-security-900">
                Pilih Bank Tujuan
              </h2>

              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Silakan pilih bank yang akan digunakan untuk transaksi. Pastikan
                bank yang Anda pilih sesuai dengan rekening tujuan.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-security-900">
                Bank Tersedia
              </h3>
              <Badge
                variant="secondary"
                className="bg-success-100 text-success-700"
              >
                <Users className="w-4 h-4 mr-1" />
                {availableBanks.length} Bank
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableBanks.map((bank, index) => (
                <motion.div
                  key={bank.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <BankCard
                    bank={bank}
                    isSelected={selectedBank?.id === bank.id}
                    onSelect={handleBankSelect}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {unavailableBanks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-muted-foreground">
                  Sementara Tidak Tersedia
                </h3>
                <Badge variant="secondary">
                  {unavailableBanks.length} Bank
                </Badge>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {unavailableBanks.map((bank, index) => (
                  <motion.div
                    key={bank.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <BankCard
                      bank={bank}
                      isSelected={false}
                      onSelect={() => {}}
                      disabled
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {selectedBank && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto"
            >
              <Card className="shadow-lg border-success-200">
                <CardHeader>
                  <CardTitle className="text-center text-lg">
                    Bank Terpilih
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-success-50 rounded-lg">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: selectedBank.color }}
                    >
                      {selectedBank.logo}
                    </div>
                    <div>
                      <h4 className="font-semibold">{selectedBank.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Biaya admin: Rp{" "}
                        {selectedBank.processingFee.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={handleContinue}
                    className="w-full security-gradient text-white"
                    size="lg"
                  >
                    <span>Lanjutkan ke Transaksi</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 text-center"
          >
            <Card className="max-w-2xl mx-auto bg-security-50 border-security-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <Shield className="w-5 h-5 text-security-600" />
                  <h4 className="font-medium text-security-700">
                    Keamanan Terjamin
                  </h4>
                </div>
                <p className="text-sm text-security-600 leading-relaxed">
                  Semua transaksi dilindungi dengan enkripsi end-to-end dan
                  teknologi biometrik terdepan. Data sidik jari Anda tidak
                  disimpan di server dan hanya digunakan untuk autentikasi
                  real-time.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
