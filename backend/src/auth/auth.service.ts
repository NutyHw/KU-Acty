import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { RegisterDto, LoginDto, ChangePasswordDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../users/schemas/users.schema';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrganizersService } from '../organizers/organizers.service'; 
import { email } from './config/constant';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService : JwtService,
    @InjectModel(User.name) private userModel : Model<UserDocument> ,
    private readonly organizersService : OrganizersService
  ) {};

  saltRound = 10;

  async hashPassword(password : string) : Promise<string> {
    return await bcrypt.hash(password, this.saltRound);
  }

  async register( userDto : RegisterDto ) : Promise<User> {
    userDto.password = await this.hashPassword(userDto.password);
    userDto.role = 'organizer';
    const user = await this.userModel.findOne({ username : userDto.username });

    if ( user ){
      throw new HttpException('username already in userd', HttpStatus.BAD_REQUEST) 
    }

    return new this.userModel(userDto).save();
  }

  async login( loginDto : LoginDto ) : Promise<{ access_token : string, role : string }> {
    const user = await this.userModel.findOne({ username : loginDto.username });

    if ( !user ){
      throw new HttpException('username or password not match', HttpStatus.BAD_REQUEST)
    }

    const match = await bcrypt.compare(loginDto.password, user.password);
    if ( !match ){
      throw new HttpException('username or password not match', HttpStatus.BAD_REQUEST)
    }

    const payload = await this.createPayload(user.username, user._id, user.role );
    return { 
      access_token : payload.access_token,
      role : user.role
    };
  }

  async createPayload(username : string , userId : string, role : string) : Promise<{ access_token : string }>{
    const payload = { username : username, userId : userId , role : role }
    return {
      access_token : this.jwtService.sign(payload)
    }
  }

  async changePassword( changePasswordDto : ChangePasswordDto, userId : string ) : Promise<boolean> {
    const hashNewPassword = await this.hashPassword(changePasswordDto.newPassword);

    const res = await this.userModel.findOne({ _id : Types.ObjectId(userId) })

    console.log(changePasswordDto.oldPassword)
    const match = await bcrypt.compare(changePasswordDto.oldPassword, res.password)

    if ( !match ){
      throw new HttpException('password not match',HttpStatus.BAD_REQUEST)
    }

    const res2 = await this.userModel.updateOne({ _id : Types.ObjectId(userId) }, { $set : { password : hashNewPassword } })

    if ( res2.nModified === 0 ){
      throw new HttpException('username not found in database',HttpStatus.BAD_REQUEST);
    }

    return true;
  }

  async sendMail ( toMail : string, url : string ) : Promise<boolean> {
    try{
      const transporter = nodemailer.createTransport({
        host : 'smtp.gmail.com',
        port : 465,
        secure : true,
        auth : {
          user : email.user,
          pass : email.password
        }
      } as SMTPTransport.Options )

      const mailOption = {
        from : email.user,
        to : toMail,
        subject : 'reset password',
        html : 'reset password url <a>' + url + '</a>'
      }
      await transporter.sendMail(mailOption)
      return true;
    } catch ( err ) {
      return false;
    }
  }

  async resetPassword( username : string ) : Promise<boolean> {
    const user = await this.userModel.findOne({ username : username })
    const record = await this.organizersService.getProfile(String(user._id))

    console.log(record)
    if ( !record ) {
      throw new HttpException('email not found in database', HttpStatus.BAD_REQUEST);
    }

    const token = this.jwtService.sign({ userId : record.user })
    const sendMailRes = await this.sendMail( record.email, 'http://localhost:8080/reset-password/' + token );
    return sendMailRes
  }
}
