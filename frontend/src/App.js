import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import CustomerForm from "./components/CustomerForm";
import CustomerTable from "./components/CustomerTable";
import "./App.css";
import API_BASE_URL from "./config";

function App() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortState, setSortState] = useState("normal");

  const [message, setMessage] = useState({
    text: "",
    type: "",
  });

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/customers`
      );
      setCustomers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const showMessage = (text, type) => {
    setMessage({ text, type });

    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 2500);
  };

  const handleDelete = async (id) => {
    await axios.delete(
      `${API_BASE_URL}/customers/${id}`
    );
    fetchCustomers();
  };

  const handleSortByName = () => {
    setSortState((prev) =>
      prev === "normal"
        ? "asc"
        : prev === "asc"
        ? "desc"
        : "normal"
    );
  };

  const filteredCustomers = useMemo(() => {
    let data = [...customers];

    if (search.trim()) {
      data = data.filter((customer) =>
        `${customer.name} ${customer.email} ${customer.phone}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (sortState === "asc") {
      data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (sortState === "desc") {
      data.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    }

    return data;
  }, [customers, search, sortState]);

  const totalPages = Math.ceil(
    filteredCustomers.length / rowsPerPage
  );

  const paginatedCustomers =
    filteredCustomers.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );

  return (
    <div className="app">
      <Navbar />

      {message.text && (
        <div className={`popup ${message.type}`}>
          {message.text}
        </div>
      )}

      <CustomerForm
        customers={customers}
        onCustomerAdded={() => {
          fetchCustomers();
          showMessage(
            "Customer added successfully",
            "success"
          );
        }}
        onDuplicate={() =>
          showMessage(
            "Customer already exists",
            "error"
          )
        }
      />

      <div className="table-section">
        <div className="table-top-bar">
          <div className="search-container">
            <span className="search-icon">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search customer..."
              className="search-box"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <CustomerTable
          customers={paginatedCustomers}
          onDelete={handleDelete}
          onSortByName={handleSortByName}
        />

        <div className="pagination-wrapper">
          <div className="pagination-right">
            <select
              className="rows-select"
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(
                  Number(e.target.value)
                );
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>

            <button
              className="page-btn"
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage(currentPage - 1)
              }
            >
              ◀
            </button>

            <span className="page-number">
              {currentPage} /{" "}
              {totalPages || 1}
            </span>

            <button
              className="page-btn"
              disabled={
                currentPage === totalPages ||
                totalPages === 0
              }
              onClick={() =>
                setCurrentPage(currentPage + 1)
              }
            >
              ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;