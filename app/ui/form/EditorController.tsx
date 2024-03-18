'use client';

import 'easymde/dist/easymde.min.css';
import { Controller } from 'react-hook-form';
import type { ControllerRenderProps, Control, FieldValues, FieldPath } from 'react-hook-form';
import SimpleEditor from 'react-simplemde-editor';

interface EditorControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>;
  fieldName: TName;
  placeholder?: string;
}

export default function EditorController<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ control, fieldName, placeholder }: EditorControllerProps<TFieldValues, TName>) {
  const handleControllerRender = ({ field }: { field: ControllerRenderProps<TFieldValues, TName> }) => {
    return <SimpleEditor placeholder={placeholder} {...field} />;
  };

  return <Controller name={fieldName} control={control} render={handleControllerRender} />;
}
