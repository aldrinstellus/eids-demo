"use client";

import * as React from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link2,
  Unlink,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Quote,
  Code,
  Undo,
  Redo,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ToolbarButtonProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

function ToolbarButton({
  icon: Icon,
  label,
  isActive = false,
  onClick,
  disabled = false,
}: ToolbarButtonProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 w-8 p-0",
              isActive && "bg-muted text-primary"
            )}
            onClick={onClick}
            disabled={disabled}
            type="button"
          >
            <Icon className="h-4 w-4" />
            <span className="sr-only">{label}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function ToolbarSeparator() {
  return <div className="h-6 w-px bg-border mx-1" />;
}

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  maxHeight?: string;
  disabled?: boolean;
  className?: string;
  showWordCount?: boolean;
  maxWords?: number;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Start typing...",
  minHeight = "200px",
  maxHeight = "500px",
  disabled = false,
  className,
  showWordCount = true,
  maxWords,
}: RichTextEditorProps) {
  const editorRef = React.useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = React.useState<Set<string>>(new Set());

  // Word count calculation
  const wordCount = value
    .replace(/<[^>]*>/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  // Check active formats based on selection
  const checkActiveFormats = React.useCallback(() => {
    const formats = new Set<string>();
    if (document.queryCommandState("bold")) formats.add("bold");
    if (document.queryCommandState("italic")) formats.add("italic");
    if (document.queryCommandState("underline")) formats.add("underline");
    if (document.queryCommandState("insertUnorderedList")) formats.add("ul");
    if (document.queryCommandState("insertOrderedList")) formats.add("ol");
    if (document.queryCommandState("justifyLeft")) formats.add("left");
    if (document.queryCommandState("justifyCenter")) formats.add("center");
    if (document.queryCommandState("justifyRight")) formats.add("right");
    setActiveFormats(formats);
  }, []);

  // Execute formatting command
  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    checkActiveFormats();
    handleInput();
  };

  // Handle content changes
  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  // Handle paste - clean HTML
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
    handleInput();
  };

  // Insert link
  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      execCommand("createLink", url);
    }
  };

  // Copy content
  const copyContent = async () => {
    if (editorRef.current) {
      try {
        await navigator.clipboard.writeText(editorRef.current.innerText);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  // Set initial content
  React.useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  return (
    <div className={cn("rounded-lg border bg-background", className)}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b bg-muted/30">
        {/* Text formatting */}
        <ToolbarButton
          icon={Bold}
          label="Bold (Ctrl+B)"
          isActive={activeFormats.has("bold")}
          onClick={() => execCommand("bold")}
          disabled={disabled}
        />
        <ToolbarButton
          icon={Italic}
          label="Italic (Ctrl+I)"
          isActive={activeFormats.has("italic")}
          onClick={() => execCommand("italic")}
          disabled={disabled}
        />
        <ToolbarButton
          icon={Underline}
          label="Underline (Ctrl+U)"
          isActive={activeFormats.has("underline")}
          onClick={() => execCommand("underline")}
          disabled={disabled}
        />

        <ToolbarSeparator />

        {/* Headings */}
        <ToolbarButton
          icon={Heading1}
          label="Heading 1"
          onClick={() => execCommand("formatBlock", "h1")}
          disabled={disabled}
        />
        <ToolbarButton
          icon={Heading2}
          label="Heading 2"
          onClick={() => execCommand("formatBlock", "h2")}
          disabled={disabled}
        />

        <ToolbarSeparator />

        {/* Lists */}
        <ToolbarButton
          icon={List}
          label="Bullet List"
          isActive={activeFormats.has("ul")}
          onClick={() => execCommand("insertUnorderedList")}
          disabled={disabled}
        />
        <ToolbarButton
          icon={ListOrdered}
          label="Numbered List"
          isActive={activeFormats.has("ol")}
          onClick={() => execCommand("insertOrderedList")}
          disabled={disabled}
        />

        <ToolbarSeparator />

        {/* Alignment */}
        <ToolbarButton
          icon={AlignLeft}
          label="Align Left"
          isActive={activeFormats.has("left")}
          onClick={() => execCommand("justifyLeft")}
          disabled={disabled}
        />
        <ToolbarButton
          icon={AlignCenter}
          label="Align Center"
          isActive={activeFormats.has("center")}
          onClick={() => execCommand("justifyCenter")}
          disabled={disabled}
        />
        <ToolbarButton
          icon={AlignRight}
          label="Align Right"
          isActive={activeFormats.has("right")}
          onClick={() => execCommand("justifyRight")}
          disabled={disabled}
        />

        <ToolbarSeparator />

        {/* Special */}
        <ToolbarButton
          icon={Link2}
          label="Insert Link"
          onClick={insertLink}
          disabled={disabled}
        />
        <ToolbarButton
          icon={Unlink}
          label="Remove Link"
          onClick={() => execCommand("unlink")}
          disabled={disabled}
        />
        <ToolbarButton
          icon={Quote}
          label="Block Quote"
          onClick={() => execCommand("formatBlock", "blockquote")}
          disabled={disabled}
        />
        <ToolbarButton
          icon={Code}
          label="Code Block"
          onClick={() => execCommand("formatBlock", "pre")}
          disabled={disabled}
        />

        <ToolbarSeparator />

        {/* History */}
        <ToolbarButton
          icon={Undo}
          label="Undo (Ctrl+Z)"
          onClick={() => execCommand("undo")}
          disabled={disabled}
        />
        <ToolbarButton
          icon={Redo}
          label="Redo (Ctrl+Y)"
          onClick={() => execCommand("redo")}
          disabled={disabled}
        />
        <ToolbarButton
          icon={Copy}
          label="Copy Content"
          onClick={copyContent}
          disabled={disabled}
        />
      </div>

      {/* Editor area */}
      <div
        ref={editorRef}
        contentEditable={!disabled}
        className={cn(
          "prose prose-sm max-w-none p-4 focus:outline-none overflow-y-auto",
          "prose-headings:mt-4 prose-headings:mb-2",
          "prose-p:my-2",
          "prose-ul:my-2 prose-ol:my-2",
          "prose-blockquote:border-l-primary prose-blockquote:my-2",
          "prose-pre:bg-muted prose-pre:p-2 prose-pre:rounded",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        style={{
          minHeight,
          maxHeight,
        }}
        onInput={handleInput}
        onPaste={handlePaste}
        onSelect={checkActiveFormats}
        onKeyUp={checkActiveFormats}
        onMouseUp={checkActiveFormats}
        data-placeholder={placeholder}
        suppressContentEditableWarning
      />

      {/* Footer with word count */}
      {showWordCount && (
        <div className="flex items-center justify-between px-4 py-2 border-t bg-muted/30 text-xs text-muted-foreground">
          <span>
            {wordCount} word{wordCount !== 1 ? "s" : ""}
            {maxWords && (
              <span className={cn(wordCount > maxWords && "text-destructive")}>
                {" "}
                / {maxWords} max
              </span>
            )}
          </span>
          <span>Press Ctrl+B for bold, Ctrl+I for italic</span>
        </div>
      )}

      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: hsl(var(--muted-foreground));
          pointer-events: none;
          position: absolute;
        }
        [contenteditable] {
          position: relative;
        }
      `}</style>
    </div>
  );
}

// Simplified variant for smaller editing areas
interface SimpleRichTextProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function SimpleRichText({
  value,
  onChange,
  placeholder = "Type here...",
  disabled = false,
  className,
}: SimpleRichTextProps) {
  const editorRef = React.useRef<HTMLDivElement>(null);

  const execCommand = (command: string) => {
    document.execCommand(command, false);
    editorRef.current?.focus();
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  React.useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  return (
    <div className={cn("rounded-md border", className)}>
      <div className="flex items-center gap-1 p-1 border-b bg-muted/30">
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={() => execCommand("bold")}
          disabled={disabled}
          type="button"
        >
          <Bold className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={() => execCommand("italic")}
          disabled={disabled}
          type="button"
        >
          <Italic className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={() => execCommand("insertUnorderedList")}
          disabled={disabled}
          type="button"
        >
          <List className="h-3 w-3" />
        </Button>
      </div>
      <div
        ref={editorRef}
        contentEditable={!disabled}
        className={cn(
          "min-h-[100px] p-2 text-sm focus:outline-none",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onInput={handleInput}
        data-placeholder={placeholder}
        suppressContentEditableWarning
      />
    </div>
  );
}
