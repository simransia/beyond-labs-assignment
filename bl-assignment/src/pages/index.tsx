import { USERS } from "../constant/data";
import { useState } from "react";

const FILTER_OPTIONS = [
  { value: "All" },
  { value: "Active" },
  { value: "Inactive" },
];

export default function Home() {
  const [usersList, setUsersList] = useState(USERS);
  const [searchVal, setSearchVal] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchVal(value);
    if (value.trim() == "") {
      setUsersList(USERS);
      return;
    }
    const newList =
      activeFilter !== "All"
        ? usersList.filter(
            (item) =>
              item.name.toLowerCase().includes(value) &&
              item.status == activeFilter.toLowerCase(),
          )
        : usersList.filter((item) => item.name.toLowerCase().includes(value));
    setUsersList(newList);
  };

  const handleFilterClick = (value: string) => {
    setActiveFilter(value);
    if (value == "All") {
      if (searchVal !== "") {
        const newList = USERS.filter((i) =>
          i.name.toLowerCase().includes(searchVal.toLowerCase()),
        );
        setUsersList(newList);
      } else {
        setUsersList(USERS);
      }
    } else if (value == "Active") {
      setUsersList((prev) => prev.filter((i) => i.status === "active"));
    } else if (value == "Inactive") {
      setUsersList((prev) => prev.filter((i) => i.status === "inactive"));
    }
  };

  return (
    <div className="p-5 bg-blue-100">
      <div className="flex gap-5 items-center">
        <input
          value={searchVal}
          onChange={(e) => handleChange(e)}
          className="w-60 h-6 border-2 border-black"
        />
        {FILTER_OPTIONS.map((item, index) => (
          <button
            key={index}
            className={`border border-gray-500 px-4 cursor-pointer ${item.value == activeFilter ? "bg-cyan-400" : ""}`}
            onClick={() => handleFilterClick(item.value)}
          >
            {item.value}
          </button>
        ))}
      </div>
      <div className="mt-8">
        {usersList.length > 0
          ? usersList.map((user, index) => (
              <div key={index} className="flex gap-4 mb-4">
                <p>Name: {user.name}</p>
                <p>Status: {user.status}</p>
              </div>
            ))
          : "“No results found”"}
      </div>
    </div>
  );
}
