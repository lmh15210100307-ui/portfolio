import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Send } from "lucide-react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { useAdminStore } from "@/store/admin";

export default function Contact() {
  const site = useAdminStore((s) => s.site);
  return (
    <div className="relative">
      <div className="noise-bg" />
      <Header />
      <main className="relative z-10 pt-24 lg:pt-32 pb-24 lg:pb-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-16 lg:mb-20"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3">
              联系我
            </p>
            <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-tight">
              一起创造
              <br />
              有意义的东西。
            </h1>
            <p className="mt-6 text-lg text-foreground-muted leading-relaxed">
              我一直乐于有意义的合作、设计伙伴关系和有趣的交流。无论你有项目想法，
              还是想聊聊设计与 AI — 给我留言吧。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5 space-y-4">
              <a
                href={`mailto:${site.email}`}
                className="group block rounded-card border border-border bg-background-card p-6 lg:p-7 hover:border-accent transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-button bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
                    <Mail size={18} />
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-foreground-muted transition-all group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
                <p className="font-mono text-xs uppercase tracking-wider text-foreground-subtle mb-1">
                    邮箱
                  </p>
                <p className="font-display font-semibold text-xl group-hover:text-accent transition-colors">
                  {site.email}
                </p>
              </a>

              <div className="rounded-card border border-border bg-background-card p-6 lg:p-7">
                <div className="w-10 h-10 rounded-button bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-4">
                  <MapPin size={18} />
                </div>
                <p className="font-mono text-xs uppercase tracking-wider text-foreground-subtle mb-1">
                  所在地
                </p>
                <p className="font-display font-semibold text-xl">
                  {site.location}
                </p>
              </div>

              <div className="rounded-card border border-border bg-background-card p-6 lg:p-7">
                <p className="font-mono text-xs uppercase tracking-wider text-foreground-subtle mb-4">
                  其他渠道
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(site.social).map(([key, url]) => (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between rounded-button border border-border px-3 py-2.5 text-sm text-foreground-muted hover:text-foreground hover:border-accent transition-all"
                    >
                      <span className="capitalize">{key}</span>
                      <ArrowUpRight size={14} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const subject = formData.get("subject");
                const body = formData.get("message");
                const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
                  subject as string
                )}&body=${encodeURIComponent(body as string)}`;
                window.location.href = mailto;
              }}
              className="lg:col-span-7 rounded-card border border-border bg-background-card p-6 lg:p-10"
            >
              <h2 className="font-display font-semibold text-xl lg:text-2xl mb-8">
                  发送消息
                </h2>

                <div className="space-y-5">
                  <Field
                    label="主题"
                    name="subject"
                    placeholder="项目咨询、合作邀约，或是打个招呼..."
                  />
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-foreground-subtle mb-2">
                      内容
                    </label>
                    <textarea
                      name="message"
                      rows={6}
                      required
                      placeholder="聊聊你的项目、目标、时间线..."
                      className="w-full rounded-button border border-border bg-background px-4 py-3 text-sm focus:border-accent focus:outline-none transition-colors placeholder:text-foreground-subtle resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-8 group inline-flex items-center gap-2 rounded-button bg-foreground text-background px-6 py-3.5 font-medium text-sm hover:bg-accent hover:text-foreground transition-all"
              >
                发送消息
                <Send
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Field({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block font-mono text-xs uppercase tracking-wider text-foreground-subtle mb-2">
        {label}
      </label>
      <input
        type="text"
        name={name}
        required
        placeholder={placeholder}
        className="w-full rounded-button border border-border bg-background px-4 py-3 text-sm focus:border-accent focus:outline-none transition-colors placeholder:text-foreground-subtle"
      />
    </div>
  );
}
