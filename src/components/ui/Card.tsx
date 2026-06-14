import { cn } from "@/utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6",
        hover && "hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300 cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}

export function GlassCard({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl p-6 shadow-2xl",
        className
      )}
    >
      {children}
    </div>
  );
}
