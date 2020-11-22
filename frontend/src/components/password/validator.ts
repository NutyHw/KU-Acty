import * as yup from 'yup';

export const ChangePasswordSchema = yup.object().shape({
  oldPassword : yup
    .string()
    .min(8,'password must contain more than 8 character'),
  newPassword : yup
    .string()
    .min(8,'password must contain more than 8 character'),
  newConfirmPassword : yup
    .string()
    .oneOf([ yup.ref('newPassword'), undefined ], 'password not matches')
})

