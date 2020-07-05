const verify = require('../utils/verification');

const verifyEnrollmentData = (req, res, next) => {
  const errors = {};
  const { constituency, name, surname, relative, relation, dob,
    gender, address, disability, email, mobile } = req.body;

  if (verify.isEmpty(constituency)) {
    errors.constituency = "Name of constituency is required.";
  }
  else if (!verify.isDistrict(constituency)) {
    errors.constituency = "Name of constituency has invalid character(s). Only alpha-numeric characters and spaces are allowed.";
  }

  if (verify.isEmpty(name)) {
    errors.name = "Name is required.";
  }
  else if (!verify.isName(name)) {
    errors.name = "Name has invalid character(s). Only alphabets and spaces are allowed.";
  }

  if (verify.isEmpty(surname)) {
    errors.surname = "Surname is required.";
  }
  else if (!verify.isName(surname)) {
    errors.surname = "Surname has invalid character(s). Only alphabets and spaces are allowed.";
  }

  if (verify.isEmpty(relative)) {
    errors.relative = "Relative's name is required.";
  }
  else if (!verify.isName(relative)) {
    errors.relative = "Relative's name has invalid character(s). Only alphabets and spaces are allowed.";
  }

  if (verify.isEmpty(relation)) {
    errors.relation = "Relation with relative is required.";
  }
  else if (!verify.isRelation(relation)) {
    errors.relation = "Relation has invalid character(s). Only alphabets and spaces are allowed.";
  }

  if (verify.isEmpty(dob)) {
    errors.dob = "Date of birth is required.";
  }
  else if (!verify.isDate(dob)) {
    errors.dob = "Invalid date format. Must be in YYYY-MM-DD format.";
  }

  if (verify.isEmpty(gender)) {
    errors.gender = "Gender is required";
  }
  else if (!verify.isGender(gender)) {
    errors.gender = "Invalid gender. Only 'male', 'female' or 'third gender' are allowed."
  }

  if (!verify.isEmpty(disability) && !verify.isString(disability)) {
    errors.disability = "Disability type has invalid character(s). Only alphabets and spaces are allowed.";
  }

  if (!verify.isEmpty(email) && !verify.isEmail(email)) {
    errors.email = "Invalid email address.";
  }

  if (!verify.isEmpty(mobile) && !verify.isMobile(mobile)) {
    errors.mobile = "Invalid mobile number. Must be in XXX-XXX-XXXX format.";
  }

  for (const addr in address) {
    const { house, area, block, post, pin, district, state } = address[addr];
    const addressErrors = {};
    
    if (!verify.isEmpty(house) && !verify.isHouseNumber(house)) {
      addressErrors.house = "Invalid house number. Can contain digits only.";
    }

    if (verify.isEmpty(area)) {
      addressErrors.area = "Name of street/area/locality is required.";
    }
    else if (!verify.isLocality(area)) {
      addressErrors.area = "Street/Area/Locality has invalid character(s). Only alpha-numeric characters, '.', ',' and '-' are allowed.";
    }

    if (verify.isEmpty(block)) {
      addressErrors.block = "Name of town/village is required.";
    }
    else if (!verify.isBlock(block)) {
      addressErrors.block = "Name of town/village has invalid character(s). Only alphabets and spaces are allowed.";
    }

    if (verify.isEmpty(post)) {
      addressErrors.post = "Name of post office is required.";
    }
    else if (!verify.isPost(post)) {
      addressErrors.post = "Name of post office has invalid character(s). Only alphabets and spaces are allowed.";
    }

    if (verify.isEmpty(pin)) {
      addressErrors.pin = "PIN is required.";
    }
    else if (!verify.isPin(pin)) {
      addressErrors.pin = "PIN has invalid character(s). Can contain 6 digits only.";
    }

    if (verify.isEmpty(district)) {
      addressErrors.district = "District is required.";
    }
    else if (!verify.isDistrict(district)) {
      addressErrors.district = "Name of district has invalid character(s). Only alpha-numeric characters and spaces are allowed.";
    }

    if (verify.isEmpty(state)) {
      addressErrors.state = "State is required.";
    }
    else if (!verify.isState(state)) {
      addressErrors.state = "Name of state has invalid character(s). Only alpha-numeric characters and spaces are allowed.";
    }

    if (Object.keys(addressErrors).length !== 0) {
      errors.address = { ...errors.address, [addr]: addressErrors };
    }
  }

  if (Object.keys(errors).length === 0) {
    next();
    return;
  }
  res.json({ errors });
}

module.exports = { verifyEnrollmentData };
