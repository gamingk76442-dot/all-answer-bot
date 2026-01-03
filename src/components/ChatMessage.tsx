import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  isStreaming?: boolean;
}

export function ChatMessage({ role, content, isStreaming }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex gap-4 animate-slide-up",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
          isUser
            ? "bg-primary text-primary-foreground glow-sm"
            : "bg-card border border-border"
        )}
      >
        {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
      </div>

      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-5 py-3.5",
          isUser
            ? "bg-primary text-primary-foreground rounded-tr-sm"
            : "bg-card border border-border rounded-tl-sm"
        )}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
        ) : (
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown
              components={{
                code({ node, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  const inline = !match;
                  return !inline ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      className="rounded-lg !my-3 !bg-[#1e1e1e]"
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code
                      className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                p({ children }) {
                  return <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>;
                },
                ul({ children }) {
                  return <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>;
                },
                ol({ children }) {
                  return <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>;
                },
                li({ children }) {
                  return <li className="leading-relaxed">{children}</li>;
                },
                h1({ children }) {
                  return <h1 className="text-xl font-bold mt-4 mb-2">{children}</h1>;
                },
                h2({ children }) {
                  return <h2 className="text-lg font-semibold mt-3 mb-2">{children}</h2>;
                },
                h3({ children }) {
                  return <h3 className="text-base font-semibold mt-2 mb-1">{children}</h3>;
                },
                blockquote({ children }) {
                  return (
                    <blockquote className="border-l-4 border-primary pl-4 italic my-2 text-muted-foreground">
                      {children}
                    </blockquote>
                  );
                },
              }}
            >
              {content}
            </ReactMarkdown>
            {isStreaming && (
              <span className="inline-block w-2 h-4 bg-primary animate-pulse-subtle ml-1" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
