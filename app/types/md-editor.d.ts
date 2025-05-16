declare module '@uiw/react-md-editor' {
  import { ComponentType } from 'react';
  
  interface MDEditorProps {
    value?: string;
    onChange?: (value?: string) => void;
    preview?: 'live' | 'edit' | 'preview';
    height?: number;
    className?: string;
    textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  }

  const MDEditor: ComponentType<MDEditorProps>;
  export default MDEditor;
} 