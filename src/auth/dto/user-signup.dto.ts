import { isEmpty } from 'rxjs';
import { gender } from '../schema/auth.schema';

export class userSignUpDTO {
  // @isEmpty
  readonly name: string;
  readonly phoneNumber: number;
  readonly email: string;
  readonly password: string;
  readonly Gender: gender;
}
