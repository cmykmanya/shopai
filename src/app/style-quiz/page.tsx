'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/lib/store/ui-store';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Skip, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { products } from '@/lib/mock-data';
import { ProductCard } from '@/components/ProductCard';

type QuizStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type AnswerValue = string | number | string[] | null;

interface Question {
  id: number;
  title: string;
  description?: string;
  type: 'single' | 'multiple' | 'color' | 'slider' | 'image';
  options?: Array<{ value: string | number; label: string; image?: string }>;
  min?: number;
  max?: number;
  step?: number;
}

const questions: Question[] = [
  {
    id: 1,
    title: 'What is your gender preference?',
    type: 'single',
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'unisex', label: 'Unisex' },
    ],
  },
  {
    id: 2,
    title: 'What is your preferred style?',
    type: 'image',
    options: [
      { value: 'casual', label: 'Casual', image: '/api/placeholder/200/200' },
      { value: 'formal', label: 'Formal', image: '/api/placeholder/200/200' },
      { value: 'sporty', label: 'Sporty', image: '/api/placeholder/200/200' },
      { value: 'bohemian', label: 'Bohemian', image: '/api/placeholder/200/200' },
    ],
  },
  {
    id: 3,
    title: 'What are your favorite colors?',
    type: 'color',
    options: [
      { value: '#000000', label: 'Black' },
      { value: '#FFFFFF', label: 'White' },
      { value: '#808080', label: 'Gray' },
      { value: '#FF0000', label: 'Red' },
      { value: '#0000FF', label: 'Blue' },
      { value: '#008000', label: 'Green' },
      { value: '#FFB6C1', label: 'Pink' },
      { value: '#FFA500', label: 'Orange' },
    ],
  },
  {
    id: 4,
    title: 'What is your budget range?',
    description: 'Per item',
    type: 'slider',
    min: 0,
    max: 500,
    step: 10,
  },
  {
    id: 5,
    title: 'For what occasions do you dress?',
    type: 'multiple',
    options: [
      { value: 'work', label: 'Work' },
      { value: 'party', label: 'Party' },
      { value: 'gym', label: 'Gym' },
      { value: 'casual', label: 'Casual' },
      { value: 'formal', label: 'Formal Events' },
      { value: 'date', label: 'Date Night' },
    ],
  },
  {
    id: 6,
    title: 'What fit do you prefer?',
    type: 'single',
    options: [
      { value: 'slim', label: 'Slim' },
      { value: 'regular', label: 'Regular' },
      { value: 'loose', label: 'Loose' },
      { value: 'relaxed', label: 'Relaxed' },
    ],
  },
  {
    id: 7,
    title: 'What patterns do you like?',
    type: 'single',
    options: [
      { value: 'solid', label: 'Solid Colors' },
      { value: 'stripes', label: 'Stripes' },
      { value: 'prints', label: 'Floral Prints' },
      { value: 'plaid', label: 'Plaid/Checkered' },
    ],
  },
  {
    id: 8,
    title: 'What materials do you prefer?',
    type: 'multiple',
    options: [
      { value: 'cotton', label: 'Cotton' },
      { value: 'denim', label: 'Denim' },
      { value: 'silk', label: 'Silk' },
      { value: 'leather', label: 'Leather' },
      { value: 'linen', label: 'Linen' },
      { value: 'wool', label: 'Wool' },
    ],
  },
  {
    id: 9,
    title: 'What brand affinity do you have?',
    type: 'single',
    options: [
      { value: 'luxury', label: 'Luxury Brands' },
      { value: 'mid-range', label: 'Mid-Range Brands' },
      { value: 'budget', label: 'Budget-Friendly' },
      { value: 'any', label: 'I\'m Open to Any' },
    ],
  },
  {
    id: 10,
    title: 'Upload an inspiration image (optional)',
    description: 'Show us styles you love',
    type: 'single',
    options: [
      { value: 'upload', label: 'Upload Image' },
      { value: 'skip', label: 'Skip' },
    ],
  },
];

