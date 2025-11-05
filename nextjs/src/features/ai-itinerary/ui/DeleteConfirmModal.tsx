'use client';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  message?: string;
}

export function DeleteConfirmModal({ 
  isOpen, 
  onConfirm, 
  onCancel,
  title = "여행 일정 삭제",
  message = "정말로 이 여행 일정을 삭제하시겠습니까?"
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* 배경 오버레이 */}
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        {/* 모달 컨텐츠 */}
        <div 
          className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 transform transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            {/* 경고 아이콘 */}
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg 
                className="w-8 h-8 text-red-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
                />
              </svg>
            </div>

            {/* 제목 */}
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {title}
            </h2>

            {/* 메시지 */}
            <p className="text-gray-600 mb-6">
              {message}
            </p>

            {/* 버튼들 */}
            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                취소
              </button>
              
              <button
                onClick={onConfirm}
                className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}