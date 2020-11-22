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
  oldPassword : string
  newPassword : string
  confirmNewPassword : string
}

export class ResetPasswordDto {
  username : string
}

