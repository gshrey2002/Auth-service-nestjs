// src/auth/auth.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { User } from './schema/auth.schema';
import { userSignUpDTO } from './dto/user-signup.dto';
import { userLoginDTO } from './dto/user-create.dto';

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
    return this.authService.signUpUser(SignUp);
  }
  @Get('/login')
  async loginUser(
    @Body()
    login: userLoginDTO,
  ): Promise<{ token: string }> {
    return this.authService.loginUser(login);
  }

  @Get(':id')
  async findbyid(
    @Param('id')
    id: string,
  ): Promise<User> {
    return this.authService.findbyid(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id')
    id: string,
    @Body()
    SignUp: userSignUpDTO,
  ): Promise<User> {
    return this.authService.findbyidandupdate(id, SignUp);
  }

  @Delete(':id')
  async deleteUser(
    @Param('id')
    id: string,
  ): Promise<User> {
    return this.authService.findbyidanddelete(id);
  }
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
