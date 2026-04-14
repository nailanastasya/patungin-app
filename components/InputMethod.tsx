"use client"

import React from 'react';
import { Scan, Image as ImageIcon, Keyboard, Lightbulb, ChevronRight, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';

export default function InputMethodPage() {
  const router = useRouter()
  const params = useParams()

  const id = params?.id as string

  const methods = [
    {
      id: 'scan',
      title: 'Scan Struk',
      description: 'Scan directly from the camera (coming soon)',
      icon: Scan,
      color: 'bg-secondary-container',
      textColor: 'text-on-surface',
      buttonText: 'Coming Soon',
      buttonClass: 'bg-gray-300 text-gray-600 cursor-not-allowed',
      action: () => {}
    },
    {
      id: 'upload',
      title: 'Upload Foto',
      description: "Upload the receipt from the gallery, and we'll scan it automatically",
      icon: ImageIcon,
      color: 'bg-gradient-to-br from-primary-container to-primary',
      textColor: 'text-white',
      buttonText: 'Choose an Image',
      buttonClass: 'bg-white text-primary hover:bg-cyan-50',
      isPrimary: true,
      action: () => router.push(`/bill/${id}/scan`) // 🔥 INI YANG PENTING
    },
    {
      id: 'manual',
      title: 'Input Manual',
      description: 'Enter items manually (coming soon)',
      icon: Keyboard,
      color: 'bg-tertiary-container',
      textColor: 'text-on-surface',
      buttonText: 'Coming Soon',
      buttonClass: 'bg-gray-300 text-gray-600 cursor-not-allowed',
      action: () => {}
    }
  ];

  return (
    <div className="p-12 max-w-7xl mx-auto">
      <header className="mb-12">
        <h2 className="text-4xl font-extrabold mb-3">
          Input Method
        </h2>
        <p className="text-gray-500 text-lg max-w-2xl">
          Choose a way to enter items from your receipt
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {methods.map((method, index) => {
          const Icon = method.icon;
          return (
            <motion.div 
              key={method.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`group relative rounded-xl p-8 flex flex-col justify-between overflow-hidden shadow-sm hover:-translate-y-2 transition ${
                method.isPrimary 
                  ? method.color 
                  : 'bg-white border'
              }`}
            >
              <div>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  method.isPrimary 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-100'
                }`}>
                  <Icon className="w-8 h-8" />
                </div>

                <h3 className={`text-2xl font-bold mb-3 ${method.textColor}`}>
                  {method.title}
                </h3>

                <p className={`mb-8 ${
                  method.isPrimary ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {method.description}
                </p>
              </div>

              <button 
                onClick={method.action}
                className={`w-full py-4 font-bold rounded-full flex justify-center ${method.buttonClass}`}
              >
                {method.buttonText}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* PRO TIP */}
      <div className="bg-gray-100 rounded-xl p-8 flex gap-4">
        <Lightbulb />
        <p className="text-sm">
          Tip: Make sure the receipt photo is clear so that OCR can work accurately
        </p>
      </div>

      {/* FOOTER */}
      <div className="mt-16 flex justify-between">
        <button 
          onClick={() => router.push('/dashboard')}
          className="px-8 py-3 border rounded-full"
        >
          Cancel
        </button>

        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Need Help?
          </span>
          <button className="w-12 h-12 bg-white rounded-full shadow flex items-center justify-center">
            <HelpCircle />
          </button>
        </div>
      </div>
    </div>
  );
}