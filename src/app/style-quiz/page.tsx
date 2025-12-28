'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronRight, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';

const quizQuestions = [
  {
    id: 1,
    question: 'Tarzınız nedir?',
    options: [
      { value: 'casual', label: 'Günlük / Rahat', icon: '👕' },
      { value: 'formal', label: 'Formal / Şık', icon: '👔' },
      { value: 'sporty', label: 'Spor / Aktif', icon: '🏃' },
      { value: 'bohemian', label: 'Bohem / Özgür Ruh', icon: '🎭' },
      { value: 'vintage', label: 'Klasik / Vintage', icon: '👗' },
    ],
  },
  {
    id: 2,
    question: 'Vücut tipiniz nedir?',
    options: [
      { value: 'hourglass', label: 'Kum Saati' },
      { value: 'pear', label: 'Armut' },
      { value: 'rectangle', label: 'Dikdörtgen' },
      { value: 'inverted-triangle', label: 'Ters Üçgen' },
      { value: 'oval', label: 'Oval' },
    ],
  },
  {
    id: 3,
    question: 'Hangi kıyafet parçalarını seversiniz?',
    options: [
      { value: 'dresses', label: 'Elbiseler' },
      { value: 'pants', label: 'Pantolonlar' },
      { value: 'jackets', label: 'Ceketler' },
      { value: 'accessories', label: 'Aksesuarlar' },
      { value: 'shoes', label: 'Ayakkabılar' },
    ],
  },
  {
    id: 4,
    question: 'Renk paletiniz hangisi?',
    options: [
      { value: 'neutral', label: 'Nötr', colors: ['#000000', '#FFFFFF', '#808080'] },
      { value: 'warm', label: 'Sıcak', colors: ['#FF6B6B', '#FFE66D', '#F06595'] },
      { value: 'cool', label: 'Soğuk', colors: ['#4A90E2', '#45B7D1', '#96CEB4'] },
      { value: 'pastel', label: 'Pastel', colors: ['#FFB6C1', '#DDA0DD', '#98D8C8'] },
    ],
  },
  {
    id: 5,
    question: 'Yaş grubunuz nedir?',
    options: [
      { value: '18-24', label: '18-24' },
      { value: '25-34', label: '25-34' },
      { value: '35-44', label: '35-44' },
      { value: '45+', label: '45+' },
    ],
  },
  {
    id: 6,
    question: 'Hangi mevsim için giyinmek istiyorsunuz?',
    options: [
      { value: 'spring', label: 'İlkbahar' },
      { value: 'summer', label: 'Yaz' },
      { value: 'fall', label: 'Sonbahar' },
      { value: 'winter', label: 'Kış' },
    ],
  },
  {
    id: 7,
    question: 'Bütçeniz hangi aralıkta?',
    options: [
      { value: 'budget', label: 'Ekonomik' },
      { value: 'mid', label: 'Orta' },
      { value: 'premium', label: 'Premium' },
    ],
  },
  {
    id: 8,
    question: 'Hangi markaları seviyorsunuz?',
    options: [
      { value: 'zara', label: 'Zara' },
      { value: 'h-m', label: 'H&M' },
      { value: 'nike', label: 'Nike' },
      { value: 'gucci', label: 'Gucci' },
      { value: 'other', label: 'Diğer' },
    ],
  },
  {
    id: 9,
    question: 'Hangi özellikler size önemli?',
    options: [
      { value: 'comfort', label: 'Rahatlık' },
      { value: 'style', label: 'Stil' },
      { value: 'quality', label: 'Kalite' },
      { value: 'price', label: 'Fiyat' },
    ],
  },
  {
    id: 10,
    question: 'Kategorilerden hangisini incelemek istersiniz?',
    options: [
      { value: 'casual', label: 'Günlük' },
      { value: 'formal', label: 'Formal' },
      { value: 'sporty', label: 'Spor' },
      { value: 'accessories', label: 'Aksesuarlar' },
    ],
  },
];

const styleProfiles = {
  'casual': {
    title: 'Rahat ve Şık',
    description: 'Günlük giyim tarzınızda rahatlık ve şıklığı birleştirir.',
  },
  'formal': {
    title: 'Elegan ve Profesyonel',
    description: 'İş ve özel günleriniz için sofistike ve profesyonel görünüm.',
  },
  'sporty': {
    title: 'Aktif ve Dinamik',
    description: 'Spor aktiviteleriniz için performans odaklı kıyafetler.',
  },
  'bohemian': {
    title: 'Özgür ve Sanatsal',
    description: 'Bohem tarzınızla bireyselliğinizi ve özgünlüğünüzü ifade edin.',
  },
  'vintage': {
    title: 'Klasik ve Zaman Ötesi',
    description: 'Vintage parçalarla modern bir dokunuş yaratın.',
  },
};

