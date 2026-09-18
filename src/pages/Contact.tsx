import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Sparkles, User, ChevronDown } from "lucide-react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { useAdminStore } from "@/store/admin";
import { useI18n } from "@/hooks/useI18n";

const STORAGE_KEY = "navi_portfolio_messages_v1";

interface Reply {
  id: string;
  author: string;
  isAuthor: boolean;
  content: string;
  createdAt: number;
}

interface Message {
  id: string;
  author: string;
  isAuthor: boolean;
  content: string;
  createdAt: number;
  replies: Reply[];
}

const seedMessages: Message[] = [
  {
    id: "m1",
    author: "NAVI",
    isAuthor: true,
    content: "",
    createdAt: Date.now() - 7 * 86400000,
    replies: [],
  },
  {
    id: "m2",
    author: "",
    isAuthor: false,
    content: "",
    createdAt: Date.now() - 2 * 86400000,
    replies: [
      { id: "r1", author: "NAVI", isAuthor: true, content: "", createdAt: Date.now() - 1 * 86400000 },
    ],
  },
  {
    id: "m3",
    author: "",
    isAuthor: false,
    content: "",
    createdAt: Date.now() - 14 * 86400000,
    replies: [],
  },
  {
    id: "m4",
    author: "",
    isAuthor: false,
    content: "",
    createdAt: Date.now() - 5 * 86400000,
    replies: [],
  },
  {
    id: "m5",
    author: "",
    isAuthor: false,
    content: "",
    createdAt: Date.now() - 20 * 86400000,
    replies: [],
  },
  {
    id: "m6",
    author: "",
    isAuthor: false,
    content: "",
    createdAt: Date.now() - 3 * 86400000,
    replies: [],
  },
];

function loadMessages(): Message[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return seedMessages;
}

function saveMessages(msgs: Message[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
  } catch {}
}

function formatTime(ts: number, lang: string) {
  const diff = Date.now() - ts;
  const days = Math.floor(diff / 86400000);
  if (days === 0) return lang === "zh" ? "今天" : "Today";
  if (days === 1) return lang === "zh" ? "昨天" : "Yesterday";
  if (days < 30) return lang === "zh" ? `${days} 天前` : `${days}d ago`;
  return new Date(ts).toLocaleDateString(lang === "zh" ? "zh-CN" : "en");
}

