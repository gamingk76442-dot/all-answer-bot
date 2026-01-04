import { Sparkles, Code, BookOpen, Lightbulb } from "lucide-react";

const suggestions = [
  {
    icon: Code,
    title: "Code Help",
    description: "Debug or write code in any language",
  },
  {
    icon: BookOpen,
    title: "Learn",
    description: "Explain complex topics simply",
  },
  {
    icon: Lightbulb,
    title: "Ideas",
    description: "Brainstorm and get creative suggestions",
  },
];

interface WelcomeScreenProps {
  onSuggestionClick: (text: string) => void;
}

export function WelcomeScreen({ onSuggestionClick }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">
        Hello, I'm your AI Assistant
      </h1>
      
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 glow">
        <Sparkles className="w-10 h-10 text-primary-foreground" />
      </div>
      
      <p className="text-muted-foreground mb-10 max-w-md">
        I can help you with virtually anything. Ask me questions, get explanations, write code, or just have a conversation.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.title}
            onClick={() => onSuggestionClick(suggestion.description)}
            className="group p-5 bg-card border border-border rounded-xl text-left transition-all duration-200 hover:border-primary/50 hover:bg-card/80 hover:glow-sm"
          >
            <suggestion.icon className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform duration-200" />
            <h3 className="font-semibold mb-1">{suggestion.title}</h3>
            <p className="text-sm text-muted-foreground">{suggestion.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
