const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Contact = require("./models/Contact");

const app = express();

// Middleware
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });


// ===============================
// POST /contacts
// Add a new contact
// ===============================
app.post("/contacts", async (req, res) => {
  try {
    const contact = new Contact(req.body);

    const savedContact = await contact.save();

    res.status(201).json({
      message: "Contact created successfully",
      contact: savedContact
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create contact",
      error: error.message
    });
  }
});


// ===============================
// GET /contacts
// Get all contacts
// ===============================
app.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch contacts",
      error: error.message
    });
  }
});


// ===============================
// GET /contacts/:id
// Get a contact by ID
// ===============================
app.get("/contacts/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found"
      });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json({
      message: "Invalid contact ID",
      error: error.message
    });
  }
});


// ===============================
// PUT /contacts/:id
// Update a contact
// ===============================
app.put("/contacts/:id", async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedContact) {
      return res.status(404).json({
        message: "Contact not found"
      });
    }

    res.status(200).json({
      message: "Contact updated successfully",
      contact: updatedContact
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update contact",
      error: error.message
    });
  }
});


// ===============================
// DELETE /contacts/:id
// Delete a contact
// ===============================
app.delete("/contacts/:id", async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);

    if (!deletedContact) {
      return res.status(404).json({
        message: "Contact not found"
      });
    }

    res.status(200).json({
      message: "Contact deleted successfully",
      contact: deletedContact
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to delete contact",
      error: error.message
    });
  }
});