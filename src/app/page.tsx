'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Brain, Target, TrendingUp } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
            >
              <Brain size={48} />
            </motion.div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Reality Check AI
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get brutally honest about your life
          </p>
          
          <Button
            onClick={() => router.push('/questions')}
            size="lg"
            className="text-lg px-12 py-4"
          >
            Check My Reality
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center p-6 bg-gray-800 bg-opacity-50 rounded-xl backdrop-blur-sm">
            <Target className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Honest Analysis</h3>
            <p className="text-gray-400">No sugarcoating, just raw truth about your habits</p>
          </div>
          
          <div className="text-center p-6 bg-gray-800 bg-opacity-50 rounded-xl backdrop-blur-sm">
            <Brain className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
            <p className="text-gray-400">Advanced AI analyzes your patterns and behaviors</p>
          </div>
          
          <div className="text-center p-6 bg-gray-800 bg-opacity-50 rounded-xl backdrop-blur-sm">
            <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Actionable Advice</h3>
            <p className="text-gray-400">Get real steps to improve your life</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
