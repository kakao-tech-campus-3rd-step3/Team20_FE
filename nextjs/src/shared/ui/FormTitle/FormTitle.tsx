'use client';

interface FormTitleProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const FormTitle = ({
  children,
  className = 'text-3xl font-bold text-gray-900',
  style = { fontFamily: 'Fredoka, sans-serif' },
}: FormTitleProps) => {
  return (
    <div className="text-left mb-4">
      <h2 className={className} style={style}>
        {children}
      </h2>
    </div>
  );
};
