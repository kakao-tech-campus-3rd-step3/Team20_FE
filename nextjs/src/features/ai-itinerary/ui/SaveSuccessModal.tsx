'use client';

interface SaveSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewSaved: () => void;
  onCreateNew: () => void;
}

export function SaveSuccessModal({ 
  isOpen, 
  onClose, 
  onViewSaved, 
  onCreateNew 
}: SaveSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* 배경 오버레이 */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* 모달 컨텐츠 */}
        <div 
          className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 transform transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            {/* 성공 아이콘 */}
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg 
                className="w-8 h-8 text-green-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>

            {/* 제목 */}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              여행 일정이 저장되었어요! 🎉
            </h2>

            {/* 설명 */}
            <p className="text-gray-600 mb-6">
              언제든지 저장된 일정에서 다시 확인할 수 있습니다.
            </p>

            {/* 버튼들 */}
            <div className="space-y-3">
              <button
                onClick={onViewSaved}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                📋 저장된 일정 보러가기
              </button>
              
              <button
                onClick={onCreateNew}
                className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                🚀 새로운 일정 만들기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}