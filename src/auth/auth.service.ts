// src/auth/auth.service.ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
// import { User, IUser } from '../user/user.model';
import { User } from './schema/auth.schema';
import * as bcrypt from 'bcryptjs';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    // @InjectModel(User.name) private userModel: mongoose.Model<IUser>,
    private jwtService: JwtService,

    @InjectModel(User.name) private UserModel: mongoose.Model<User>,
  ) {}

  async signUpUser(userSignUpDTO): Promise<{ token: string }> {
    const { name, email, password, phoneNumber, gender } = userSignUpDTO;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await this.UserModel.create({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        gender,
        role: userSignUpDTO.role,
      });

      const token = this.jwtService.sign({
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.Role,
      });

      // const response = {
      //   data: {
      //     user: {
      //       _id: mongoose.Types.ObjectId,
      //       email: user.email,
      //       name: user.name,
      //       roles: user.Role,
      //     },
      //     tokens: {
      //       accessToken: token,
      //     },
      //   },
      // };

      return { token };
      // return { token };
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async loginUser(userLoginDTO): Promise<{ token: string }> {
    const { email, password } = userLoginDTO;

    const user = await this.UserModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Email not found! Please SignUp first');
    }

    const pass = await bcrypt.compare(password, user.password);

    if (!pass) {
      throw new UnauthorizedException('Password is Incorrect! Please Retry');
    }
    const token = this.jwtService.sign({
      id: user._id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.Role,
    });

    return { token };
  }
  async findall(): Promise<User[]> {
    const usER = await this.UserModel.find();

    return usER;
  }

  async findbyid(id: string): Promise<User> {
    const res = await this.UserModel.findById(id);
    if (!res) {
      throw new NotFoundException('book not found');
    }
    return res;
  }
  async findbyidandupdate(id: string, User: User): Promise<User> {
    const res = await this.UserModel.findByIdAndUpdate(id, User, {
      new: true,
      runValidators: true,
    });
    if (!res) {
      throw new NotFoundException('id not found');
    }
    return res;
  }
  async findbyidanddelete(id: string): Promise<User> {
    const res = await this.UserModel.findByIdAndDelete(id);
    if (!res) {
      throw new NotFoundException('id not found');
    }
    return res;
  }
  // async registerUser(username: string, password: string): Promise<IUser> {
  //   const user = new this.userModel({ username, password });
  //   return user.save();
  // }

  // async loginUser(
  //   username: string,
  //   password: string,
  // ): Promise<{ accessToken: string; refreshToken: string }> {
  //   const user = await this.userModel.findOne({ username });
  //   if (user && user.comparePassword(password)) {
  //     const payload = { username: user.username, sub: user._id };
  //     const accessToken = this.jwtService.sign(payload, { expiresIn: '60m' });
  //     const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
  //     return { accessToken, refreshToken };
  //   }
  //   return null;
  // }

  // validation of token

  async validateToken(token: string): Promise<User> {
    try {
      // const payload = this.jwtService.verify(token, {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      console.log(payload.id);

      return this.UserModel.findById(payload.id);
    } catch (e) {
      return null;
    }
  }

  // validation of token end
}
