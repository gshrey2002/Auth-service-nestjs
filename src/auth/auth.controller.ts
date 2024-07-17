// src/auth/auth.controller.ts
// import { createParamDecorator, ExecutionContext, ExecutionContext, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { User } from './schema/auth.schema';
import { userSignUpDTO } from './dto/user-signup.dto';
import { userLoginDTO } from './dto/user-create.dto';
import { GetToken } from './decorator/get-token.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class SignedUpController {
  constructor(private authService: AuthService) {}

  @Get()
  async userFindAll(): Promise<User[]> {
    return this.authService.findall();
  }
  @Post('/sign-up')
  async createUser(
    @Body()
    SignUp: userSignUpDTO,
  ): Promise<{ token: string | any }> {
    // ): Promise< User[] > {
    return this.authService.signUpUser(SignUp);
  }
  @Get('/login')
  async loginUser(
    @Body()
    login: userLoginDTO,
  ): Promise<{ token: string }> {
    return this.authService.loginUser(login);
  }

  @Get('id/:id')
  @UseGuards(AuthGuard('jwt'))
  async findbyid(
    @Param('id')
    id: string,
  ): Promise<User> {
    return this.authService.findbyid(id);
  }

  @Put('id/:id')
  async updateUser(
    @Param('id')
    id: string,
    @Body()
    SignUp: userSignUpDTO,
  ): Promise<User> {
    return this.authService.findbyidandupdate(id, SignUp);
  }

  @Delete('id/:id')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(
    @Param('id')
    id: string,
  ): Promise<User> {
    return this.authService.findbyidanddelete(id);
  }

  // validate token route
  @Post('validate')
  async validateToken(@Body('token') token: string) {
    const user = await this.authService.validateToken(token);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }

  @Get('logout')
  async logout(@Req() req: Request): Promise<{ message: string }> {
    const authHeader = req.headers['authorization'] as string | undefined;
    console.log('Authorization Header:', authHeader);

    if (!authHeader) {
      throw new UnauthorizedException('No authorization header provided');
    }

    const token = authHeader.split(' ')[1];
    console.log('Extracted Token:', token);

    if (!token) {
      throw new UnauthorizedException('Invalid authorization header format');
    }

    await this.authService.logout(token);

    return { message: 'Successfully logged out' };
  }

  // @Get('logout')
  // logout(@Req() req: Request) {
  //   this.authService.logout(req.user['sub']);
  // }
  // @Get('/logout')
  // async logout(@GetToken() token: string): Promise<{ message: string }> {
  //   if (!token) {
  //     throw new UnauthorizedException('No authorization token provided');
  //   }

  //   await this.authService.logout(token);

  //   return { message: 'Successfully logged out' };
  // }

  // validate token end
}

// @Controller()
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @MessagePattern({ cmd: 'register' })
//   async registerUser(data: any) {
//     const user = await this.authService.registerUser(
//       data.username,
//       data.password,
//     );
//     return {
//       code: '10000',
//       status: 200,
//       message: 'success',
//       data: { user },
//     };
//   }

//   @MessagePattern({ cmd: 'login' })
//   async loginUser(data: any) {
//     const tokens = await this.authService.loginUser(
//       data.username,
//       data.password,
//     );
//     if (tokens) {
//       return {
//         code: '10000',
//         status: 200,
//         message: 'success',
//         data: {
//           tokens,
//         },
//       };
//     }
//     return {
//       code: '10001',
//       status: 401,
//       message: 'Invalid credentials',
//     };
//   }
// }
