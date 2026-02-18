export interface User {
  gender: string;
  email: string;
  status: "Active" | "Inactive";
  name: {
    first: string;
    last: string;
  };
  login: {
    uuid: string;
  };
  picture: {
    thumbnail: string;
  };
}
