const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    contactId: {
      type: String,
      unique: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    phone: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    }
  },
  {
    timestamps: true
  }
);

// Automatically generate contactId before saving
contactSchema.pre("save", async function () {
  if (!this.isNew || this.contactId) {
    return;
  }

  const lastContact = await mongoose
    .model("Contact")
    .findOne()
    .sort({ createdAt: -1 });

  let nextNumber = 1;

  if (lastContact && lastContact.contactId) {
    const lastNumber = parseInt(
      lastContact.contactId.replace("CNT", ""),
      10
    );

    if (!isNaN(lastNumber)) {
      nextNumber = lastNumber + 1;
    }
  }

  this.contactId = `CNT${String(nextNumber).padStart(3, "0")}`;
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;