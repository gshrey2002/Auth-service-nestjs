// src/auth/auth.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User, IUser } from '../user/user.model';
import { SignUp } from './schema/auth.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<IUser>,
    private jwtService: JwtService,

    @InjectModel(SignUp.name) private signupModel: mongoose.Model<SignUp>,
  ) {}

  async findall(): Promise<SignUp[]> {
    const usER = await this.signupModel.find();

    return usER;
  }
  async createuser(SignUp: SignUp): Promise<SignUp> {
    const res = await this.signupModel.create(SignUp);
    return res;
  }
  async findbyid(id: string): Promise<SignUp> {
    const res = await this.signupModel.findById(id);
    if (!res) {
      throw new NotFoundException('book not found');
    }
    return res;
  }
  async findbyidandupdate(id: string, signup: SignUp): Promise<SignUp> {
    const res = await this.signupModel.findByIdAndUpdate(id, signup, {
      new: true,
      runValidators: true,
    });
    if (!res) {
      throw new NotFoundException('id not found');
    }
    return res;
  }
  async findbyidanddelete(id: string): Promise<SignUp> {
    const res = await this.signupModel.findByIdAndDelete(id);
    if (!res) {
      throw new NotFoundException('id not found');
    }
    return res;
  }
  async registerUser(username: string, password: string): Promise<IUser> {
    const user = new this.userModel({ username, password });
    return user.save();
  }

  async loginUser(
    username: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userModel.findOne({ username });
    if (user && user.comparePassword(password)) {
      const payload = { username: user.username, sub: user._id };
      const accessToken = this.jwtService.sign(payload, { expiresIn: '60m' });
      const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
      return { accessToken, refreshToken };
    }
    return null;
  }
}
