import { useEffect, useState } from "react";
import { useAdminStore } from "../store/useAdminStore";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";

const AdminDashboard = () => {
  const {
    filteredUsers,
    isLoading,
    users,
    totalUserPages,
    getUsers,
    searchUser,
  } = useAdminStore();
  const { authUser } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getUsers(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setTimeout(() => {
      searchUser(search);
    }, 1000);
  }, [search]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black text-white">
        <AiOutlineLoading3Quarters className="size-7 animate-spin" />
      </div>
    );
  }

  const usersToBeMappped = filteredUsers ? filteredUsers : users;

  return (
    <div className="flex flex-col items-center justify-center bg-black w-screen h-screen">
      <h1 className="text-4xl">Admin Dashboard</h1>
      <h2 className="text-2xl">Logged in as {authUser?.fullName}</h2>
      <div className="rounded-lg w-lg container mt-20">
        <div>
          <div className="flex justify-between mb-3">
            <div className="inline-flex items-center gap-2">
              <h2 className="text-2xl">Users</h2>
              <input
                type="text"
                className="p-1 border rounded-lg"
                placeholder="Username / _id"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Link
              to={"/manage-products"}
              className="text-2xl text-green-200 hover:text-green-400 transition underline inline-flex items-center gap-1"
            >
              Manage Products <FaArrowRight className="size-5" />
            </Link>
          </div>
          {usersToBeMappped.map((user) => (
            <div
              key={user._id}
              className="border p-2 rounded-lg mb-2 flex justify-between"
            >
              <div>
                <p>Name: {user.fullName}</p>
                <p>Email: {user.email}</p>
                <p>Role: {user.isBanned ? "Banned" : "Active"}</p>
              </div>
              <Link
                className="text-green-300 underline"
                to={`/user-activity/${user._id}`}
              >
                Activity
              </Link>
            </div>
          ))}

          <div>
            {Array.from({ length: totalUserPages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`${
                    page === currentPage
                      ? "bg-green-300 text-white"
                      : "bg-white text-green-300"
                  } px-3 py-1 rounded-lg mr-2 cursor-pointer`}
                >
                  {page}
                </button>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