export default function StyleQuizPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [resultProfile, setResultProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const currentQuestion = quizQuestions.find((q) => q.id === currentStep);
  const progress = (currentStep / quizQuestions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentStep]: value });
    setTimeout(() => {
      if (currentStep < quizQuestions.length) {
        setCurrentStep(currentStep + 1);
      }
    }, 300);
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCalculateResult = () => {
    setLoading(true);
    setTimeout(() => {
      const mostCommon = Object.values(answers).reduce((a, b, i, arr) => {
        arr[a] = (arr[a] || 0) + 1;
        return arr[a] >= (arr[b] || 0) ? a : b;
      }, {} as Record<string, number>);

      setResultProfile(mostCommon);
      setIsCompleted(true);
      setLoading(false);
    }, 2000);
  };

  const getRecommendedProducts = (profile: string) => {
    if (profile === 'casual') return [1, 7, 15];
    if (profile === 'formal') return [2, 5, 12];
    if (profile === 'sporty') return [4, 10, 18];
    if (profile === 'bohemian') return [3, 9, 11];
    return [6, 8, 14];
  };

  const handleRestart = () => {
    setCurrentStep(1);
    setAnswers({});
    setIsCompleted(false);
    setResultProfile(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-600" />
            <span className="text-xl font-bold">AI Style Quiz</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => router.push('/')}>
            <ChevronRight className="h-5 w-5 rotate-180" />
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {!isCompleted ? (
          <>
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold">Soru {currentStep} / {quizQuestions.length}</h2>
                <span className="text-sm text-purple-600 font-medium">{Math.round(progress)}% Tamamlandı</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-2xl font-bold mb-8 text-center">
                    {currentQuestion?.question}
                  </h3>

                  <RadioGroup
                    value={answers[currentStep]}
                    onValueChange={handleAnswer}
                  >
                    <div className="space-y-3">
                      {currentQuestion?.options.map((option) => (
                        <motion.div
                          key={option.value}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: option.value === answers[currentStep] ? 0 : 0.1 }}
                        >
                          <RadioGroupItem
                            value={option.value}
                            id={`option-${option.value}`}
                            className="cursor-pointer border-2 rounded-xl p-4 hover:border-purple-500 transition-all data-[state=checked]:border-purple-500 data-[state=checked]:bg-purple-50"
                          >
                            <div className="flex items-center gap-4">
                              <div className="w-5 h-5 flex-shrink-0">
                                <div className="w-5 h-5 rounded-full border-2 border-purple-300 flex items-center justify-center">
                                                                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                                                                </div>
                              </div>
                              <div className="flex-1">
                                                                <Label
                                                                  htmlFor={`option-${option.value}`}
                                                                  className="font-medium text-base cursor-pointer"
                                                                >
                                                                  {option.label}
                                                                </Label>
                                                                {option.colors && (
                                                                  <div className="flex gap-1 mt-2">
                                                                    {option.colors.map((color) => (
                                                                      <div
                                                                        key={color}
                                                                        className="w-6 h-6 rounded-full border-2"
                                                                        style={{ backgroundColor: color }}
                                                                      />
                                                                    ))}
                                                                  </div>
                                                                )}
                                                              </div>
                                                            </div>
                                                        </RadioGroupItem>
                        </motion.div>
                      ))}
                    </div>
                  </RadioGroup>

                  {/* Navigation */}
                  <div className="flex justify-between mt-8">
                    {currentStep > 1 && (
                      <Button variant="outline" onClick={handlePrevious}>
                        Önceki
                      </Button>
                    )}
                    {currentStep === quizQuestions.length ? (
                      <Button size="lg" className="flex-1" onClick={handleCalculateResult} disabled={loading}>
                        {loading ? 'Hesaplanıyor...' : 'Sonuçları Gör'}
                      </Button>
                    ) : (
                      <Button variant="ghost" disabled>
                        İleri
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          /* Results Page */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold mb-2">
                Style Profiliniz: {styleProfiles[resultProfile]?.title}
              </h2>
              <p className="text-muted-foreground text-lg">
                {styleProfiles[resultProfile]?.description}
              </p>
            </div>

            {/* Recommended Products */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Sizin İçin Seçilen Ürünler</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {getRecommendedProducts(resultProfile).map((productId, index) => (
                  <motion.div
                    key={productId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border rounded-lg p-4 hover:border-purple-500 transition-colors"
                  >
                    <div className="aspect-[3/4] bg-muted rounded-lg mb-2" />
                    <h4 className="font-medium">Ürün {productId}</h4>
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      İncele
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button size="lg" className="flex-1" onClick={() => router.push('/products')}>
                Tüm Ürünleri İncele
              </Button>
              <Button size="lg" variant="outline" className="flex-1" onClick={handleRestart}>
                Testi Yeniden Çöz
              </Button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-muted-foreground">
        <p>Tarzınızı AI ile keşfedin! Powered by ShopAI</p>
      </footer>
    </div>
  );
}
