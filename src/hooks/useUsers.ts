// import { useEffect, useState } from "react";
// import type { User } from "../types/user";


// export const useUsers = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("https://randomuser.me/api/?results=5000&seed=admin")
//       .then(res => res.json())
//       .then(data => {
//         console.log("Users fetched:", data.results.length);
//         const enhanced = data.results.map((u: any) => ({
//           ...u,
//           status: Math.random() > 0.5 ? "Active" : "Inactive",
//         }));
//         setUsers(enhanced);
//         setLoading(false);
//       });
//   }, []);

//   return { users, setUsers, loading };
// };


import { useEffect, useState } from "react";
import type { User } from "../types/user";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/users.json")
      .then(res => res.json())
      .then(data => {
        const enhanced = data.results.map((u: any) => ({
          ...u,
          status: Math.random() > 0.5 ? "Active" : "Inactive",
        }));

        console.log("Users loaded:", enhanced.length);

        setUsers(enhanced);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { users, setUsers, loading };
};

