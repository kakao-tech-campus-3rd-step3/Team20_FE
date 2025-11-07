import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { FormFieldWrapper } from './FormField';

const meta: Meta<typeof FormFieldWrapper> = {
  title: 'Components/FormField',
  component: FormFieldWrapper,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof FormFieldWrapper>;

const DefaultRender = () => {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);

  const mockField = {
    name: 'email',
    state: {
      value,
      meta: {
        isValid: value.length > 0,
        errors: value.length === 0 ? ['이메일을 입력해주세요'] : [],
        isTouched: touched,
      },
    },
    handleChange: (newValue: string) => setValue(newValue),
    handleBlur: () => setTouched(true),
  };

  const touchedFields = new Set(touched ? ['email'] : []);
  const getErrorMessage = (error: string | undefined) => error || '입력값을 확인해주세요';

  return (
    <div className="w-96">
      <FormFieldWrapper
        field={mockField}
        touchedFields={touchedFields}
        getErrorMessage={getErrorMessage}
        inputProps={{
          label: '이메일',
          type: 'email',
          placeholder: '이메일을 입력하세요',
        }}
      />
    </div>
  );
};

export const Default: Story = {
  render: DefaultRender,
};

const WithErrorRender = () => {
  const [value, setValue] = useState('invalid-email');
  const [touched, setTouched] = useState(true);

  const mockField = {
    name: 'email',
    state: {
      value,
      meta: {
        isValid: false,
        errors: ['올바른 이메일 형식을 입력해주세요'],
        isTouched: touched,
      },
    },
    handleChange: (newValue: string) => setValue(newValue),
    handleBlur: () => setTouched(true),
  };

  const touchedFields = new Set(['email']);
  const getErrorMessage = (error: string | undefined) => error || '입력값을 확인해주세요';

  return (
    <div className="w-96">
      <FormFieldWrapper
        field={mockField}
        touchedFields={touchedFields}
        getErrorMessage={getErrorMessage}
        inputProps={{
          label: '이메일',
          type: 'email',
          placeholder: '이메일을 입력하세요',
        }}
      />
    </div>
  );
};

export const WithError: Story = {
  render: WithErrorRender,
};

const PasswordFieldRender = () => {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);

  const mockField = {
    name: 'password',
    state: {
      value,
      meta: {
        isValid: value.length >= 8,
        errors:
          value.length > 0 && value.length < 8 ? ['비밀번호는 8자리 이상이어야 합니다'] : [],
        isTouched: touched,
      },
    },
    handleChange: (newValue: string) => setValue(newValue),
    handleBlur: () => setTouched(true),
  };

  const touchedFields = new Set(touched ? ['password'] : []);
  const getErrorMessage = (error: string | undefined) => error || '입력값을 확인해주세요';

  return (
    <div className="w-96">
      <FormFieldWrapper
        field={mockField}
        touchedFields={touchedFields}
        getErrorMessage={getErrorMessage}
        inputProps={{
          label: '비밀번호',
          type: 'password',
          placeholder: '비밀번호를 입력하세요 (8자리 이상)',
        }}
      />
    </div>
  );
};

export const PasswordField: Story = {
  render: PasswordFieldRender,
};

const AllFieldTypesRender = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [nicknameTouched, setNicknameTouched] = useState(false);

  const fields = [
    {
      name: 'email',
      value: email,
      setValue: setEmail,
      touched: emailTouched,
      setTouched: setEmailTouched,
      label: '이메일',
      type: 'email',
      placeholder: '이메일을 입력하세요',
      error:
        email.length > 0 && !email.includes('@')
          ? '올바른 이메일 형식을 입력해주세요'
          : undefined,
    },
    {
      name: 'password',
      value: password,
      setValue: setPassword,
      touched: passwordTouched,
      setTouched: setPasswordTouched,
      label: '비밀번호',
      type: 'password',
      placeholder: '비밀번호를 입력하세요 (8자리 이상)',
      error:
        password.length > 0 && password.length < 8
          ? '비밀번호는 8자리 이상이어야 합니다'
          : undefined,
    },
    {
      name: 'nickname',
      value: nickname,
      setValue: setNickname,
      touched: nicknameTouched,
      setTouched: setNicknameTouched,
      label: '닉네임',
      type: 'text',
      placeholder: '닉네임을 입력하세요 (2-20자)',
      error:
        nickname.length > 0 && nickname.length < 2
          ? '닉네임은 2자리 이상이어야 합니다'
          : undefined,
    },
  ];

  const getErrorMessage = (error: string | undefined) => error || '입력값을 확인해주세요';

  return (
    <div className="w-96 space-y-6">
      {fields.map((field) => {
        const mockField = {
          name: field.name,
          state: {
            value: field.value,
            meta: {
              isValid: !field.error,
              errors: field.error ? [field.error] : [],
              isTouched: field.touched,
            },
          },
          handleChange: (newValue: string) => field.setValue(newValue),
          handleBlur: () => field.setTouched(true),
        };

        const touchedFields = new Set(field.touched ? [field.name] : []);

        return (
          <FormFieldWrapper
            key={field.name}
            field={mockField}
            touchedFields={touchedFields}
            getErrorMessage={getErrorMessage}
            inputProps={{
              label: field.label,
              type: field.type,
              placeholder: field.placeholder,
            }}
          />
        );
      })}
    </div>
  );
};

export const AllFieldTypes: Story = {
  render: AllFieldTypesRender,
};
