import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { RegisterDto, LoginDto, ChangePasswordDto } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../users/schemas/users.schema';
import * as bcrypt from 'bcrypt';
//import * as nodemailer from 'nodemailer';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrganizersService } from '../organizers/organizers.service'; 
import { email } from './config/constant';

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

  async changePassword( changePasswordDto : ChangePasswordDto ) : Promise<boolean> {
    const res = await this.userModel.updateOne
    (
      { username : changePasswordDto.username }, 
      { password : changePasswordDto.password }
    ).exec()

    if ( res.nModified === 0 ){
      throw new HttpException('username not found in database',HttpStatus.BAD_REQUEST);
    }

    return true;
  }

  //async sendMail ( toMail : string, url : string ) : Promise<boolean> {
    //try{
      //const transporter = nodemailer.createTransport(
        //''.concat('smtps//',email.user,'%40gmail.com:',email.password,'@smtp.gmail.com')
      //)
      //const mailOption = {
        //from : email.user,
        //to : toMail,
        //subject : 'reset password',
        //html : 'reset password url <a>' + url + '</a'
      //}
      //const res = await transporter.sendMail(mailOption)
      //return true;
    //} catch ( err ) {
      //return false;
    //}
  //}

  async resetPassword( email : string ) : Promise<any> {
    const record = await this.organizersService.findEmail(email)
    if ( !record ) {
      throw new HttpException('email not found in database', HttpStatus.BAD_REQUEST);
    }
    //const sendMailRes = await this.sendMail( 'nattaphum.sa@ku.th', 'https://www.google.com/' )
  }
}
