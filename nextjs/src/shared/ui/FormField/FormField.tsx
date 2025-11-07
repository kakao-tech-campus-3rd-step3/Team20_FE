'use client';

import { type ReactNode } from 'react';
import { Input, type InputProps } from '../Input/Input';

export interface FormFieldProps
  extends Omit<InputProps, 'error' | 'touched' | 'showError' | 'children'> {
  name: string;
  children: (field: {
    name: string;
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
    isValid: boolean;
    errors: string[];
    isTouched: boolean;
  }) => ReactNode;
}

export const FormField = () => {
  return null;
};

export interface FormFieldWrapperProps {
  field: {
    name: string;
    state: {
      value: string;
      meta: {
        isValid: boolean;
        errors: (string | undefined)[];
        isTouched: boolean;
      };
    };
    handleChange: (value: string) => void;
    handleBlur: () => void;
  };
  touchedFields: Set<string>;
  getErrorMessage: (error: string | undefined) => string;
  inputProps?: Partial<InputProps>;
}

export const FormFieldWrapper = ({
  field,
  touchedFields,
  getErrorMessage,
  inputProps = {},
}: FormFieldWrapperProps) => {
  const isTouched = touchedFields.has(field.name);
  const error =
    field.state.meta.errors.length > 0 ? getErrorMessage(field.state.meta.errors[0]) : undefined;

  return (
    <Input
      id={field.name}
      name={field.name}
      value={field.state.value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.handleChange(e.target.value)}
      onBlur={field.handleBlur}
      error={error}
      touched={isTouched}
      showError={!field.state.meta.isValid && isTouched && field.state.meta.errors.length > 0}
      {...inputProps}
    />
  );
};
