import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CreditCard, CheckCircle2 } from "lucide-react";
import { Bank } from "./BankCard";

interface TransactionFormProps {
  selectedBank: Bank;
  onConfirm: (amount: number, totalWithFee: number) => void;
  onCancel: () => void;
  className?: string;
}

export default function TransactionForm({
  selectedBank,
  onConfirm,
  onCancel,
  className,
}: TransactionFormProps) {
  const [amount, setAmount] = useState("");
  const [isValidAmount, setIsValidAmount] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const numericAmount = parseFloat(amount.replace(/[^0-9]/g, "")) || 0;
  const totalWithFee = numericAmount + selectedBank.processingFee;
  const minAmount = 10000; // Minimum Rp 10,000
  const maxAmount = 5000000; // Maximum Rp 5,000,000

  useEffect(() => {
    setIsValidAmount(numericAmount >= minAmount && numericAmount <= maxAmount);
  }, [numericAmount]);

  const formatCurrency = (value: number) => {
    return `Rp ${value.toLocaleString("id-ID")}`;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 10) {
      // Limit input length
      setAmount(value);
    }
  };

  const handleConfirm = async () => {
    if (!isValidAmount) return;

    setIsProcessing(true);

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    onConfirm(numericAmount, totalWithFee);
    setIsProcessing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("max-w-md mx-auto", className)}
    >
      <Card className="shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div
            className="w-16 h-16 rounded-lg mx-auto flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: selectedBank.color }}
          >
            {selectedBank.logo}
          </div>
          <div>
            <CardTitle className="text-xl">{selectedBank.name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Masukkan jumlah transaksi
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium">
              Jumlah Transaksi
            </Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                id="amount"
                type="text"
                value={amount ? formatCurrency(numericAmount) : ""}
                onChange={handleAmountChange}
                placeholder="Rp 0"
                className={cn("pl-10 text-lg font-medium", {
                  "border-destructive": amount && !isValidAmount,
                  "border-success-500": amount && isValidAmount,
                })}
              />
            </div>

            {/* Amount validation feedback */}
            {amount && !isValidAmount && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex items-center space-x-2 text-sm text-destructive"
              >
                <AlertCircle className="w-4 h-4" />
                <span>
                  {numericAmount < minAmount
                    ? `Minimum transaksi ${formatCurrency(minAmount)}`
                    : `Maksimum transaksi ${formatCurrency(maxAmount)}`}
                </span>
              </motion.div>
            )}
          </div>

          {/* Transaction Summary */}
          {isValidAmount && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-3 p-4 bg-muted/50 rounded-lg"
            >
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                Rincian Transaksi
              </h4>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Jumlah transaksi</span>
                  <span className="font-medium">
                    {formatCurrency(numericAmount)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Biaya admin</span>
                  <span className="font-medium">
                    {formatCurrency(selectedBank.processingFee)}
                  </span>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatCurrency(totalWithFee)}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Quick Amount Buttons */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Jumlah Cepat</Label>
            <div className="grid grid-cols-3 gap-2">
              {[50000, 100000, 200000].map((quickAmount) => (
                <Button
                  key={quickAmount}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(quickAmount.toString())}
                  className="text-xs"
                >
                  {formatCurrency(quickAmount).replace("Rp ", "")}
                </Button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1"
              disabled={isProcessing}
            >
              Batal
            </Button>

            <Button
              onClick={handleConfirm}
              disabled={!isValidAmount || isProcessing}
              className="flex-1 security-gradient text-white"
            >
              {isProcessing ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Konfirmasi
                </>
              )}
            </Button>
          </div>

          {/* Security Notice */}
          <div className="text-xs text-muted-foreground text-center space-y-1">
            <p>🔒 Transaksi dilindungi enkripsi end-to-end</p>
            <p>Saldo akan otomatis terpotong setelah konfirmasi</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
