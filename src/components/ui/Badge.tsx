interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "success";
  className?: string;
}

const variants = {
  default: "bg-gray-100 text-gray-700",
  accent: "bg-red-50 text-[#da373d]",
  success: "bg-green-50 text-green-700",
};

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
