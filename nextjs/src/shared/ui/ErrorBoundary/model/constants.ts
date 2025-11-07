export const ERROR_BOUNDARY_MESSAGES = {
  TITLE: '문제가 발생했어요',
  DESCRIPTION: '예상치 못한 오류가 발생했습니다. 페이지를 새로고침하거나 다시 시도해주세요.',
  RETRY_BUTTON: '다시 시도',
  RELOAD_BUTTON: '페이지 새로고침',
  DEVELOPER_INFO: '개발자 정보',
} as const;

export const ERROR_BOUNDARY_STYLES = {
  CONTAINER:
    'min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center',
  CONTENT: 'text-center max-w-md mx-auto px-4',
  ICON_CONTAINER: 'w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4',
  ICON: 'w-8 h-8 text-red-500',
  TITLE: 'text-2xl font-bold text-gray-900 mb-2',
  DESCRIPTION: 'text-gray-600 mb-6',
  BUTTON_CONTAINER: 'flex gap-4 justify-center',
  BUTTON: 'px-6 py-3',
  DEVELOPER_DETAILS: 'mt-6 text-left',
  DEVELOPER_SUMMARY: 'cursor-pointer text-sm text-gray-500 mb-2',
  DEVELOPER_PRE: 'bg-gray-100 p-4 rounded text-xs overflow-auto',
} as const;