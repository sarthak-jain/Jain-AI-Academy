interface CalloutProps {
  children: React.ReactNode;
  type?: "info" | "warning" | "tip";
  title?: string;
}

const styles = {
  info: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    title: "text-blue-800",
    icon: "i",
  },
  warning: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    title: "text-amber-800",
    icon: "!",
  },
  tip: {
    bg: "bg-green-50",
    border: "border-green-200",
    title: "text-green-800",
    icon: "~",
  },
};

export function Callout({ children, type = "info", title }: CalloutProps) {
  const s = styles[type];

  return (
    <div className={`my-6 rounded-lg border ${s.border} ${s.bg} p-4`}>
      {title && (
        <p className={`font-semibold mb-1 ${s.title}`}>{title}</p>
      )}
      <div className="text-sm text-gray-700">{children}</div>
    </div>
  );
}
