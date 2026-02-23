import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Dynamically load the configuration file based on NODE_ENV
const env = process.env.NODE_ENV || 'development';

const configObj = {
  development: {
    db: process.env.MONGO_URI || 'mongodb://localhost:27017/hands-on-test-db-2025',
  },
};

// Export the configuration for the current environment
export default configObj[env];