export default function StyleQuizPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<QuizStep>(1);
  const [answers, setAnswers] = useState<Record<number, AnswerValue>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    styleProfile: string;
    description: string;
    recommendedProducts: typeof products;
  } | null>(null);

  const currentQuestion = questions[currentStep - 1];
  const progress = ((currentStep - 1) / questions.length) * 100;

  const handleAnswer = (value: AnswerValue) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
  };

  const handleNext = () => {
    if (currentStep < questions.length) {
      setCurrentStep((currentStep + 1) as QuizStep);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as QuizStep);
    }
  };

  const handleSkip = () => {
    setAnswers({ ...answers, [currentQuestion.id]: null });
    if (currentStep < questions.length) {
      setCurrentStep((currentStep + 1) as QuizStep);
    } else {
      handleSubmitQuiz();
    }
  };

  const handleSubmitQuiz = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generate mock results
    const gender = answers[1] || 'unisex';
    const style = answers[2] || 'casual';
    const budget = answers[4] || 200;

    const styleProfiles: Record<string, { title: string; description: string }> = {
      'casual-male': {
        title: 'Casual Comfort',
        description: 'You prefer laid-back, comfortable pieces that still look polished. Your style is effortless and practical, perfect for everyday wear.',
      },
      'casual-female': {
        title: 'Chic & Relaxed',
        description: 'You love comfortable yet stylish pieces that transition easily from day to night. Your style is feminine and approachable.',
      },
      'formal-male': {
        title: 'Classic Gentleman',
        description: 'You appreciate timeless elegance and quality tailoring. Your style reflects sophistication and attention to detail.',
      },
      'formal-female': {
        title: 'Elegant Professional',
        description: 'You value polished, sophisticated looks that make a statement. Your style is refined and fashion-forward.',
      },
      'sporty-male': {
        title: 'Active Athlete',
        description: 'You love performance wear that doesn't compromise on style. Your look is energetic and ready for action.',
      },
      'sporty-female': {
        title: 'Sporty Chic',
        description: 'You combine athletic wear with trendy pieces for a look that's both functional and fashionable.',
      },
      'bohemian': {
        title: 'Free Spirit',
        description: 'You embrace eclectic, artistic pieces that express your individuality. Your style is unconventional and expressive.',
      },
    };

    const profileKey = `${style}-${gender}` as keyof typeof styleProfiles;
    const profile = styleProfiles[profileKey] || styleProfiles['casual-male'];

    // Get recommended products based on budget
    const recommendedProducts = products
      .filter(p => p.price <= budget && p.category !== 'Kids')
      .slice(0, 6);

    setResults({
      styleProfile: profile.title,
      description: profile.description,
      recommendedProducts,
    });

    setIsLoading(false);
    setIsCompleted(true);
  };

  const handleRetakeQuiz = () => {
    setCurrentStep(1);
    setAnswers({});
    setIsCompleted(false);
    setResults(null);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="inline-block"
          >
            <Sparkles className="h-16 w-16 text-primary mx-auto" />
          </motion.div>
          <h2 className="text-2xl font-bold mt-6 mb-2">Analyzing Your Style...</h2>
          <p className="text-muted-foreground">
            Our AI is learning your preferences
          </p>
          <Progress value={66} className="mt-8 max-w-md mx-auto" />
        </div>
      </div>
    );
  }

  if (isCompleted && results) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Results Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
              <Sparkles className="h-4 w-4" />
              <span className="font-medium">Your Style Profile</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {results.styleProfile}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {results.description}
            </p>
          </motion.div>

          {/* Recommended Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Recommended For You</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {results.recommendedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          >
            <Button size="lg" onClick={handleRetakeQuiz} variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake Quiz
            </Button>
            <Button size="lg" asChild>
              <Link href="/products">
                Shop All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            AI Style Quiz
          </h1>
          <p className="text-lg text-muted-foreground">
            Answer a few questions to get personalized style recommendations
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Question {currentStep} of {questions.length}</span>
            <span className="font-medium">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} />
        </div>

        {/* Question Card */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="border rounded-lg p-6 md:p-8 space-y-6"
        >
          <div>
            <Badge className="mb-3" variant="outline">
              {currentQuestion.type === 'single' && 'Single Choice'}
              {currentQuestion.type === 'multiple' && 'Multiple Choice'}
              {currentQuestion.type === 'color' && 'Select Colors'}
              {currentQuestion.type === 'slider' && 'Slider'}
              {currentQuestion.type === 'image' && 'Image Selection'}
            </Badge>
            <h2 className="text-2xl font-bold mb-2">{currentQuestion.title}</h2>
            {currentQuestion.description && (
              <p className="text-muted-foreground">{currentQuestion.description}</p>
            )}
          </div>

          {/* Options */}
          {currentQuestion.type === 'slider' && (
            <div className="space-y-4">
              <Slider
                value={[answers[currentQuestion.id] || currentQuestion.min || 0]}
                onValueChange={(value) => handleAnswer(value[0])}
                min={currentQuestion.min || 0}
                max={currentQuestion.max || 500}
                step={currentQuestion.step || 10}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${currentQuestion.min || 0}</span>
                <span className="text-lg font-bold">
                  ${answers[currentQuestion.id] || currentQuestion.min || 0}
                </span>
                <span>${currentQuestion.max || 500}</span>
              </div>
            </div>
          )}

          {currentQuestion.type === 'color' && (
            <div className="grid grid-cols-4 gap-4">
              {currentQuestion.options?.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    const current = answers[currentQuestion.id] || [];
                    if (current.includes(option.value)) {
                      handleAnswer(current.filter((v: string) => v !== option.value));
                    } else {
                      handleAnswer([...current, option.value]);
                    }
                  }}
                  className={`relative aspect-square rounded-full border-2 transition-all ${
                    (answers[currentQuestion.id] || []).includes(option.value)
                      ? 'border-primary ring-4 ring-primary/20'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: option.value as string }}
                  title={option.label}
                >
                  {(answers[currentQuestion.id] || []).includes(option.value) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-white/80" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}

          {currentQuestion.type === 'single' && currentQuestion.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    answers[currentQuestion.id] === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          )}

          {currentQuestion.type === 'multiple' && currentQuestion.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    const current = answers[currentQuestion.id] || [];
                    if (current.includes(option.value)) {
                      handleAnswer(current.filter((v: string) => v !== option.value));
                    } else {
                      handleAnswer([...current, option.value]);
                    }
                  }}
                  className={`p-4 border-2 rounded-lg text-left transition-all ${
                    (answers[currentQuestion.id] || []).includes(option.value)
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={(answers[currentQuestion.id] || []).includes(option.value)}
                      readOnly
                    />
                    <span className="font-medium">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleSkip}>
                <Skip className="mr-2 h-4 w-4" />
                Skip
              </Button>
              <Button onClick={handleNext}>
                {currentStep === questions.length ? 'Get Results' : 'Next'}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Exit Quiz */}
        <div className="text-center mt-6">
          <Button variant="ghost" asChild>
            <Link href="/">Save & Exit</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
