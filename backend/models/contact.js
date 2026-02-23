import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Define a new 'ContactSchema'
const ContactSchema = new Schema({
  contactId: { type: String, unique: true, required: true },
  name: String,
  email: String,
  phone: String,
  address: String
});

// Create the 'Contact' model out of the 'ContactSchema'
const Contact = mongoose.model('Contact', ContactSchema);

// Export the 'Contact' model
export default Contact;