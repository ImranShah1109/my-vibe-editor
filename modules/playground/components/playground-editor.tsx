"use client";
import Editor, { type Monaco } from "@monaco-editor/react";
import { useRef, useEffect, useCallback } from "react";
import {
  configureMonaco,
  defaultEditorOptions,
  getEditorLanguage,
} from "@/modules/playground/lib/editor-config";
import type { TemplateFile } from "../lib/path-to-json";

interface PlaygroundEditorProps {
  activeFile: TemplateFile | undefined;
  content: string;
  onContentChange: (newContent: string) => void;
}

const PlaygroundEditor = ({
  activeFile,
  content,
  onContentChange,
}: PlaygroundEditorProps) => {
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<Monaco | null>(null);

  const handleEditorDidMount = useCallback((editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    console.log("Editor instance mounted: ", !!editorRef.current);
    editor.updateOptions({
      ...defaultEditorOptions,
    });
    configureMonaco(monaco);
    updateEditorLanguage();
  }, []);

  const updateEditorLanguage = useCallback(() => {
    if (monacoRef.current && editorRef.current && activeFile) {
      const model = editorRef.current.getModel();
      if (model) {
        const language = getEditorLanguage(activeFile.fileExtension || "");
        try {
          monacoRef.current.editor.setModelLanguage(model, language);
        } catch (error) {
          console.error("Error setting model language:", error);
        }
      }
    }
  }, [activeFile]);

  useEffect(() => {
    updateEditorLanguage();
  }, []);

  return (
    <div className="h-full relative">
      <Editor
        height={"100%"}
        value={content}
        onChange={(value) => onContentChange(value || "")}
        onMount={handleEditorDidMount}
        language={
          activeFile
            ? getEditorLanguage(activeFile.fileExtension || "")
            : "plaintext"
        }
        // @ts-ignore
        options={defaultEditorOptions}
      />
    </div>
  );
};

export default PlaygroundEditor;
