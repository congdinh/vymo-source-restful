import Validator from 'fastest-validator';

import config from '../configs';
import { SORT_TYPE } from '../configs/constant';
import generateDS from '../datasources';
const { User } = generateDS;

const validateCreateUser = new Validator().compile({
  $$strict: true, // no additional properties allowed

  name: { type: 'string', min: 3, max: 30, trim: true, lowercase: true },
  email: { type: 'email' },
  phoneNumber: { type: 'string', min: 10 },
  address: { type: 'string', min: 1, max: 30, optional: true },
  dob: { type: 'string', min: 1, max: 30, optional: true }
});

/*
 * GET: Latest User
 */
export const getUser = async (req, res) => {
  let result = {
    statusCode: 200,
    message: 'Success'
  };
  try {
    const docs = await User.filterAndPaging(
      {
        orderBy: { createdAt: SORT_TYPE.DESC },
        query: {},
        limit: 1,
        skip: 0
      },
      config.cache.ttlQuery
    );

    result = {
      ...result,
      ...docs
    };
  } catch (error) {
    result.statusCode = 404;
    result.message = error.message;
  }
  return res.status(200).json(result);
};

/*
 * GET: List user by query
 */
export const getUsers = async (req, res) => {
  let result = {
    statusCode: 200,
    message: 'Success',
    data: []
  };
  try {
    let { orderBy, where = {}, limit = 20, skip = 0 } = req.body;
    if (limit > config.limitQuerySize) limit = config.limitQuerySize;
    const { email, name, ...other } = where;
    const query = {
      ...other
    };

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }
    if (email) {
      query.email = { $regex: email, $options: 'i' };
    }

    const docs = await User.filterAndPaging(
      {
        orderBy,
        query,
        limit,
        skip
      },
      config.cache.ttlQuery
    );

    result = {
      ...result,
      ...docs
    };
  } catch (error) {
    result.statusCode = 404;
    result.message = error.message;
  }
  return res.status(200).json(result);
};

/*
 * POST: Create User
 */
export const createUser = async (req, res) => {
  const result = {
    statusCode: 200,
    message: 'Success'
  };

  try {
    const validateInput = await validateCreateUser(req.body);
    if (validateInput?.length) throw new Error(validateInput.map(item => item.message).join(','));

    const { name, email, ...info } = req.body;

    const existingUser = await User.collection.exists({
      $or: [{ name }, { email }]
    });
    if (existingUser) {
      throw new Error('Name or email already used');
    }

    const doc = await User.create(
      {
        ...info,
        name,
        email
      },
      config.cache.ttlId
    );
    if (doc) delete doc.password;

    result.data = doc;
  } catch (error) {
    result.statusCode = 404;
    result.message = error.message;
  }
  return res.status(200).json(result);
};
