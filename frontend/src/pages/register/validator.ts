import * as yup from 'yup';

export const UserSchema = yup.object().shape({
  username : yup
    .string(),
  password : yup
    .string()
    .min(8,'password must contain more than 8 character'),
    .matches( 
       /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmPassword : yup
    .string()
    .oneOf([ yup.ref('password'), undefined ], 'password not matches')
})

export const OrganizerSchema = yup.object().shape({
  organizer_name : yup
    .string(),
  user : yup
    .string(),
  email : yup
    .string()
    .email(),
  contact : yup
    .string(),
  location : yup
    .string(),
  description : yup
    .string()
})
