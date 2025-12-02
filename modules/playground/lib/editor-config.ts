import type { Monaco } from "@monaco-editor/react";

export const getEditorLanguage = (fileExtension: string): string => {
  const extension = fileExtension.toLowerCase();
  const languageMap: Record<string, string> = {
    // JavaScript/TypeScript
    js: "javascript",
    jsx: "javascript",
    ts: "typescript",
    tsx: "typescript",
    mjs: "javascript",
    cjs: "javascript",

    // Web languages
    json: "json",
    html: "html",
    htm: "html",
    css: "css",
    scss: "scss",
    sass: "scss",
    less: "less",

    // Markup/Documentation
    md: "markdown",
    markdown: "markdown",
    xml: "xml",
    yaml: "yaml",
    yml: "yaml",

    // Programming languages
    py: "python",
    python: "python",
    java: "java",
    c: "c",
    cpp: "cpp",
    cs: "csharp",
    php: "php",
    rb: "ruby",
    go: "go",
    rs: "rust",
    sh: "shell",
    bash: "shell",
    sql: "sql",

    // Config files
    toml: "ini",
    ini: "ini",
    conf: "ini",
    dockerfile: "dockerfile",
  };

  return languageMap[extension] || "plaintext";
};

export const configureMonaco = (monaco: Monaco, theme?: string) => {
  // Define a beautiful modern dark theme
  monaco.editor.defineTheme("modern-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      // Comments
      { token: "comment", foreground: "7C7C7C", fontStyle: "italic" },
      { token: "comment.line", foreground: "7C7C7C", fontStyle: "italic" },
      { token: "comment.block", foreground: "7C7C7C", fontStyle: "italic" },

      // Keywords
      { token: "keyword", foreground: "C586C0", fontStyle: "bold" },
      { token: "keyword.control", foreground: "C586C0", fontStyle: "bold" },
      { token: "keyword.operator", foreground: "D4D4D4" },

      // Strings
      { token: "string", foreground: "CE9178" },
      { token: "string.quoted", foreground: "CE9178" },
      { token: "string.template", foreground: "CE9178" },

      // Numbers
      { token: "number", foreground: "B5CEA8" },
      { token: "number.hex", foreground: "B5CEA8" },
      { token: "number.float", foreground: "B5CEA8" },

      // Functions
      { token: "entity.name.function", foreground: "DCDCAA" },
      { token: "support.function", foreground: "DCDCAA" },

      // Variables
      { token: "variable", foreground: "9CDCFE" },
      { token: "variable.parameter", foreground: "9CDCFE" },
      { token: "variable.other", foreground: "9CDCFE" },

      // Types
      { token: "entity.name.type", foreground: "4EC9B0" },
      { token: "support.type", foreground: "4EC9B0" },
      { token: "storage.type", foreground: "569CD6" },

      // Classes
      { token: "entity.name.class", foreground: "4EC9B0" },
      { token: "support.class", foreground: "4EC9B0" },

      // Constants
      { token: "constant", foreground: "4FC1FF" },
      { token: "constant.language", foreground: "569CD6" },
      { token: "constant.numeric", foreground: "B5CEA8" },

      // Operators
      { token: "keyword.operator", foreground: "D4D4D4" },
      { token: "punctuation", foreground: "D4D4D4" },

      // HTML/XML
      { token: "tag", foreground: "569CD6" },
      { token: "tag.id", foreground: "9CDCFE" },
      { token: "tag.class", foreground: "92C5F8" },
      { token: "attribute.name", foreground: "9CDCFE" },
      { token: "attribute.value", foreground: "CE9178" },

      // CSS
      { token: "attribute.name.css", foreground: "9CDCFE" },
      { token: "attribute.value.css", foreground: "CE9178" },
      { token: "property-name.css", foreground: "9CDCFE" },
      { token: "property-value.css", foreground: "CE9178" },

      // JSON
      { token: "key", foreground: "9CDCFE" },
      { token: "string.key", foreground: "9CDCFE" },
      { token: "string.value", foreground: "CE9178" },

      // Error/Warning
      { token: "invalid", foreground: "F44747", fontStyle: "underline" },
      {
        token: "invalid.deprecated",
        foreground: "D4D4D4",
        fontStyle: "strikethrough",
      },
    ],
    colors: {
      // Editor background
      "editor.background": "#0D1117",
      "editor.foreground": "#E6EDF3",

      // Line numbers
      "editorLineNumber.foreground": "#7D8590",
      "editorLineNumber.activeForeground": "#F0F6FC",

      // Cursor
      "editorCursor.foreground": "#F0F6FC",

      // Selection
      "editor.selectionBackground": "#264F78",
      "editor.selectionHighlightBackground": "#ADD6FF26",
      "editor.inactiveSelectionBackground": "#3A3D41",

      // Current line
      "editor.lineHighlightBackground": "#21262D",
      "editor.lineHighlightBorder": "#30363D",

      // Gutter
      "editorGutter.background": "#0D1117",
      "editorGutter.modifiedBackground": "#BB800966",
      "editorGutter.addedBackground": "#347D3966",
      "editorGutter.deletedBackground": "#F8514966",

      // Scrollbar
      "scrollbar.shadow": "#0008",
      "scrollbarSlider.background": "#6E768166",
      "scrollbarSlider.hoverBackground": "#6E768188",
      "scrollbarSlider.activeBackground": "#6E7681BB",

      // Minimap
      "minimap.background": "#161B22",
      "minimap.selectionHighlight": "#264F78",

      // Find/Replace
      "editor.findMatchBackground": "#9E6A03",
      "editor.findMatchHighlightBackground": "#F2CC6080",
      "editor.findRangeHighlightBackground": "#3FB95040",

      // Word highlight
      "editor.wordHighlightBackground": "#575757B8",
      "editor.wordHighlightStrongBackground": "#004972B8",

      // Brackets
      "editorBracketMatch.background": "#0064001A",
      "editorBracketMatch.border": "#888888",

      // Indentation guides
      "editorIndentGuide.background": "#21262D",
      "editorIndentGuide.activeBackground": "#30363D",

      // Ruler
      "editorRuler.foreground": "#21262D",

      // Whitespace
      "editorWhitespace.foreground": "#6E7681",

      // Error/Warning squiggles
      "editorError.foreground": "#F85149",
      "editorWarning.foreground": "#D29922",
      "editorInfo.foreground": "#75BEFF",
      "editorHint.foreground": "#EEEEEE",

      // Suggest widget
      "editorSuggestWidget.background": "#161B22",
      "editorSuggestWidget.border": "#30363D",
      "editorSuggestWidget.foreground": "#E6EDF3",
      "editorSuggestWidget.selectedBackground": "#21262D",

      // Hover widget
      "editorHoverWidget.background": "#161B22",
      "editorHoverWidget.border": "#30363D",

      // Panel
      "panel.background": "#0D1117",
      "panel.border": "#30363D",

      // Activity bar
      "activityBar.background": "#0D1117",
      "activityBar.foreground": "#E6EDF3",
      "activityBar.border": "#30363D",

      // Side bar
      "sideBar.background": "#0D1117",
      "sideBar.foreground": "#E6EDF3",
      "sideBar.border": "#30363D",
    },
  });

  // Define a complementary modern light theme
  monaco.editor.defineTheme("modern-light", {
    base: "vs",
    inherit: true,
    rules: [
      // Comments
      { token: "comment", foreground: "7A7A7A", fontStyle: "italic" },

      // Keywords
      { token: "keyword", foreground: "AA45A5", fontStyle: "bold" },
      { token: "keyword.control", foreground: "AA45A5", fontStyle: "bold" },
      { token: "keyword.operator", foreground: "444444" },

      // Strings
      { token: "string", foreground: "B76A50" },
      { token: "string.quoted", foreground: "B76A50" },
      { token: "string.template", foreground: "B76A50" },

      // Numbers
      { token: "number", foreground: "6A8F5B" },

      // Functions
      { token: "entity.name.function", foreground: "8C7A00" },
      { token: "support.function", foreground: "8C7A00" },

      // Variables
      { token: "variable", foreground: "0074C2" },
      { token: "variable.parameter", foreground: "0074C2" },
      { token: "variable.other", foreground: "0074C2" },

      // Types
      { token: "entity.name.type", foreground: "1D8F7A" },
      { token: "support.type", foreground: "1D8F7A" },
      { token: "storage.type", foreground: "1F74C8" },

      // Classes
      { token: "entity.name.class", foreground: "1D8F7A" },
      { token: "support.class", foreground: "1D8F7A" },

      // Constants
      { token: "constant", foreground: "008CFF" },
      { token: "constant.language", foreground: "1F74C8" },
      { token: "constant.numeric", foreground: "6A8F5B" },

      // Operators
      { token: "punctuation", foreground: "333333" },

      // HTML / XML
      { token: "tag", foreground: "1F74C8" },
      { token: "tag.id", foreground: "0074C2" },
      { token: "tag.class", foreground: "3683CE" },
      { token: "attribute.name", foreground: "0074C2" },
      { token: "attribute.value", foreground: "B76A50" },

      // CSS
      { token: "attribute.name.css", foreground: "0074C2" },
      { token: "attribute.value.css", foreground: "B76A50" },
      { token: "property-name.css", foreground: "0074C2" },
      { token: "property-value.css", foreground: "B76A50" },

      // JSON
      { token: "key", foreground: "0074C2" },
      { token: "string.key", foreground: "0074C2" },
      { token: "string.value", foreground: "B76A50" },

      // Error / Warning
      { token: "invalid", foreground: "D72A2A", fontStyle: "underline" },
      {
        token: "invalid.deprecated",
        foreground: "666666",
        fontStyle: "strikethrough",
      },
    ],
    colors: {
      // Editor background
      "editor.background": "#FFFFFF",
      "editor.foreground": "#1A1A1A",

      // Line numbers
      "editorLineNumber.foreground": "#9B9B9B",
      "editorLineNumber.activeForeground": "#333333",

      // Cursor
      "editorCursor.foreground": "#000000",

      // Selection
      "editor.selectionBackground": "#CCE7FF",
      "editor.selectionHighlightBackground": "#BAD6FF75",
      "editor.inactiveSelectionBackground": "#E0E0E080",

      // Current line
      "editor.lineHighlightBackground": "#F5F5F5",
      "editor.lineHighlightBorder": "#E0E0E0",

      // Gutter
      "editorGutter.background": "#FFFFFF",
      "editorGutter.modifiedBackground": "#D19A0966",
      "editorGutter.addedBackground": "#37A13F66",
      "editorGutter.deletedBackground": "#F1514166",

      // Scrollbar
      "scrollbar.shadow": "#00000022",
      "scrollbarSlider.background": "#CCCCCC66",
      "scrollbarSlider.hoverBackground": "#CCCCCC99",
      "scrollbarSlider.activeBackground": "#CCCCCCCC",

      // Minimap
      "minimap.background": "#F3F3F3",
      "minimap.selectionHighlight": "#CCE7FF",

      // Find/Replace
      "editor.findMatchBackground": "#FFDA7A",
      "editor.findMatchHighlightBackground": "#FFF1B880",
      "editor.findRangeHighlightBackground": "#D2F5C480",

      // Word highlight
      "editor.wordHighlightBackground": "#E0E0E080",
      "editor.wordHighlightStrongBackground": "#C8E8FF80",

      // Brackets
      "editorBracketMatch.background": "#CCE7FF80",
      "editorBracketMatch.border": "#6A6A6A",

      // Guides
      "editorIndentGuide.background": "#E4E4E4",
      "editorIndentGuide.activeBackground": "#C6C6C6",

      // Ruler
      "editorRuler.foreground": "#E4E4E4",

      // Whitespace
      "editorWhitespace.foreground": "#C8C8C8",

      // Errors / Warnings / Info
      "editorError.foreground": "#D72A2A",
      "editorWarning.foreground": "#BB8200",
      "editorInfo.foreground": "#007ACC",
      "editorHint.foreground": "#555555",

      // Suggest widget
      "editorSuggestWidget.background": "#FFFFFF",
      "editorSuggestWidget.border": "#D6D6D6",
      "editorSuggestWidget.foreground": "#1A1A1A",
      "editorSuggestWidget.selectedBackground": "#EAEAEA",

      // Hover widget
      "editorHoverWidget.background": "#FFFFFF",
      "editorHoverWidget.border": "#D6D6D6",

      // Panels
      "panel.background": "#FFFFFF",
      "panel.border": "#D6D6D6",

      // Activity bar
      "activityBar.background": "#FFFFFF",
      "activityBar.foreground": "#1A1A1A",
      "activityBar.border": "#D6D6D6",

      // Side bar
      "sideBar.background": "#FFFFFF",
      "sideBar.foreground": "#1A1A1A",
      "sideBar.border": "#D6D6D6",
    },
  });

  // Set the theme
  monaco.editor.setTheme(theme === "light" ? "modern-light" : "modern-dark");

  // Configure additional editor settings
  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  });

  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
  });

  // Set compiler options for better IntelliSense
  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.Latest,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    esModuleInterop: true,
    jsx: monaco.languages.typescript.JsxEmit.React,
    reactNamespace: "React",
    allowJs: true,
    typeRoots: ["node_modules/@types"],
  });

  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.Latest,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    jsx: monaco.languages.typescript.JsxEmit.React,
    reactNamespace: "React",
    allowJs: true,
    typeRoots: ["node_modules/@types"],
  });
};

