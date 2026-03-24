'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Crown, Lock, Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import { unlockPremium } from '@/utils/storage';

export default function PaywallPage() {
  const router = useRouter();

  const handleUnlock = () => {
    unlockPremium();
    router.push('/questions');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <Button
            onClick={() => router.push('/')}
            variant="outline"
            size="sm"
            className="mb-8"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>

          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mb-6"
            >
              <Lock size={32} className="text-gray-900" />
            </motion.div>
            
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Unlock Full Access
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              You've used your free analysis
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500 border-opacity-30 mb-8"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 mb-4">
                <Crown className="text-yellow-400" size={24} />
                <span className="text-2xl font-bold">₹99</span>
                <span className="text-gray-400">one-time</span>
              </div>
              <p className="text-gray-400">Unlimited reality checks</p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <Check className="text-green-400" size={20} />
                <span>Unlimited AI analyses</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="text-green-400" size={20} />
                <span>Share results as images</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="text-green-400" size={20} />
                <span>Track your progress</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="text-green-400" size={20} />
                <span>No ads, ever</span>
              </div>
            </div>

            <Button
              onClick={handleUnlock}
              size="lg"
              className="w-full text-lg bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-gray-900"
            >
              <Crown size={20} className="mr-2" />
              Unlock for ₹99
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center text-gray-400 text-sm"
          >
            <p>Mock payment for demo purposes</p>
            <p className="mt-2">No actual charges will be made</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
