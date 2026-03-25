interface GradientHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export function GradientHeader({
  title,
  subtitle,
  children,
}: GradientHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-cyan-500 via-sky-500 to-blue-600 p-8 text-white mb-8 [&_[data-slot=button]]:!bg-white [&_[data-slot=button]]:!text-black [&_[data-slot=button]]:hover:!bg-gray-100 dark:[&_[data-slot=button]]:!bg-black dark:[&_[data-slot=button]]:!text-white dark:[&_[data-slot=button]]:hover:!bg-black/90">
      <div className="absolute inset-0 z-0 bg-black/15" />
      <div className="absolute right-0 top-0 z-0 h-full w-72 bg-linear-to-l from-white/12 to-transparent" />

      <div className="relative z-10">
        <h1 className="text-4xl font-bold">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-lg text-white/80 max-w-2xl">{subtitle}</p>
        )}
        {children}
      </div>
    </div>
  );
}