export const defaultEditorOptions = {
  // Font settings
  fontSize: 14,
  fontFamily:
    "'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
  fontLigatures: true,
  fontWeight: "400",

  // Layout
  minimap: {
    enabled: true,
    size: "proportional",
    showSlider: "mouseover",
  },
  scrollBeyondLastLine: false,
  automaticLayout: true,
  padding: { top: 16, bottom: 16 },

  // Line settings
  lineNumbers: "on",
  lineHeight: 20,
  renderLineHighlight: "all",
  renderWhitespace: "selection",

  // Indentation
  tabSize: 2,
  insertSpaces: true,
  detectIndentation: true,

  // Word wrapping
  wordWrap: "on",
  wordWrapColumn: 120,
  wrappingIndent: "indent",

  // Code folding
  folding: true,
  foldingHighlight: true,
  foldingStrategy: "indentation",
  showFoldingControls: "mouseover",

  // Scrolling
  smoothScrolling: true,
  mouseWheelZoom: true,
  fastScrollSensitivity: 5,

  // Selection
  multiCursorModifier: "ctrlCmd",
  selectionHighlight: true,
  occurrencesHighlight: true,

  // Suggestions
  suggestOnTriggerCharacters: true,
  acceptSuggestionOnEnter: "on",
  tabCompletion: "on",
  wordBasedSuggestions: true,
  quickSuggestions: {
    other: true,
    comments: false,
    strings: false,
  },

  // Formatting
  formatOnPaste: true,
  formatOnType: true,

  // Bracket matching
  matchBrackets: "always",
  bracketPairColorization: {
    enabled: true,
  },

  // Guides
  renderIndentGuides: true,
  highlightActiveIndentGuide: true,
  rulers: [80, 120],

  // Performance
  disableLayerHinting: false,
  disableMonospaceOptimizations: false,

  // Accessibility
  accessibilitySupport: "auto",

  // Cursor
  cursorBlinking: "smooth",
  cursorSmoothCaretAnimation: true,
  cursorStyle: "line",
  cursorWidth: 2,

  // Find
  find: {
    addExtraSpaceOnTop: false,
    autoFindInSelection: "never",
    seedSearchStringFromSelection: "always",
  },

  // Hover
  hover: {
    enabled: true,
    delay: 300,
    sticky: true,
  },

  // Semantic highlighting
  "semanticHighlighting.enabled": true,

  // Sticky scroll
  stickyScroll: {
    enabled: true,
  },
};
