import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

function CustomerForm({
  customers,
  onCustomerAdded,
  onDuplicate,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(
      /\D/g,
      ""
    );

    if (value.length <= 10) {
      setFormData({
        ...formData,
        phone: value,
      });
    }
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name =
        "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email =
        "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Invalid email format";
    }

    if (!formData.phone) {
      newErrors.phone =
        "Phone is required";
    } else if (
      formData.phone.length !== 10
    ) {
      newErrors.phone =
        "Phone must be 10 digits";
    }

    const duplicate = customers.find(
      (customer) =>
        customer.email ===
          formData.email ||
        customer.phone ===
          formData.phone
    );

    if (duplicate) {
      onDuplicate();
      return false;
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    await axios.post(
      `${API_BASE_URL}/customers`,
      formData
    );

    setFormData({
      name: "",
      email: "",
      phone: "",
    });

    setErrors({});
    onCustomerAdded();
  };

  return (
    <div className="form-container">
      <form
        className="form"
        onSubmit={handleSubmit}
      >
        <div>
          <input
            type="text"
            placeholder="Enter Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
          />
          <p className="error">
            {errors.name}
          </p>
        </div>

        <div>
          <input
            type="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />
          <p className="error">
            {errors.email}
          </p>
        </div>

        <div>
          <input
            type="text"
            placeholder="Enter Phone"
            value={formData.phone}
            onChange={handlePhoneChange}
          />
          <p className="error">
            {errors.phone}
          </p>
        </div>

        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CustomerForm;