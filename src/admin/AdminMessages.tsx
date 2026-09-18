import { useI18n } from "@/hooks/useI18n";
import { Trash2, Eye, EyeOff, MessageCircle } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

const MSGS_KEY = "navi_portfolio_messages_v1";

interface MsgRecord {
  id: string;
  name: string;
  content: string;
  createdAt: number;
  replies?: number;
  hidden?: boolean;
  gradient?: string;
}

function gradients(): string {
  const opts = [
    "from-blue-500 via-purple-500 to-pink-500",
    "from-emerald-500 via-teal-500 to-cyan-500",
    "from-orange-500 via-amber-500 to-yellow-500",
    "from-rose-500 via-red-500 to-orange-500",
    "from-violet-500 via-purple-500 to-fuchsia-500",
    "from-sky-500 via-blue-500 to-indigo-500",
  ];
  return opts[Math.floor(Math.random() * opts.length)];
}

function formatRelative(ts: number): string {
  const diff = Date.now() - ts;
  const d = Math.floor(diff / 86400000);
  if (d === 0) return "今天";
  if (d === 1) return "昨天";
  if (d < 30) return `${d} 天前`;
  const m = Math.floor(d / 30);
  if (m < 12) return `${m} 个月前`;
  return `${Math.floor(m / 12)} 年前`;
}

export default function AdminMessages() {
  const { t } = useI18n();
  const [messages, setMessages] = useState<MsgRecord[]>([]);

  const load = () => {
    try {
      const raw = localStorage.getItem(MSGS_KEY);
      if (raw) {
        const arr = JSON.parse(raw) as MsgRecord[];
        setMessages(arr);
      } else {
        setMessages([]);
      }
    } catch {
      setMessages([]);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const persist = (list: MsgRecord[]) => {
    setMessages(list);
    try {
      localStorage.setItem(MSGS_KEY, JSON.stringify(list));
    } catch {}
  };

  const toggleHidden = (id: string) => {
    persist(messages.map((m) => (m.id === id ? { ...m, hidden: !m.hidden } : m)));
  };

  const del = (id: string) => {
    if (!window.confirm(t.adminMessages.confirmDelete)) return;
    persist(messages.filter((m) => m.id !== id));
  };

  const sorted = useMemo(
    () => [...messages].sort((a, b) => b.createdAt - a.createdAt),
    [messages]
  );

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-2">
          {t.adminMessages.title}
        </p>
        <h2 className="font-display font-bold text-2xl md:text-3xl">{t.adminMessages.subtitle}</h2>
      </div>

      {sorted.length === 0 ? (
        <div className="rounded-card border border-border bg-background-card p-12 text-center text-foreground-muted">
          <MessageCircle size={32} className="mx-auto mb-3 opacity-40" />
          {t.adminMessages.emptyHint}
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((m) => (
            <div
              key={m.id}
              className={`rounded-card border border-border bg-background-card p-5 transition-all ${m.hidden ? "opacity-50" : ""}`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${m.gradient || gradients()} flex items-center justify-center font-display font-bold text-sm text-white/90`}
                >
                  {(m.name || "?").slice(0, 1).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{m.name}</span>
                    <span className="font-mono text-[11px] text-foreground-subtle">
                      {formatRelative(m.createdAt)}
                    </span>
                    {m.hidden && (
                      <span className="font-mono text-[10px] text-foreground-subtle rounded-pill border border-border px-1.5 py-0.5">
                        {t.adminMessages.hidden}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-foreground-muted leading-relaxed whitespace-pre-wrap">
                    {m.content}
                  </p>
                  {m.replies && m.replies > 0 && (
                    <p className="text-xs text-foreground-subtle mt-2">
                      {t.adminMessages.replies.replace("{n}", String(m.replies))}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => toggleHidden(m.id)}
                    className="p-2 rounded-button text-foreground-muted hover:text-foreground hover:bg-background-elevated transition-colors"
                    title={m.hidden ? t.adminMessages.show : t.adminMessages.hidden}
                  >
                    {m.hidden ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                  <button
                    onClick={() => del(m.id)}
                    className="p-2 rounded-button text-foreground-muted hover:text-red-400 hover:bg-background-elevated transition-colors"
                    title={t.adminMessages.delete}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
