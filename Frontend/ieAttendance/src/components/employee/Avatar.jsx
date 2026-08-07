export default function Avatar({ initials, className = "" }) {
  return (
    <span
      className={`grid size-8 shrink-0 place-items-center rounded-full border-2 border-white bg-gradient-to-br from-blue-700 to-amber-300 text-[10px] font-bold text-white ${className}`}
    >
      {initials}
    </span>
  );
}
