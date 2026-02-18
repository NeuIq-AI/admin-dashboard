export default function UserRow({ user, onStatusChange,onClick }: any) {
  return (
    <div onClick={onClick} className="flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
      <div className="flex items-center gap-4">
        <img
          src={user.picture.thumbnail}
          className="w-10 h-10 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
        />

        <div>
          <div className="font-semibold text-gray-900 dark:text-white">
            {user.name.first} {user.name.last}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {user.email}
          </div>
        </div>
      </div>

      <button
        onClick={(e) => {
    e.stopPropagation();
    onStatusChange(user.login.uuid);
  }}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
          user.status === "Active"
            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
            : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
        }`}
      >
        {user.status}
      </button>
    </div>
  );
}
