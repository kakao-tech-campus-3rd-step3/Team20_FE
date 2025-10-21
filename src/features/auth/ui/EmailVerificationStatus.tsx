import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import type { VerificationStatus } from '../hooks/useEmailVerification';
import { AUTH_MESSAGES } from '../model/messages';

interface EmailVerificationStatusProps {
    status: VerificationStatus;
    message: string;
    onGoToLogin: () => void;
    onGoToHome: () => void;
}

export const EmailVerificationStatus = ({
    status,
    message,
    onGoToLogin,
    onGoToHome,
}: EmailVerificationStatusProps) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col justify-center py-16 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-12 px-8 shadow-2xl rounded-3xl border border-gray-100">
                    <div className="text-center">
                        {status === 'loading' && (
                            <LoadingState />
                        )}

                        {status === 'success' && (
                            <SuccessState
                                message={message}
                                onGoToLogin={onGoToLogin}
                                onGoToHome={onGoToHome}
                            />
                        )}

                        {status === 'error' && (
                            <ErrorState
                                message={message}
                                onGoToHome={onGoToHome}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const LoadingState = () => (
    <>
        <Loader2 className="mx-auto h-16 w-16 text-purple-600 animate-spin" />
        <h2 className="mt-6 text-2xl font-bold text-gray-900">
            {AUTH_MESSAGES.EMAIL_VERIFICATION_LOADING_TITLE}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
            {AUTH_MESSAGES.EMAIL_VERIFICATION_LOADING_DESCRIPTION}
        </p>
    </>
);

interface SuccessStateProps {
    message: string;
    onGoToLogin: () => void;
    onGoToHome: () => void;
}

const SuccessState = ({ message, onGoToLogin, onGoToHome }: SuccessStateProps) => (
    <>
        <CheckCircle className="mx-auto h-16 w-16 text-green-600" />
        <h2 className="mt-6 text-2xl font-bold text-gray-900">
            {AUTH_MESSAGES.EMAIL_VERIFICATION_SUCCESS_TITLE}
        </h2>
        <p className="mt-2 text-sm text-gray-600">{message}</p>
        <div className="mt-8 space-y-3">
            <button
                onClick={onGoToLogin}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
            >
                {AUTH_MESSAGES.EMAIL_VERIFICATION_GO_TO_LOGIN}
            </button>
            <button
                onClick={onGoToHome}
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
            >
                {AUTH_MESSAGES.EMAIL_VERIFICATION_GO_TO_HOME}
            </button>
        </div>
    </>
);

interface ErrorStateProps {
    message: string;
    onGoToHome: () => void;
}

const ErrorState = ({ message, onGoToHome }: ErrorStateProps) => (
    <>
        <XCircle className="mx-auto h-16 w-16 text-red-600" />
        <h2 className="mt-6 text-2xl font-bold text-gray-900">
            {AUTH_MESSAGES.EMAIL_VERIFICATION_ERROR_TITLE}
        </h2>
        <p className="mt-2 text-sm text-gray-600">{message}</p>
        
        <div className="mt-8 space-y-3">
            <button
                onClick={onGoToHome}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
            >
                {AUTH_MESSAGES.EMAIL_VERIFICATION_GO_TO_HOME}
            </button>
        </div>
    </>
);
