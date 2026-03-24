'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, RotateCcw, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import Button from '@/components/ui/Button';
import { AnalysisResult } from '@/utils/openai';
import { incrementUsage } from '@/utils/storage';

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('analysis-result');
    if (stored) {
      setResult(JSON.parse(stored));
      incrementUsage();
    } else {
      router.push('/');
    }
  }, [router]);

  const handleShare = async () => {
    if (!resultRef.current) return;

    setIsSharing(true);
    try {
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: '#1a1a1a',
        scale: 2,
      });
      
      const link = document.createElement('a');
      link.download = 'reality-check-result.png';
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error sharing:', error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsSharing(false);
    }
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p>Loading your reality check...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="flex justify-between items-center mb-8">
            <Button
              onClick={() => router.push('/')}
              variant="outline"
              size="sm"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back
            </Button>
            
            <div className="flex gap-2">
              <Button
                onClick={handleShare}
                variant="outline"
                size="sm"
                disabled={isSharing}
              >
                {isSharing ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500"></div>
                ) : (
                  <Download size={16} className="mr-2" />
                )}
                Share as Image
              </Button>
              <Button
                onClick={() => router.push('/questions')}
                variant="outline"
                size="sm"
              >
                <RotateCcw size={16} className="mr-2" />
                Try Again
              </Button>
            </div>
          </div>

          <div ref={resultRef} className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500 border-opacity-30">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Your Reality Check
              </h1>
              <p className="text-gray-400">Brutally honest AI analysis</p>
            </motion.div>

            <div className="space-y-6">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gray-900 bg-opacity-50 rounded-xl p-6"
              >
                <h3 className="text-purple-400 font-semibold mb-2">Personality</h3>
                <p className="text-lg">{result.personality}</p>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-r from-purple-900 to-blue-900 bg-opacity-50 rounded-xl p-6 text-center"
              >
                <h3 className="text-purple-300 font-semibold mb-4">Discipline Score</h3>
                <div className="text-6xl font-bold mb-2">
                  {result.disciplineScore}
                  <span className="text-2xl text-gray-400">/100</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${result.disciplineScore}%` }}
                  ></div>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gray-900 bg-opacity-50 rounded-xl p-6"
              >
                <h3 className="text-green-400 font-semibold mb-2">Money Mindset</h3>
                <p className="text-lg">{result.moneyMindset}</p>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-red-900 bg-opacity-30 rounded-xl p-6 border border-red-500 border-opacity-30"
              >
                <h3 className="text-red-400 font-semibold mb-2">Biggest Problem</h3>
                <p className="text-lg font-medium">{result.biggestProblem}</p>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-gray-900 bg-opacity-50 rounded-xl p-6"
              >
                <h3 className="text-yellow-400 font-semibold mb-2">Future Prediction</h3>
                <p className="text-lg">{result.futurePrediction}</p>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-gradient-to-r from-green-900 to-blue-900 bg-opacity-50 rounded-xl p-6 border border-green-500 border-opacity-30"
              >
                <h3 className="text-green-400 font-semibold mb-2">Advice</h3>
                <p className="text-lg">{result.advice}</p>
              </motion.div>
            </div>

            <div className="text-center mt-8 text-gray-500 text-sm">
              Generated by Reality Check AI
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
