export default function FloatingInput({
  id,
  type = "text",
  placeholder,
  ...props
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200"
      {...props}
    />
  );
}