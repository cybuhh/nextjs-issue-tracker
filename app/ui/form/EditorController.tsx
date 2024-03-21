'use client';

import 'easymde/dist/easymde.min.css';
import { Controller } from 'react-hook-form';
import type { ControllerRenderProps, UseControllerProps } from 'react-hook-form';
import SimpleEditor from 'react-simplemde-editor';
import type { ComponentProps } from 'react';

type EditorControllerProps = Pick<UseControllerProps, 'control' | 'name'> & {
  placeholder?: string;
};

export default function EditorController({ control, name, placeholder }: EditorControllerProps) {
  const handleControllerRender = ({ field }: { field: ControllerRenderProps }) => {
    return <SimpleEditor placeholder={placeholder} {...field} />;
  };

  return <Controller name={name} control={control} render={handleControllerRender} />;
}
