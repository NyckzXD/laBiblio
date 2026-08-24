import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";

interface NotificationsProps {
  title: string;
  description: string;
  variant?: "default" | "destructive";
  duration?: number;
  onClose?: () => void;
}

export function Notifications({
  title,
  description,
  variant = "default",
  duration = 4000,
  onClose,
}: NotificationsProps) {
  useEffect(() => {
    const timer = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <Alert
      variant={variant}
      style={{ animationDuration: `${duration}ms` }}
      className={cn(
        "animate-toast fixed top-4 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 shadow-lg",
      )}
    >
      {variant === "destructive" ? <XCircle /> : <CheckCircle2 />}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
