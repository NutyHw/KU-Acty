export type User = {
  username : string
  password : string
  confirmPassword : string
}

export type Organizer = {
  organizer_name : string
  user : string
  email : string
  contact : string
  location : string
  description : string
}

type fileUpload = {
  file : FormData
}
