import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

export interface Bank {
  id: string;
  name: string;
  shortName: string;
  color: string;
  logo: string;
  description: string;
  isAvailable: boolean;
  processingFee: number;
}

interface BankCardProps {
  bank: Bank;
  isSelected: boolean;
  onSelect: (bank: Bank) => void;
  disabled?: boolean;
  className?: string;
}

export default function BankCard({
  bank,
  isSelected,
  onSelect,
  disabled = false,
  className,
}: BankCardProps) {
  return (
    <motion.div
      whileHover={!disabled ? { scale: 1.02, y: -2 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2 }}
      className={className}
    >
      <Card
        className={cn(
          "relative cursor-pointer transition-all duration-300 overflow-hidden",
          "hover:shadow-lg border-2",
          {
            "border-success-500 ring-2 ring-success-200 shadow-lg": isSelected,
            "border-border hover:border-security-300":
              !isSelected && bank.isAvailable,
            "border-muted opacity-50 cursor-not-allowed":
              !bank.isAvailable || disabled,
          },
        )}
        onClick={() => {
          if (bank.isAvailable && !disabled) {
            onSelect(bank);
          }
        }}
      >
        {/* Selection indicator */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute top-3 right-3 z-10"
          >
            <CheckCircle className="w-6 h-6 text-success-600 bg-white rounded-full" />
          </motion.div>
        )}

        {/* Bank color accent */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ backgroundColor: bank.color }}
        />

        <CardContent className="p-6 space-y-4">
          {/* Bank logo and name */}
          <div className="flex items-center space-x-4">
            <div
              className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: bank.color }}
            >
              {bank.logo}
            </div>

            <div className="flex-1 space-y-1">
              <h3 className="font-semibold text-lg">{bank.name}</h3>
              <p className="text-sm text-muted-foreground">{bank.shortName}</p>
            </div>
          </div>

          {/* Bank description */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {bank.description}
          </p>

          {/* Processing fee and availability */}
          <div className="flex items-center justify-between pt-2">
            <div className="text-sm">
              <span className="text-muted-foreground">Biaya admin: </span>
              <span className="font-medium">
                Rp {bank.processingFee.toLocaleString("id-ID")}
              </span>
            </div>

            <Badge
              variant={bank.isAvailable ? "default" : "secondary"}
              className={cn({
                "bg-success-100 text-success-700 hover:bg-success-100":
                  bank.isAvailable,
                "bg-muted text-muted-foreground": !bank.isAvailable,
              })}
            >
              {bank.isAvailable ? "Tersedia" : "Tidak tersedia"}
            </Badge>
          </div>
        </CardContent>

        {/* Hover effect overlay */}
        {bank.isAvailable && !disabled && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
            animate={{ translateX: isSelected ? 0 : "-100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        )}
      </Card>
    </motion.div>
  );
}

// Sample bank data
export const SAMPLE_BANKS: Bank[] = [
  {
    id: "bca",
    name: "Bank Central Asia",
    shortName: "BCA",
    color: "#1f4e79",
    logo: "BCA",
    description: "Bank terpercaya dengan jaringan ATM terluas di Indonesia",
    isAvailable: true,
    processingFee: 2500,
  },
  {
    id: "mandiri",
    name: "Bank Mandiri",
    shortName: "Mandiri",
    color: "#ff6b35",
    logo: "MDR",
    description: "Bank BUMN terbesar dengan layanan digital terdepan",
    isAvailable: true,
    processingFee: 3000,
  },
  {
    id: "bri",
    name: "Bank Rakyat Indonesia",
    shortName: "BRI",
    color: "#0066cc",
    logo: "BRI",
    description: "Bank dengan jangkauan terluas hingga pedesaan",
    isAvailable: true,
    processingFee: 2000,
  },
  {
    id: "bni",
    name: "Bank Negara Indonesia",
    shortName: "BNI",
    color: "#ff8c00",
    logo: "BNI",
    description: "Bank pioneer dengan pengalaman lebih dari 75 tahun",
    isAvailable: true,
    processingFee: 2500,
  },
  {
    id: "cimb",
    name: "CIMB Niaga",
    shortName: "CIMB",
    color: "#c41e3a",
    logo: "CIMB",
    description: "Bank dengan teknologi perbankan modern",
    isAvailable: false,
    processingFee: 3500,
  },
  {
    id: "bsi",
    name: "Bank Syariah Indonesia",
    shortName: "BSI",
    color: "#00a651",
    logo: "BSI",
    description: "Bank syariah terbesar di Indonesia",
    isAvailable: true,
    processingFee: 1500,
  },
];
