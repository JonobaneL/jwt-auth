import { useEffect, useState } from "react";
import { User } from "./models/authResponse";
import UserService from "./services/UserService";
import { Button } from "./components/ui/button";

function App() {
  const [users, setUsers] = useState<User[]>();

  const handler = async () => {
    const res = await UserService.fetchUsers();
    if (res) {
      setUsers(res.data);
    }
  };
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-700 text-center">Users</h1>
      <Button onClick={handler} className="my-3 block mx-auto">
        Show users
      </Button>
      {users ? (
        <ul className="w-2/3 border rounded-md block mx-auto mt-2 p-4 divide-y space-y-3">
          {users?.map((item) => (
            <li key={item.id} className="grid grid-cols-2 pt-3">
              <p>{item.email}</p>
              <p>Active: {item.isActive ? "Yes" : "No"}</p>
            </li>
          ))}
        </ul>
      ) : (
        <h2 className="text-lg text-gray-700 text-center mt-4">
          Users unavailable for unauthorized user
        </h2>
      )}
    </div>
  );
}

export default App;
