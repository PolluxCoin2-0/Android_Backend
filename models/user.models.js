import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    walletAddress: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  });

  const User = new mongoose.model("User", userSchema);
export default User;