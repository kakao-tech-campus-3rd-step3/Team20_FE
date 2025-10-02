import { FormFieldWrapper } from '../../../shared/ui';

interface FormFieldRendererProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
  touchedFields: Set<string>;
  getErrorMessage: (error: string | { message: string } | undefined) => string;
  label: string;
  type: string;
  placeholder: string;
}

export const FormFieldRenderer = ({
  field,
  touchedFields,
  getErrorMessage,
  label,
  type,
  placeholder,
}: FormFieldRendererProps) => {
  return (
    <FormFieldWrapper
      field={field}
      touchedFields={touchedFields}
      getErrorMessage={getErrorMessage}
      inputProps={{
        label,
        type,
        placeholder,
      }}
    />
  );
};
