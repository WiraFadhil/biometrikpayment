import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import TransactionForm from "@/components/TransactionForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Shield,
  CheckCircle2,
  Download,
  Home,
  Clock,
  CreditCard,
  Building,
} from "lucide-react";
import { Bank } from "@/components/BankCard";

interface LocationState {
  selectedBank: Bank;
}

export default function Transaction() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const [transactionComplete, setTransactionComplete] = useState(false);
  const [transactionData, setTransactionData] = useState<{
    amount: number;
    totalWithFee: number;
    transactionId: string;
    timestamp: Date;
  } | null>(null);

  if (!state?.selectedBank) {
    navigate("/bank-selection");
    return null;
  }

  const { selectedBank } = state;

  const handleTransactionConfirm = (amount: number, totalWithFee: number) => {
    const transactionId = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    setTransactionData({
      amount,
      totalWithFee,
      transactionId,
      timestamp: new Date(),
    });

    setTransactionComplete(true);
  };

  const handleCancel = () => {
    navigate("/bank-selection");
  };

  const handleBack = () => {
    navigate("/bank-selection");
  };

  const handleNewTransaction = () => {
    navigate("/");
  };

  const formatCurrency = (value: number) => {
    return `Rp ${value.toLocaleString("id-ID")}`;
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-security-50 via-background to-financial-50">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-security-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              className="flex items-center space-x-2"
              disabled={transactionComplete}
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
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!transactionComplete ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-security-900 mb-4">
                    Konfirmasi Transaksi
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Masukkan jumlah transaksi dan konfirmasi pembayaran
                  </p>
                </div>

                <TransactionForm
                  selectedBank={selectedBank}
                  onConfirm={handleTransactionConfirm}
                  onCancel={handleCancel}
                />
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center space-y-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                    className="inline-flex items-center justify-center w-20 h-20 bg-success-100 rounded-full"
                  >
                    <CheckCircle2 className="w-10 h-10 text-success-600" />
                  </motion.div>

                  <h2 className="text-3xl font-bold text-success-700">
                    Transaksi Berhasil!
                  </h2>

                  <p className="text-muted-foreground text-lg">
                    Saldo Anda telah berhasil dipotong sesuai nominal transaksi
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="max-w-md mx-auto"
                >
                  <Card className="shadow-xl border-success-200">
                    <CardHeader className="text-center space-y-4 bg-success-50">
                      <div className="flex items-center justify-center space-x-2">
                        <CreditCard className="w-5 h-5 text-success-600" />
                        <CardTitle className="text-success-700">
                          Bukti Transaksi
                        </CardTitle>
                      </div>

                      <Badge className="bg-success-100 text-success-700 hover:bg-success-100">
                        BERHASIL
                      </Badge>
                    </CardHeader>

                    <CardContent className="p-6 space-y-6">
                      <div className="text-center space-y-2">
                        <p className="text-sm text-muted-foreground">
                          ID Transaksi
                        </p>
                        <p className="font-mono text-lg font-semibold">
                          {transactionData?.transactionId}
                        </p>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Building className="w-5 h-5 text-muted-foreground" />
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground">
                              Bank Tujuan
                            </p>
                            <p className="font-medium">{selectedBank.name}</p>
                          </div>
                          <div
                            className="w-8 h-8 rounded flex items-center justify-center text-white text-xs font-bold"
                            style={{ backgroundColor: selectedBank.color }}
                          >
                            {selectedBank.logo}
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Clock className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Waktu Transaksi
                            </p>
                            <p className="font-medium">
                              {transactionData &&
                                formatDateTime(transactionData.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Jumlah transaksi
                          </span>
                          <span className="font-medium">
                            {transactionData &&
                              formatCurrency(transactionData.amount)}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Biaya admin
                          </span>
                          <span className="font-medium">
                            {formatCurrency(selectedBank.processingFee)}
                          </span>
                        </div>

                        <Separator />

                        <div className="flex justify-between text-lg font-semibold">
                          <span>Total dipotong</span>
                          <span className="text-destructive">
                            -
                            {transactionData &&
                              formatCurrency(transactionData.totalWithFee)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            const element = document.createElement("a");
                            const file = new Blob(
                              [
                                `BUKTI TRANSAKSI SECUREPAY\n\n` +
                                  `ID Transaksi: ${transactionData?.transactionId}\n` +
                                  `Bank: ${selectedBank.name}\n` +
                                  `Jumlah: ${transactionData && formatCurrency(transactionData.amount)}\n` +
                                  `Biaya Admin: ${formatCurrency(selectedBank.processingFee)}\n` +
                                  `Total: ${transactionData && formatCurrency(transactionData.totalWithFee)}\n` +
                                  `Waktu: ${transactionData && formatDateTime(transactionData.timestamp)}\n\n` +
                                  `Terima kasih telah menggunakan SecurePay!`,
                              ],
                              { type: "text/plain" },
                            );
                            element.href = URL.createObjectURL(file);
                            element.download = `receipt-${transactionData?.transactionId}.txt`;
                            document.body.appendChild(element);
                            element.click();
                            document.body.removeChild(element);
                          }}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Unduh Bukti Transaksi
                        </Button>

                        <Button
                          onClick={handleNewTransaction}
                          className="w-full security-gradient text-white"
                        >
                          <Home className="w-4 h-4 mr-2" />
                          Transaksi Baru
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="max-w-2xl mx-auto"
                >
                  <Card className="bg-security-50 border-security-200">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-security-600">
                        🔒 Transaksi telah dicatat dengan aman. Bukti transaksi
                        ini dapat digunakan sebagai referensi pembayaran yang
                        sah.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
