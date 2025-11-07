'use client';

import { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  touched?: boolean;
  showError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, touched, showError, className = '', style, ...props }, ref) => {
    const baseInputClasses =
      'w-full px-6 py-5 text-xl border-2 border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all duration-200 placeholder:text-gray-400 bg-white hover:border-gray-300';
    const inputClasses = `${baseInputClasses} ${className}`;

    const inputStyle = {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '1.25rem',
      ...style,
    };

    return (
      <div>
        {label && (
          <label
            htmlFor={props.id}
            className="block text-lg font-semibold text-gray-800 mb-3"
            style={{ fontFamily: 'Fredoka, sans-serif' }}
          >
            {label}
          </label>
        )}
        <input ref={ref} className={inputClasses} style={inputStyle} {...props} />
        {showError && touched && error && (
          <p className="mt-3 text-base text-red-500 font-medium" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
