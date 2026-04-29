const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

let customers = [];

/*
 POST /customers
*/
app.post("/customers", (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const existingCustomer = customers.find(
    (customer) =>
      customer.email === email || customer.phone === phone
  );

  if (existingCustomer) {
    return res.status(400).json({
      message: "Customer already exists",
    });
  }

  const newCustomer = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  customers.push(newCustomer);

  res.status(201).json({
    message: "Customer added successfully",
    customer: newCustomer,
  });
});

/*
 GET /customers
*/
app.get("/customers", (req, res) => {
  res.json(customers);
});

/*
 DELETE /customers/:id
*/
app.delete("/customers/:id", (req, res) => {
  const { id } = req.params;

  customers = customers.filter(
    (customer) => customer.id !== id
  );

  res.json({
    message: "Customer deleted successfully",
  });
});

// FOR VERCEL
module.exports = app;