function genId() {
  return "m" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export default function Contact() {
  const site = useAdminStore((s) => s.site);
  const { t, isZh, pick, lang } = useI18n();
  const [messages, setMessages] = useState<Message[]>(loadMessages);
  const [showModal, setShowModal] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiText, setAiText] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  const postMessage = (author: string, content: string) => {
    if (!content.trim()) return;
    const name = author.trim() || t.board.anonymous;
    const newMsg: Message = {
      id: genId(),
      author: name,
      isAuthor: name === pick(site.name),
      content: content.trim(),
      createdAt: Date.now(),
      replies: [],
    };
    setMessages((prev) => [newMsg, ...prev]);
    setShowModal(false);
    setToast(t.board.toastPosted);
    setTimeout(() => setToast(null), 1800);
  };

  const postReply = (msgId: string, author: string, content: string) => {
    if (!content.trim()) return;
    const name = author.trim() || t.board.anonymous;
    const newReply: Reply = {
      id: genId(),
      author: name,
      isAuthor: name === pick(site.name),
      content: content.trim(),
      createdAt: Date.now(),
    };
    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId ? { ...m, replies: [...m.replies, newReply] } : m
      )
    );
  };

  return (
    <div className="relative">
      <div className="noise-bg" />
      <Header />

      <main className="relative z-10 pt-24 lg:pt-32 pb-24 lg:pb-48">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 lg:mb-16"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
              {t.board.tag}
            </p>
            <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-tight">
              {t.board.title}
            </h1>
            <p className="mt-6 text-lg text-foreground-muted leading-relaxed max-w-xl">
              {t.board.intro}
            </p>
            <p className="mt-4 text-xs font-mono text-foreground-subtle">
              {t.board.total.replace("{n}", String(messages.length))}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {messages.map((msg, idx) => (
              <MessageCard
                key={msg.id}
                msg={msg}
                lang={lang}
                siteName={pick(site.name)}
                onReply={(author, content) => postReply(msg.id, author, content)}
                delay={idx * 50}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />

      {/* Floating Write Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowModal(true)}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3.5 font-medium text-sm hover:bg-accent transition-colors shadow-xl shadow-accent/20"
      >
        <MessageSquare size={16} />
        {t.board.write}
      </motion.button>

      {/* Floating AI Button */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setAiOpen(!aiOpen)}
        className="fixed bottom-8 right-6 z-40 inline-flex items-center gap-1.5 rounded-full bg-accent text-background px-4 py-2.5 font-medium text-xs hover:bg-accent-hover transition-colors shadow-xl shadow-accent/30"
      >
        <Sparkles size={14} />
        {t.board.sendAi}
      </motion.button>

      {/* AI Panel */}
      <AnimatePresence>
        {aiOpen && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className="fixed bottom-20 right-6 z-40 w-80 rounded-card border border-border bg-background-card shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-button bg-accent/15 flex items-center justify-center">
                  <Sparkles size={14} className="text-accent" />
                </div>
                <span className="font-display font-semibold text-sm">{t.board.sendAi}</span>
              </div>
              <button onClick={() => setAiOpen(false)} className="text-foreground-muted hover:text-foreground">
                <X size={16} />
              </button>
            </div>
            <div className="p-4">
              <textarea
                rows={4}
                value={aiText}
                onChange={(e) => setAiText(e.target.value)}
                placeholder={t.board.aiPlaceholder}
                className="w-full rounded-button border border-border bg-background px-3 py-2.5 text-sm focus:border-accent focus:outline-none resize-none placeholder:text-foreground-subtle"
              />
              <button
                onClick={() => { setAiText(""); setAiOpen(false); }}
                className="mt-3 w-full rounded-button bg-accent hover:bg-accent-hover text-background py-2.5 text-sm font-medium flex items-center justify-center gap-2"
              >
                <Send size={14} />
                {isZh ? "询问" : "Ask"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Write Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-background border border-border rounded-card p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display font-semibold text-lg">{t.board.writeTitle}</h3>
                <button onClick={() => setShowModal(false)} className="p-1.5 rounded-button hover:bg-background-card text-foreground-muted">
                  <X size={18} />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const content = (fd.get("content") as string)?.trim();
                  if (!content) { setToast(t.board.toastEmpty); setTimeout(() => setToast(null), 1800); return; }
                  postMessage(fd.get("name") as string, content);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-foreground-subtle mb-1.5">
                    {t.board.writeName}
                  </label>
                  <input
                    name="name"
                    className="w-full rounded-button border border-border bg-background-elevated px-3 py-2.5 text-sm focus:border-accent focus:outline-none"
                    placeholder={t.board.writeNamePH}
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase tracking-wider text-foreground-subtle mb-1.5">
                    {t.board.writeContent}
                  </label>
                  <textarea
                    name="content"
                    rows={4}
                    required
                    className="w-full rounded-button border border-border bg-background-elevated px-3 py-2.5 text-sm focus:border-accent focus:outline-none resize-none"
                    placeholder={t.board.writeContentPH}
                  />
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="rounded-button border border-border px-5 py-2 text-sm hover:bg-background-card"
                  >
                    {t.board.writeCancel}
                  </button>
                  <button
                    type="submit"
                    className="rounded-button bg-accent hover:bg-accent-hover text-background px-5 py-2 text-sm font-medium"
                  >
                    {t.board.writeSubmit}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 rounded-button bg-foreground text-background px-4 py-2 text-sm shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const avatarColors = [
  "from-pink-500 to-rose-500",
  "from-violet-500 to-purple-500",
  "from-blue-500 to-cyan-500",
  "from-amber-500 to-orange-500",
  "from-emerald-500 to-teal-500",
  "from-fuchsia-500 to-pink-500",
  "from-indigo-500 to-violet-500",
  "from-red-500 to-orange-500",
];

function avatarFor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return avatarColors[h % avatarColors.length];
}

function MessageCard({
  msg,
  lang,
  siteName,
  onReply,
  delay,
}: {
  msg: Message;
  lang: string;
  siteName: string;
  onReply: (author: string, content: string) => void;
  delay: number;
}) {
  const { t } = useI18n();
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [expandReplies, setExpandReplies] = useState(false);

  const submitReply = () => {
    onReply(siteName, replyText);
    setReplyText("");
    setShowReply(false);
    setExpandReplies(true);
  };

  const avatarGradient = avatarFor(msg.author || "anon");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.003 }}
      className={`group rounded-2xl p-5 transition-all ${
        msg.isAuthor
          ? "rounded-[22px] border border-pink-400/60 bg-background-card"
          : "border border-transparent bg-background-card hover:border-border/60"
      }`}
    >
      {/* Header: avatar + name + badge */}
      <div className="flex items-center gap-2.5 mb-3">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-[13px] font-bold text-white bg-gradient-to-br ${avatarGradient}`}
        >
          {msg.author.charAt(0).toUpperCase() || "?"}
        </div>
        <span
          className={`text-[13px] leading-none ${
            msg.isAuthor ? "text-pink-400 font-medium" : "text-foreground"
          }`}
        >
          {msg.author || t.board.anonymous}
        </span>
        {msg.isAuthor && (
          <span className="font-mono text-[9px] text-pink-400/80 border border-pink-400/40 rounded px-1 py-0.5">
            ★ {t.board.beAuthor}
          </span>
        )}
      </div>

      {/* Content */}
      {msg.content && (
        <p className="text-[15px] leading-[1.65] text-foreground/90 whitespace-pre-wrap mb-4">
          {msg.content}
        </p>
      )}

      {/* Replies */}
      {msg.replies.length > 0 && (
        <div className="space-y-2 mb-4">
          {(expandReplies ? msg.replies : msg.replies.slice(0, 1)).map((r) => (
            <div
              key={r.id}
              className="rounded-xl bg-background-elevated/70 border border-border/40 px-3.5 py-2.5"
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`text-[11px] ${
                    r.isAuthor ? "text-pink-400 font-medium" : "text-foreground/60"
                  }`}
                >
                  {r.author || t.board.anonymous}
                  {r.isAuthor && (
                    <span className="ml-1 text-[8px] text-pink-400/70 border border-pink-400/30 rounded px-1">
                      ★
                    </span>
                  )}
                </span>
              </div>
              <p className="text-[12px] leading-relaxed text-foreground/80 whitespace-pre-wrap">
                {r.content}
              </p>
            </div>
          ))}
          {msg.replies.length > 1 && !expandReplies && (
            <button
              onClick={() => setExpandReplies(true)}
              className="text-[11px] text-pink-400 hover:text-pink-300 inline-flex items-center gap-1"
            >
              {lang === "zh"
                ? `查看全部 ${msg.replies.length} 条回复`
                : `Show all ${msg.replies.length}`}
              <ChevronDown size={11} />
            </button>
          )}
        </div>
      )}

      {/* Footer: reply button left, time right */}
      <div className="flex items-center justify-between">
        {!showReply ? (
          <button
            onClick={() => setShowReply(true)}
            className="text-[11px] text-foreground-muted hover:text-pink-400 transition-colors flex items-center gap-1"
          >
            <MessageSquare size={11} />
            {t.board.reply}
          </button>
        ) : (
          <div className="flex-1 space-y-2">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={2}
              placeholder={t.board.writeContentPH}
              className="w-full rounded-xl border border-border bg-background-elevated px-3 py-2 text-xs focus:border-pink-400 focus:outline-none resize-none"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowReply(false);
                  setReplyText("");
                }}
                className="text-[11px] text-foreground-muted hover:text-foreground px-2 py-1"
              >
                {t.board.writeCancel}
              </button>
              <button
                onClick={submitReply}
                disabled={!replyText.trim()}
                className="rounded-lg bg-pink-500 hover:bg-pink-400 disabled:opacity-40 text-white px-3 py-1 text-xs font-medium"
              >
                {lang === "zh" ? "回复" : "Reply"}
              </button>
            </div>
          </div>
        )}
        {!showReply && (
          <span className="font-mono text-[10px] text-foreground-subtle">
            {formatTime(msg.createdAt, lang)}
          </span>
        )}
      </div>
    </motion.div>
  );
}
