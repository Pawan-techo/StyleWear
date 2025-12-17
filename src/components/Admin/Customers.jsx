import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../state/Auth/Action";

const Customers = () => {
  const dispatch = useDispatch();
  const { users, jwt, isLoading } = useSelector((store) => store.auth);

  const [search, setSearch] = useState("");

  useEffect(() => {
    if (jwt) {
      dispatch(getAllUsers(jwt));
    }
  }, [dispatch, jwt]);

  const filteredCustomers = users.filter((u) =>
    `${u.firstName} ${u.lastName} ${u.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Customers ({users.length})
        </h2>

        <input
          type="text"
          placeholder="Search customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full md:w-64"
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-md overflow-x-auto">
        {isLoading ? (
          <div className="p-6 text-center text-gray-500">
            Loading customers...
          </div>
        ) : filteredCustomers.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No customers found
          </div>
        ) : (
          <table className="w-full border-collapse min-w-[900px]">
            <thead className="bg-gray-100 border border-gray-300 text-gray-700">
              <tr>
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Mobile</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Joined</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((u, index) => (
                <tr
                  key={u._id}
                  className="shadow-md hover:bg-gray-50 transition"
                >
                  <td className="p-4">{index + 1}</td>

                  <td className="p-4 font-medium">
                    {u.firstName} {u.lastName}
                  </td>

                  <td className="p-4">{u.email}</td>

                  <td className="p-4">{u.mobile || "—"}</td>

                  <td className="p-4 capitalize">
                    {u.role || "customer"}
                  </td>

                  <td className="p-4">
                    {u.isBlocked ? (
                      <span className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-700">
                        Blocked
                      </span>
                    ) : (
                      <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700">
                        Active
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-sm text-gray-600">
                    {new Date(u.createdAt).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default memo(Customers);
