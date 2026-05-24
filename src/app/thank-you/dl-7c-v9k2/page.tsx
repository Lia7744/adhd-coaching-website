import Link from "next/link";
import { Download, Check } from "lucide-react";

export default function DownloadPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-brand-cream text-brand-charcoal px-6">
      <div className="max-w-2xl w-full text-center space-y-10">
        
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-brand-sage/10 rounded-full flex items-center justify-center">
            <Check className="w-8 h-8 text-brand-sage" strokeWidth={2.5} />
          </div>
        </div>

        <div className="space-y-4">
          <p className="font-handwriting text-4xl md:text-5xl text-brand-sage">Success!</p>
          <h1 className="text-4xl md:text-5xl font-serif font-black text-brand-charcoal">
            Your 7 Commandments <br/>Cheat Sheet is ready.
          </h1>
          <p className="text-xl font-medium text-brand-warm-gray">
            Click the button below to download the PDF to your device.
          </p>
        </div>

        <div className="pt-8">
          <a 
            href="/7_commandments_dl_v9k2.pdf" 
            download
            className="inline-flex items-center justify-center gap-3 bg-brand-sage hover:bg-brand-sage-hover text-white px-10 py-5 rounded-full font-bold text-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all w-full sm:w-auto"
          >
            <Download className="w-6 h-6" /> Download PDF Now
          </a>
        </div>

      </div>
    </div>
  );
}
