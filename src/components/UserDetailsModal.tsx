import { useEffect } from "react";

export default function UserDetailsModal({ user, onClose }: any) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="
          bg-white dark:bg-gray-900 
          rounded-2xl shadow-xl 
          w-full max-w-lg p-8 
          animate-fadeIn
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4 mb-6">
          <img
            src={user.picture.large}
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {user.name.first} {user.name.last}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <Detail label="Phone" value={user.phone} />
          <Detail label="Cell" value={user.cell} />
          <Detail label="Gender" value={user.gender} />
          <Detail label="Age" value={user.dob.age} />
          <Detail
            label="Location"
            value={`${user.location.city}, ${user.location.country}`}
          />
          <Detail
            label="Registered"
            value={new Date(user.registered.date).toLocaleDateString()}
          />
          <Detail label="Status" value={user.status} />
        </div>

        <button
          onClick={onClose}
          className="
            mt-6 w-full py-2 rounded-xl 
            bg-gray-100 dark:bg-gray-800 
            text-gray-900 dark:text-white
            hover:bg-gray-200 dark:hover:bg-gray-700
            transition
          "
        >
          Close
        </button>
      </div>
    </div>
  );
}

function Detail({ label, value }: any) {
  return (
    <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
      <span className="text-gray-500 dark:text-gray-400">{label}</span>
      <span className="font-medium text-gray-900 dark:text-white">
        {value}
      </span>
    </div>
  );
}
