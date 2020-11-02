export class RegisterDto {
  username : string
  password : string
  role : string
} 

export class LoginDto { 
  username : string
  password : string
}

export class ChangePasswordDto {
  username : string
  password : string
}

export class ResetPasswordDto {
  email : string
}

