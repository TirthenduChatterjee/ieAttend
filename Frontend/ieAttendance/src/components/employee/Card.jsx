export function Card({ children, className = "", id }) {
  const cardBase = "rounded-xl border border-slate-200 bg-white shadow-sm h-fit";
  return (
    <section id={id} className={`${cardBase} ${className}`}>
      {children}
    </section>
  );
}

export function Heading({ children, action }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-sm font-bold text-slate-800">{children}</h2>
      {action}
    </div>
  );
}
