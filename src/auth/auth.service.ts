// src/auth/auth.service.ts
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
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
import { UsersService } from './user/user.service';
import { userSignUpDTO } from './dto/user-signup.dto';
import { userLoginDTO } from './dto/user-create.dto';

@Injectable()
export class AuthService {
  constructor(
    // @InjectModel(User.name) private userModel: mongoose.Model<IUser>,
    private jwtService: JwtService,
    private userService: UsersService,

    @InjectModel(User.name) private UserModel: mongoose.Model<User>,
  ) {}

  // async signUpUser(userSignUpDTO): Promise<{ token: string }> {
  async signUpUser(userSignUpDTO: userSignUpDTO): Promise<any> {
    const { name, email, password, phoneNumber } = userSignUpDTO;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      // const user = await this.UserModel.create({
      //   name,
      //   email,
      //   password: hashedPassword,
      //   phoneNumber,
      //   gender,
      //   // role: userSignUpDTO.role,
      // });

      const usersss = await this.UserModel.create({
        ...userSignUpDTO,
        password: hashedPassword,
      });

      // const token = this.jwtService.sign({
      //   id: user._id,
      //   name: user.name,
      //   email: user.email,
      //   phoneNumber: user.phoneNumber,
      //   role: user.Role,
      // });

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

      //again code comented
      const tokens = await this.getTokens(
        usersss.email,
        usersss._id.toString(),
        usersss.email,
        usersss.phoneNumber,
      );
      // console.log('hello');

      await this.updateRefreshToken(usersss.email, tokens.refreshToken);

      return tokens;
      // return { token };
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async updateRefreshToken(email: string, refreshToken: string) {
    // const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    const updateUserDto = {
      refreshToken: refreshToken,
    };
    await this.userService.update(email, updateUserDto);
  }

  async loginUser(userLoginDTO: userLoginDTO): Promise<any> {
    // async loginUser(userLoginDTO): Promise<{ token: string }> {
    const { email, password } = userLoginDTO;

    const user = await this.UserModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Email not found! Please SignUp first');
    }

    const pass = await bcrypt.compare(password, user.password);

    if (!pass) {
      throw new UnauthorizedException('Password is Incorrect! Please Retry');
    }

    const tokens = await this.getTokens(
      user._id.toString(),
      user.name,
      user.email,
      user.phoneNumber,
    );
    await this.updateRefreshToken(user.email, tokens.refreshToken);
    // const token = this.jwtService.sign({
    //   id: user._id,
    //   name: user.name,
    //   email: user.email,
    //   phoneNumber: user.phoneNumber,
    //   role: user.Role,
    // });

    // return { token };
    return tokens;
  }
  async findall(): Promise<User[]> {
    const usER = await this.UserModel.find();

    return usER;
  }

  async findbyid(id: string): Promise<User> {
    // console.log(`${id} from findbyid`);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid Id format');
    }
    const res = await this.UserModel.findById(id);
    if (!res) {
      throw new NotFoundException('user not found');
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
      // console.log(payload.id);

      return this.UserModel.findById(payload.id);
    } catch (e) {
      return null;
    }
  }

  // validation of token end

  async getTokens(
    id: string,
    email: string,
    name: string,
    // role: string,
    phoneNumber: number,
  ) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          name,
          id,
          email,
          // role,
          phoneNumber,
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,

          expiresIn: '10m',
        },
      ),
      this.jwtService.signAsync(
        {
          name,
          id,
          email,
          // role,
          phoneNumber,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  // async logout(token: string): Promise<void> {
  //   console.log('Token received in logout:', token);

  //   const userId = this.extractUserIdFromToken(token);
  //   console.log(`User ID extracted from token: ${userId}`);

  //   if (!mongoose.Types.ObjectId.isValid(userId)) {
  //     console.log('Inside if: Invalid ID format');
  //     throw new BadRequestException('Invalid ID format');
  //   }

  //   try {
  //     await this.userService.removeRefreshToken(userId);
  //   } catch (error) {
  //     console.error('Error during logout:', error);
  //   }
  // }
  async logout(token: string): Promise<void> {
    try {
      await this.userService.removeRefreshToken(token);
    } catch (error) {
      console.error('Error during logout:', error);
      return null;
    }
  }
  extractUserIdFromToken(token: string): string {
    const decodedToken = this.jwtService.decode(token) as any;
    // console.log(decodedToken);

    return decodedToken?.id;
  }
  async refreshTokens(refreshToken: string) {
    // const user = await this.Auth.findByid(userId);
    // try bodam
    await this.userService.verifyTokenExists(refreshToken);

    const userId = this.extractUserIdFromToken(refreshToken);
    // console.log(userId);

    const user = await this.findbyid(userId);
    // console.log(user);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied 1');
    const refreshTokenMatches = user.refreshToken === refreshToken;
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied 2');
    const tokens = await this.getTokens(
      userId,
      user.name,
      user.email,
      user.phoneNumber,
    );
    await this.updateRefreshToken(user.email, tokens.refreshToken);
    return tokens;
    // } catch (error) {
    //   console.error('Error refreshing tokens:', error);
    //   throw new ForbiddenException('Access Denied 3');
    // }
  }
}
