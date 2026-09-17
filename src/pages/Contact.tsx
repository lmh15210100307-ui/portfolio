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
              Get in Touch
            </p>
            <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-tight">
              Let's build
              <br />
              something great.
            </h1>
            <p className="mt-6 text-lg text-foreground-muted leading-relaxed">
              I'm always open to meaningful collaborations, design partnerships,
              and interesting conversations. Whether you have a project in mind
              or just want to chat about design & AI — drop me a line.
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
                  Email
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
                  Location
                </p>
                <p className="font-display font-semibold text-xl">
                  {site.location}
                </p>
              </div>

              <div className="rounded-card border border-border bg-background-card p-6 lg:p-7">
                <p className="font-mono text-xs uppercase tracking-wider text-foreground-subtle mb-4">
                  Elsewhere
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
                Send a message
              </h2>

              <div className="space-y-5">
                <Field
                  label="Subject"
                  name="subject"
                  placeholder="Project inquiry, collaboration, or just saying hi..."
                />
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-foreground-subtle mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    required
                    placeholder="Tell me about your project, goals, timeline..."
                    className="w-full rounded-button border border-border bg-background px-4 py-3 text-sm focus:border-accent focus:outline-none transition-colors placeholder:text-foreground-subtle resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-8 group inline-flex items-center gap-2 rounded-button bg-foreground text-background px-6 py-3.5 font-medium text-sm hover:bg-accent hover:text-foreground transition-all"
              >
                Send Message
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
