import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu, FloatingMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import CharacterCount from "@tiptap/extension-character-count";
import { common, createLowlight } from "lowlight";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Heading1, Heading2, Heading3, List, ListOrdered, CheckSquare,
  Quote, Code, Code2, Link as LinkIcon, Image as ImageIcon,
  AlignLeft, AlignCenter, AlignRight, Minus, Undo2, Redo2,
  X,
} from "lucide-react";
import { useCallback } from "react";

const lowlight = createLowlight(common);

interface RichEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
  maxHeight?: number;
}

export default function RichEditor({
  value,
  onChange,
  placeholder = "开始写作...",
  minHeight = 200,
  maxHeight = 520,
}: RichEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Placeholder.configure({ placeholder }),
      Image.configure({ inline: false, allowBase64: true }),
      Link.configure({ openOnClick: false, autolink: true, linkOnPaste: true }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      CodeBlockLowlight.configure({ lowlight }),
      TaskList,
      TaskItem.configure({ nested: true }),
      CharacterCount,
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose prose-sm prose-invert max-w-none focus:outline-none text-foreground [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:font-display [&_h3]:text-lg [&_h3]:font-semibold [&_p]:leading-relaxed [&_a]:text-accent [&_a]:underline-offset-2 [&_a]:hover:underline [&_blockquote]:border-l-4 [&_blockquote]:border-accent/50 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-foreground-muted [&_code]:rounded [&_code]:bg-background-elevated [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-xs [&_code]:font-mono [&_pre]:rounded-lg [&_pre]:bg-background-elevated [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_img]:rounded-lg [&_img]:my-3 [&_hr]:border-border [&_hr]:my-6 [&_.task-list]:list-none [&_.task-list]:p-0 [&_.task-item]:flex [&_.task-item]:items-start [&_.task-item]:gap-2 [&_.task-item_input]:mt-1 [&_.task-item[data-checked=true]_.task-item_content]:line-through [&_.task-item[data-checked=true]_.task-item_content]:opacity-50",
      },
    },
  });

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("图片 URL（支持 https:// 或 data: 粘贴）");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const addLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("链接 URL", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  if (!editor) return null;

  const btn = "p-1.5 rounded hover:bg-background-elevated text-foreground-muted hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed";
  const activeBtn = "bg-accent/15 text-accent";
  const divider = "w-px h-5 bg-border mx-1";

  return (
    <div className="rounded-button border border-border bg-background overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-border bg-background-elevated/50">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()} className={`${btn} ${editor.isActive("bold") ? activeBtn : ""}`} title="加粗">
          <Bold size={14} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().chain().focus().toggleItalic().run()} className={`${btn} ${editor.isActive("italic") ? activeBtn : ""}`} title="斜体">
          <Italic size={14} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} disabled={!editor.can().chain().focus().toggleUnderline().run()} className={`${btn} ${editor.isActive("underline") ? activeBtn : ""}`} title="下划线">
          <UnderlineIcon size={14} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} disabled={!editor.can().chain().focus().toggleStrike().run()} className={`${btn} ${editor.isActive("strike") ? activeBtn : ""}`} title="删除线">
          <Strikethrough size={14} />
        </button>

        <div className={divider} />

        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`${btn} ${editor.isActive("heading", { level: 1 }) ? activeBtn : ""}`} title="H1">
          <Heading1 size={14} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`${btn} ${editor.isActive("heading", { level: 2 }) ? activeBtn : ""}`} title="H2">
          <Heading2 size={14} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`${btn} ${editor.isActive("heading", { level: 3 }) ? activeBtn : ""}`} title="H3">
          <Heading3 size={14} />
        </button>

        <div className={divider} />

        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`${btn} ${editor.isActive("bulletList") ? activeBtn : ""}`} title="无序列表">
          <List size={14} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`${btn} ${editor.isActive("orderedList") ? activeBtn : ""}`} title="有序列表">
          <ListOrdered size={14} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleTaskList().run()} className={`${btn} ${editor.isActive("taskList") ? activeBtn : ""}`} title="任务清单">
          <CheckSquare size={14} />
        </button>

        <div className={divider} />

        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`${btn} ${editor.isActive("blockquote") ? activeBtn : ""}`} title="引用">
          <Quote size={14} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleCode().run()} className={`${btn} ${editor.isActive("code") ? activeBtn : ""}`} title="行内代码">
          <Code size={14} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`${btn} ${editor.isActive("codeBlock") ? activeBtn : ""}`} title="代码块">
          <Code2 size={14} />
        </button>

        <div className={divider} />

        <button type="button" onClick={addLink} className={`${btn} ${editor.isActive("link") ? activeBtn : ""}`} title="链接">
          <LinkIcon size={14} />
        </button>
        <button type="button" onClick={addImage} className={btn} title="图片">
          <ImageIcon size={14} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className={btn} title="分割线">
          <Minus size={14} />
        </button>

        <div className={divider} />

        <button type="button" onClick={() => editor.chain().focus().setTextAlign("left").run()} className={`${btn} ${editor.isActive({ textAlign: "left" }) ? activeBtn : ""}`} title="左对齐">
          <AlignLeft size={14} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("center").run()} className={`${btn} ${editor.isActive({ textAlign: "center" }) ? activeBtn : ""}`} title="居中">
          <AlignCenter size={14} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().setTextAlign("right").run()} className={`${btn} ${editor.isActive({ textAlign: "right" }) ? activeBtn : ""}`} title="右对齐">
          <AlignRight size={14} />
        </button>

        <div className={divider} />

        <button type="button" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className={btn} title="撤销">
          <Undo2 size={14} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className={btn} title="重做">
          <Redo2 size={14} />
        </button>

        <div className="flex-1" />
        <span className="font-mono text-[10px] text-foreground-subtle mr-2">
          {editor.storage.characterCount.characters()} 字
        </span>
      </div>

      {/* Bubble Menu */}
      {editor && (
        <BubbleMenu
          editor={editor}
          className="flex items-center gap-0.5 rounded-lg bg-background border border-border shadow-lg p-1 z-10"
        >
          <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btn}>
            <Bold size={13} />
          </button>
          <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btn}>
            <Italic size={13} />
          </button>
          <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={btn}>
            <UnderlineIcon size={13} />
          </button>
          <button type="button" onClick={addLink} className={btn}>
            <LinkIcon size={13} />
          </button>
        </BubbleMenu>
      )}

      {/* Floating Menu */}
      {editor && (
        <FloatingMenu
          editor={editor}
          className="flex flex-col gap-0.5 rounded-lg bg-background border border-border shadow-lg p-1.5 text-xs z-10"
        >
          {[1, 2, 3].map((lv) => (
            <button
              key={lv}
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: lv as 1 | 2 | 3 }).run()}
              className="flex items-center gap-2 rounded px-2 py-1 hover:bg-background-elevated text-foreground-muted hover:text-foreground"
            >
              <span className="font-display font-bold">H{lv}</span>
              <span className="text-[10px] text-foreground-subtle">Heading {lv}</span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className="flex items-center gap-2 rounded px-2 py-1 hover:bg-background-elevated text-foreground-muted hover:text-foreground"
          >
            <List size={12} />
            <span className="text-[10px] text-foreground-subtle">Bullet list</span>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className="flex items-center gap-2 rounded px-2 py-1 hover:bg-background-elevated text-foreground-muted hover:text-foreground"
          >
            <Quote size={12} />
            <span className="text-[10px] text-foreground-subtle">Quote</span>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className="flex items-center gap-2 rounded px-2 py-1 hover:bg-background-elevated text-foreground-muted hover:text-foreground"
          >
            <Code2 size={12} />
            <span className="text-[10px] text-foreground-subtle">Code block</span>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            className="flex items-center gap-2 rounded px-2 py-1 hover:bg-background-elevated text-foreground-muted hover:text-foreground"
          >
            <Minus size={12} />
            <span className="text-[10px] text-foreground-subtle">Divider</span>
          </button>
        </FloatingMenu>
      )}

      {/* Editor */}
      <div style={{ minHeight, maxHeight, overflow: "auto" }}>
        <EditorContent editor={editor} className="px-4 py-3" />
      </div>
    </div>
  );
}

export function RichEditorClearButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 text-[11px] text-foreground-muted hover:text-foreground px-2 py-1 rounded hover:bg-background-elevated"
    >
      <X size={11} />
      清空
    </button>
  );
}
