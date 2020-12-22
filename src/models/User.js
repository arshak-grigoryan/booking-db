const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  position_id: {
    type: Schema.Types.ObjectId,
    ref: 'Position',
  },
  team_id: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
  },
  is_admin: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    select: false,
  },
  invitation_token: {
    type: String,
  },
  password_recovery_token: {
    type: String,
  },
  password_recovery_exp: {
    type: Number,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});

// UserSchema.pre('save', async (next) => {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(this.password, salt);
//     this.password = hashedPassword;
//     next();
//   } catch (e) {
//     next(e);
//   }
// });

UserSchema.methods.isValidPassword = async (password) => {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (e) {
    throw new Error(e);
  }
};

module.exports = mongoose.model('user', UserSchema);
