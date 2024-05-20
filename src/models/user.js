import mongoose from 'mongoose'
import { capitalizeName, validatePassword } from '../../helpers/validationRegex.js';

const userSchema = mongoose.Schema({
    id: {type: String, required: true},
    user_id: {type: String, required: false},
    name: {type: String, required: true, set: capitalizeName},
    email: {type: String, required: true, validate: {
        validator: function(v) {
            return /\S+@\S+\.\S+/.test(v);
        },
        message: props => `${props.value} is not a valid email address!`
    }},
    password: {
        type: String,
        required: true,
        validate: {
          validator: validatePassword,
          message: 'Password must have at least 6 characters and contain at least one number'
      }
      }
})

export default mongoose.model("User", userSchema)