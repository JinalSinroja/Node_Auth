import mongoose from 'mongoose';
import { MONGODB_URL } from './config.js';

const connectDB = () => {
  try {
    //Setting up Mongoose
    const dbUrl = MONGODB_URL;
    mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      console.log('Connected to MongoDB');
    });
  } catch (e) {
    console.log('Error', e);
    process.exit(-1);
  }
};

export default connectDB;
