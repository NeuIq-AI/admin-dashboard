export default function SearchBar({ value, onChange }: any) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Search users..."
      className="
        w-full px-4 py-2 rounded-xl 
        bg-gray-100 dark:bg-gray-800
        text-gray-900 dark:text-white
        placeholder-gray-500 dark:placeholder-gray-400
        border border-gray-200 dark:border-gray-700
        focus:ring-2 focus:ring-indigo-500 
        outline-none transition
      "
    />
  );
}
