import React from "react";

function CustomerTable({
  customers,
  onDelete,
  onSortByName,
}) {
  return (
    <div className="table-container">
      <table className="customer-table">
        <thead>
          <tr>
            <th
              onClick={onSortByName}
              style={{ cursor: "pointer" }}
            >
              Name ⇅
            </th>
            <th>Email</th>
            <th>Phone</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() =>
                    onDelete(customer.id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerTable;