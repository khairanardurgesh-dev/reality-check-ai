'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Slider from '@/components/ui/Slider';
import { analyzeLife, UserAnswers } from '@/utils/openai';
import { canAnalyze } from '@/utils/storage';

export default function QuestionsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState<UserAnswers>({
    hoursWasted: 5,
    wakesOnTime: false,
    consistentWithGoals: 5,
    procrastinationFrequency: 5,
    satisfiedWithIncome: false,
    disciplineLevel: 5,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!canAnalyze()) {
      router.push('/paywall');
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await analyzeLife(answers);
      localStorage.setItem('analysis-result', JSON.stringify(result));
      router.push('/results');
    } catch (error) {
      console.error('Error analyzing:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Reality Check
            </h1>
            <p className="text-xl text-gray-300">
              Be brutally honest with yourself
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Slider
                label="How many hours do you waste daily?"
                value={answers.hoursWasted}
                onChange={(value) => setAnswers({ ...answers, hoursWasted: value })}
                min={0}
                max={10}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="mb-6">
                <label className="text-gray-300 font-medium block mb-4">
                  Do you wake up on time?
                </label>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={answers.wakesOnTime ? "primary" : "outline"}
                    onClick={() => setAnswers({ ...answers, wakesOnTime: true })}
                    className="flex-1"
                  >
                    Yes
                  </Button>
                  <Button
                    type="button"
                    variant={!answers.wakesOnTime ? "primary" : "outline"}
                    onClick={() => setAnswers({ ...answers, wakesOnTime: false })}
                    className="flex-1"
                  >
                    No
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Slider
                label="Are you consistent with your goals?"
                value={answers.consistentWithGoals}
                onChange={(value) => setAnswers({ ...answers, consistentWithGoals: value })}
                min={1}
                max={10}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Slider
                label="How often do you procrastinate?"
                value={answers.procrastinationFrequency}
                onChange={(value) => setAnswers({ ...answers, procrastinationFrequency: value })}
                min={1}
                max={10}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="mb-6">
                <label className="text-gray-300 font-medium block mb-4">
                  Are you satisfied with your income?
                </label>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={answers.satisfiedWithIncome ? "primary" : "outline"}
                    onClick={() => setAnswers({ ...answers, satisfiedWithIncome: true })}
                    className="flex-1"
                  >
                    Yes
                  </Button>
                  <Button
                    type="button"
                    variant={!answers.satisfiedWithIncome ? "primary" : "outline"}
                    onClick={() => setAnswers({ ...answers, satisfiedWithIncome: false })}
                    className="flex-1"
                  >
                    No
                  </Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Slider
                label="How disciplined are you?"
                value={answers.disciplineLevel}
                onChange={(value) => setAnswers({ ...answers, disciplineLevel: value })}
                min={1}
                max={10}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="pt-8"
            >
              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="w-full text-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="mr-2 animate-spin" />
                    Analyzing your life...
                  </>
                ) : (
                  'Get My Reality Check'
                )}
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
