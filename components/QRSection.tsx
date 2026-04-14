import { QrCode, Download } from 'lucide-react';
import { motion } from "framer-motion";

type QRSectionProps = {
  name: string;
  amount: number;
  groupQR?: string | null; // 🔥 NEW
};

export default function QRSection({ name, amount, groupQR }: QRSectionProps) {
  return (
    <div className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/15 flex flex-col items-center text-center relative overflow-hidden">
      
      <div className="absolute top-0 right-0 p-4">
        <QrCode className="text-primary-container opacity-20 rotate-12" size={64} />
      </div>

      <h3 className="text-lg font-bold font-headline mb-2">
        Instant Pay {name}
      </h3>

      <p className="text-xs text-outline mb-2">
        Rp {Math.round(amount).toLocaleString("id-ID")}
      </p>

      <p className="text-xs text-outline mb-6">
        Scan to settle the bill immediately
      </p>

      {/* 🔥 QR BOX */}
      <div className="w-48 h-48 bg-white p-4 rounded-2xl shadow-xl shadow-primary/10 border-4 border-surface-container-low mb-6 flex items-center justify-center">
        
        {groupQR ? (
          <img
            src={groupQR}
            alt="QR Group"
            className="w-full h-full object-contain rounded-lg"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300 relative">
            <QrCode className="text-slate-400" size={48} />

            {/* Decorative Corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-primary"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-primary"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-primary"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-primary"></div>
          </div>
        )}

      </div>

      {/* BUTTON */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 bg-surface-container-high text-primary font-bold rounded-full hover:bg-primary hover:text-on-primary transition-all flex items-center justify-center space-x-2"
      >
        <Download size={16} />
        <span>Save QR Image</span>
      </motion.button>
    </div>
  );
}