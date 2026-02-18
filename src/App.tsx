import { useMemo, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { useUsers } from "./hooks/useUsers";
import { useDebounce } from "./hooks/useDebounce";
import DataGrid from "./components/DataGrid";
import SearchBar from "./components/SearchBar";
import Toast from "./components/Toast";
import ThemeToggle from "./context/ThemeToggle";
import { ThemeContext } from "./context/ThemeContext";
import UserDetailsModal from "./components/UserDetailsModal"

export default function App() {
  const { users, setUsers, loading } = useUsers();
  const [searchParams, setSearchParams] = useSearchParams();
  const [toast, setToast] = useState<string | null>(null);
  const [showSortPanel, setShowSortPanel] = useState(false);

  const query = searchParams.get("q") || "";
  const debouncedQuery = useDebounce(query, 300);

  const sort = searchParams.get("sort") || "";
  const order = searchParams.get("order") || "asc";

  const { dark } = useContext(ThemeContext);

  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const setSort = (field: string) => {
    const params = new URLSearchParams(searchParams);

    if (sort === field) {
      params.set("order", order === "asc" ? "desc" : "asc");
    } else {
      params.set("sort", field);
      params.set("order", "asc");
    }

    setSearchParams(params);
  };

  const setQuery = (val: string) => {
    const params = new URLSearchParams(searchParams);
    val ? params.set("q", val) : params.delete("q");
    setSearchParams(params);
  };

  const filtered = useMemo(() => {
    let result = [...users];

    // SEARCH
    if (debouncedQuery) {
      result = result.filter(u =>
        `${u.name.first} ${u.name.last}`
          .toLowerCase()
          .includes(debouncedQuery.toLowerCase()) ||
        u.email
          .toLowerCase()
          .includes(debouncedQuery.toLowerCase())
      );
    }

    // SORT
    if (sort) {
      result.sort((a, b) => {
        let aValue: string;
        let bValue: string;

        switch (sort) {
          case "name":
            aValue = `${a.name.first} ${a.name.last}`;
            bValue = `${b.name.first} ${b.name.last}`;
            break;

          case "email":
            aValue = a.email;
            bValue = b.email;
            break;

          case "status":
            aValue = a.status;
            bValue = b.status;
            break;

          default:
            return 0;
        }

        if (order === "asc") {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      });
    }

    return result;
  }, [users, debouncedQuery, sort, order]);


  const handleStatusChange = (id: string) => {
    const original = [...users];

    setUsers(prev =>
      prev.map(u =>
        u.login.uuid === id
          ? {
            ...u,
            status:
              u.status === "Active"
                ? "Inactive"
                : "Active",
          }
          : u
      )
    );


    setTimeout(() => {
      if (Math.random() < 0.1) {
        setUsers(original);
        setToast("Failed to update user status");
        setTimeout(() => setToast(null), 3000);
      }
    }, 1000);
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0f172a] dark:to-[#0b1120] transition-colors">

      {/* Top Navigation */}
      <div className="shrink-0 sticky top-0 z-50 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={dark ? "/logo-light.png" : "/logo-dark.png"}
              alt="NeuIQ"
              className="h-10 w-auto"
            />
          </div>

          {/* Search */}
          <div className="flex-1 px-8">
            <div className="max-w-md mx-auto">
              <SearchBar value={query} onChange={setQuery} />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSortPanel(true)}
              className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition text-sm"
            >
              Sort
            </button>

            <ThemeToggle />
          </div>


        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden max-w-6xl mx-auto w-full px-6 py-6">



        {/* DataGrid Container */}
        <div className="flex-1 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">

          <DataGrid
            users={filtered}
            onStatusChange={handleStatusChange}
            onRowClick={setSelectedUser}
          />

        </div>

      </div>

      <Toast message={toast} />

      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

      {showSortPanel && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-end"
          onClick={() => setShowSortPanel(false)}
        >
          <div
            className="w-96 h-full bg-white dark:bg-gray-900 shadow-2xl p-8 animate-slideIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
              Sort Users
            </h2>

            <div className="space-y-4">

              <div>
                <label className="block mb-2 text-sm text-gray-500 dark:text-gray-400">
                  Sort By
                </label>

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="">None</option>
                  <option value="name">Name</option>
                  <option value="email">Email</option>
                  <option value="status">Status</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-500 dark:text-gray-400">
                  Order
                </label>

                <select
                  value={order}
                  onChange={(e) => {
                    const params = new URLSearchParams(searchParams);
                    params.set("order", e.target.value);
                    setSearchParams(params);
                  }}
                  className="w-full p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>

              <button
                onClick={() => setShowSortPanel(false)}
                className="w-full mt-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Done
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );

}




