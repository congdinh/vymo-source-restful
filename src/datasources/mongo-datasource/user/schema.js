import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import generateModel from '../../generates/generateModel';

const schema = {
  name: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: [true, 'Name required'],
    minlength: [3, 'Minimum name length 3 characters'],
    maxlength: [30, 'Minimum name length 30 characters']
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    required: [true, 'Email required'],
    validate: [isEmail, 'Invalid email']
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone required'],
    minlength: [10, 'Minimum phone length 10 characters'],
    validate: [isMobilePhone, 'Invalid phone number']
  },
  address: {
    type: String,
    required: [true, 'Address required']
  },
  dob: {
    type: String,
    required: [true, 'DOB required']
  }
};

export default generateModel({
  schema,
  modelName: 'User',
  collectionName: 'users'
});
