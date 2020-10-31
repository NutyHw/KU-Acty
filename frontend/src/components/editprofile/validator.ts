import * as yup from 'yup';

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
