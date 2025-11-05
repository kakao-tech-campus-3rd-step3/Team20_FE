'use client';

import { useEffect, useState } from 'react';
import { LoadingStep } from '@/entities/ai-itinerary';

interface LoadingProgressProps {
  isVisible: boolean;
}

const LOADING_STEPS: LoadingStep[] = [
  {
    id: 'validation',
    title: '입력 정보 검증',
    description: '출발지와 도착지 정보를 확인하고 있습니다',
    completed: false,
    duration: 1,
  },
  {
    id: 'database',
    title: '촬영지 데이터 조회',
    description: '선택한 지역의 K-콘텐츠 촬영지를 찾고 있습니다',
    completed: false,
    duration: 2,
  },
  {
    id: 'filtering',
    title: '지리적 필터링',
    description: '접근 가능한 촬영지들을 선별하고 있습니다',
    completed: false,
    duration: 1,
  },
  {
    id: 'ai_processing',
    title: 'AI 일정 생성',
    description: '최적의 여행 일정을 생성하고 있습니다',
    completed: false,
    duration: 20,
  },
  {
    id: 'formatting',
    title: '결과 정리',
    description: '생성된 일정을 정리하고 있습니다',
    completed: false,
    duration: 1,
  },
];

export function LoadingProgress({ isVisible }: LoadingProgressProps) {
  const [steps, setSteps] = useState<LoadingStep[]>(LOADING_STEPS);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      // 리셋
      setSteps(LOADING_STEPS.map(step => ({ ...step, completed: false })));
      setCurrentStepIndex(0);
      setElapsedTime(0);
      return;
    }

    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 0.1);
    }, 100);

    return () => clearInterval(interval);
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let cumulativeTime = 0;
    const newCurrentIndex = steps.findIndex((step, index) => {
      cumulativeTime += step.duration;
      return elapsedTime < cumulativeTime;
    });

    if (newCurrentIndex !== -1 && newCurrentIndex !== currentStepIndex) {
      setCurrentStepIndex(newCurrentIndex);
      
      // 이전 단계들을 완료로 표시
      setSteps(prev => prev.map((step, index) => ({
        ...step,
        completed: index < newCurrentIndex
      })));
    }
  }, [elapsedTime, isVisible, currentStepIndex, steps]);

  if (!isVisible) return null;

  const totalDuration = LOADING_STEPS.reduce((sum, step) => sum + step.duration, 0);
  const progress = Math.min((elapsedTime / totalDuration) * 100, 100);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            여행 일정 생성 중
          </h3>
          <p className="text-gray-600">
            평균 15초 정도 소요됩니다
          </p>
        </div>

        {/* 진행률 바 */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>진행률</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* 단계별 진행 상황 */}
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-start space-x-3 p-3 rounded-lg transition-colors ${
                index === currentStepIndex
                  ? 'bg-blue-50 border border-blue-200'
                  : step.completed
                  ? 'bg-green-50'
                  : 'bg-gray-50'
              }`}
            >
              <div className="flex-shrink-0 mt-1">
                {step.completed ? (
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                ) : index === currentStepIndex ? (
                  <div className="w-5 h-5 bg-blue-500 rounded-full animate-pulse"></div>
                ) : (
                  <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${
                  index === currentStepIndex ? 'text-blue-900' : 
                  step.completed ? 'text-green-900' : 'text-gray-500'
                }`}>
                  {step.title}
                </p>
                <p className={`text-xs ${
                  index === currentStepIndex ? 'text-blue-600' : 
                  step.completed ? 'text-green-600' : 'text-gray-400'
                }`}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 재미있는 팁 */}
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-sm text-yellow-800">
            💡 <strong>알고 계셨나요?</strong> AI가 {steps.find(s => s.id === 'database')?.completed ? '362개' : '수백 개'}의 촬영지 데이터를 분석해서 최적의 일정을 만들어드리고 있어요!
          </p>
        </div>

        {/* 문제 발생 시 안내 */}
        {elapsedTime > 30 && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              ⏰ <strong>시간이 오래 걸리고 있나요?</strong> 선택하신 지역에 촬영지가 많아서 더 정확한 일정을 만들고 있어요. 조금만 더 기다려주세요!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}