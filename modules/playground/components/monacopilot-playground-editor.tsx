"use client";
import React, { useRef, useEffect, useState } from "react";
import Editor, { type Monaco } from "@monaco-editor/react";
import { registerCompletion, type CompletionRegistration } from "monacopilot";
import { TemplateFile } from "../lib/path-to-json";
import {
  getEditorLanguage,
  configureMonaco,
  defaultEditorOptions,
} from "../lib/editor-config";
import { useTheme } from "next-themes";

interface MonacopilotPlaygroundEditorProps {
  activeFile: TemplateFile | undefined;
  content: string;
  onContentChange: (value: string) => void;
  aiIsEnabled: boolean;
}

function detectFramework(content: string): string {
  if (content.includes("import React") || content.includes("useState"))
    return "React";
  if (content.includes("import Vue") || content.includes("<template>"))
    return "Vue";
  if (content.includes("@angular/") || content.includes("@Component"))
    return "Angular";
  if (content.includes("next/") || content.includes("getServerSideProps"))
    return "Next.js";

  if (content.includes("express") || content.includes("express()"))
    return "Express";
  if (content.includes("@nestjs/") || content.includes("nestjs"))
    return "NestJS";

  if (content.includes("@hono/node-server") || content.includes("Hono"))
    return "Hono";

  return "None";
}

const MonacopilotPlaygroundEditor = ({
  activeFile,
  content,
  onContentChange,
  aiIsEnabled,
}: MonacopilotPlaygroundEditorProps) => {
  const { theme } = useTheme();

  const editorRef = useRef<any>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const copilotRef = useRef<CompletionRegistration | null>(null);

  // internal debounce tracker
  const lastTypingTime = useRef<number>(Date.now());

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    editor.updateOptions({
      ...defaultEditorOptions,
    });

    // cleanup previous registration
    if (copilotRef.current) {
      copilotRef.current.deregister();
    }

    if (aiIsEnabled && activeFile) {
      copilotRef.current = registerCompletion(monaco, editor, {
        endpoint: "/api/monaco-code-completion",
        language: getEditorLanguage(activeFile?.fileExtension || ""),
        filename: activeFile?.filename || "untitled",
        trigger: "onTyping",
        triggerIf: ({ text, triggerType }) => {
          if (!aiIsEnabled) return false;

          // Debounce logic: allow only if user paused 500ms
          const now = Date.now();
          const timeDiff = now - lastTypingTime.current;
          if (timeDiff < 600) return false;
          lastTypingTime.current = now;

          return true;
        },
        maxContextLines: 15,
        technologies:
          detectFramework(content) !== "None" ? [detectFramework(content)] : [],
        onCompletionShown(completion, range) {
          //   console.log("Suggestion shown:", completion);
        },
        onError: (error) => {
          console.error("Completion error:", error);
        },
        onCompletionAccepted: () => {
          //   console.log("Suggestion accepted:");
        },
      });
    }

    configureMonaco(monaco, theme);
  };

  useEffect(() => {
    return () => {
      copilotRef.current?.deregister();
    };
  }, []);

  // Re-register when aiIsEnabled changes
  useEffect(() => {
    if (editorRef.current && monacoRef.current) {
      handleEditorDidMount(editorRef.current, monacoRef.current);
    }
    return () => {
      copilotRef.current?.deregister();
      copilotRef.current = null;
    };
  }, [aiIsEnabled, activeFile?.filename, content, theme]);

  return (
    <Editor
      height="100%"
      value={content}
      onChange={(value) => onContentChange(value || "")}
      onMount={handleEditorDidMount}
      language={
        activeFile
          ? getEditorLanguage(activeFile.fileExtension || "")
          : "plaintext"
      }
      //@ts-ignore
      options={defaultEditorOptions}
    />
  );
};

export default MonacopilotPlaygroundEditor;
