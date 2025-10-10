import React, { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write your content here...',
  className = '',
}) => {
  // Custom toolbar configuration with all the features the backend supports
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      [{ 'color': [] }, { 'background': [] }],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
  }), []);

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'indent',
    'align',
    'blockquote', 'code-block',
    'link', 'image',
    'color', 'background',
  ];

  return (
    <div className={`rich-text-editor ${className}`}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        className="bg-white"
      />
      <style>{`
        .rich-text-editor .ql-container {
          min-height: 400px;
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
        }

        .rich-text-editor .ql-toolbar {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
        }

        .rich-text-editor .ql-editor {
          min-height: 400px;
        }

        .rich-text-editor .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: normal;
        }

        /* Style the editor content similar to how it will appear on the blog */
        .rich-text-editor .ql-editor h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 1em 0 0.5em;
          font-family: 'Playfair Display', serif;
        }

        .rich-text-editor .ql-editor h2 {
          font-size: 1.75em;
          font-weight: bold;
          margin: 0.8em 0 0.4em;
          font-family: 'Playfair Display', serif;
        }

        .rich-text-editor .ql-editor h3 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.6em 0 0.3em;
          font-family: 'Playfair Display', serif;
        }

        .rich-text-editor .ql-editor h4 {
          font-size: 1.25em;
          font-weight: bold;
          margin: 0.5em 0 0.25em;
          font-family: 'Playfair Display', serif;
        }

        .rich-text-editor .ql-editor h5 {
          font-size: 1.1em;
          font-weight: bold;
          margin: 0.4em 0 0.2em;
          font-family: 'Playfair Display', serif;
        }

        .rich-text-editor .ql-editor h6 {
          font-size: 1em;
          font-weight: bold;
          margin: 0.3em 0 0.15em;
          font-family: 'Playfair Display', serif;
        }

        .rich-text-editor .ql-editor p {
          margin: 1em 0;
          line-height: 1.8;
        }

        .rich-text-editor .ql-editor ul,
        .rich-text-editor .ql-editor ol {
          margin: 1em 0;
          padding-left: 2em;
        }

        .rich-text-editor .ql-editor li {
          margin: 0.5em 0;
        }

        .rich-text-editor .ql-editor blockquote {
          border-left: 4px solid #d1d5db;
          margin: 1.5em 0;
          padding: 0.5em 1em;
          color: #6b7280;
          font-style: italic;
          background: #f9fafb;
        }

        .rich-text-editor .ql-editor img {
          max-width: 100%;
          height: auto;
          margin: 1.5em 0;
          border-radius: 0.5rem;
        }

        .rich-text-editor .ql-editor pre {
          background: #f3f4f6;
          padding: 1em;
          border-radius: 0.375rem;
          overflow-x: auto;
          margin: 1em 0;
        }

        .rich-text-editor .ql-editor code {
          background: #f3f4f6;
          padding: 2px 6px;
          border-radius: 0.25rem;
          font-family: 'Courier New', monospace;
        }

        .rich-text-editor .ql-editor a {
          color: #c8a882;
          text-decoration: underline;
        }

        .rich-text-editor .ql-editor a:hover {
          color: #2e3336;
        }

        /* Toolbar button styling */
        .rich-text-editor .ql-toolbar button:hover,
        .rich-text-editor .ql-toolbar button:focus {
          color: #c8a882;
        }

        .rich-text-editor .ql-toolbar button.ql-active {
          color: #c8a882;
        }

        .rich-text-editor .ql-toolbar .ql-stroke {
          stroke: #374151;
        }

        .rich-text-editor .ql-toolbar button:hover .ql-stroke,
        .rich-text-editor .ql-toolbar button:focus .ql-stroke {
          stroke: #c8a882;
        }

        .rich-text-editor .ql-toolbar button.ql-active .ql-stroke {
          stroke: #c8a882;
        }

        .rich-text-editor .ql-toolbar .ql-fill {
          fill: #374151;
        }

        .rich-text-editor .ql-toolbar button:hover .ql-fill,
        .rich-text-editor .ql-toolbar button:focus .ql-fill {
          fill: #c8a882;
        }

        .rich-text-editor .ql-toolbar button.ql-active .ql-fill {
          fill: #c8a882;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;

