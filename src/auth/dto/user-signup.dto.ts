// import { isEmpty } from 'rxjs';
import { gender, role } from '../schema/auth.schema';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class userSignUpDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsPhoneNumber('IN')
  readonly phoneNumber: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  readonly Gender: gender;

  @IsNotEmpty()
  readonly Role: role = role.Reader;
}
