import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schema/auth.schema';
import mongoose from 'mongoose';
import { userLoginDTO } from '../dto/user-create.dto';
import { refreshToken } from '../refreshToken.strategy';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private UserModel: mongoose.Model<User>,
  ) {}

  async update(
    email: string,
    updateUserDto: Partial<userLoginDTO>,
  ): Promise<User> {
    return this.UserModel.findOneAndUpdate(
      { email }, // Find user by email
      { $set: updateUserDto }, // Set the fields to update
      { new: true }, // Return the updated document
    ).exec();
  }
  // async removeRefreshToken(token: string): Promise<void> {
  //   // Logic to find the user by token and remove the token
  //   // This example assumes refreshToken is a field in the User schema
  //   await this.UserModel.updateOne(
  //     { refreshToken: token },
  //     { $unset: { refreshToken: '' } },
  //   ).exec();
  // }

  //new logic
  // async removeRefreshToken(token: string, id: string): Promise<void> {
  async removeRefreshToken(token: string): Promise<void> {
    // Verify the token exists
    await this.verifyTokenExists(token);

    try {
      const result = await this.UserModel.updateOne(
        { refreshToken: token },
        { $unset: { refreshToken: '' } },
      ).exec();

      if (result.matchedCount === 0) {
        console.log('No user found with the given refreshToken.');
      } else {
        console.log(
          'Refresh token removed successfully. Update result:',
          result,
        );
      }
    } catch (error) {
      console.error('Error in removeRefreshToken:', error);
      throw error;
    }
  }

  async verifyTokenExists(token: string): Promise<void> {
    const user = await this.UserModel.findOne({ refreshToken: token }).exec();
    if (user) {
      console.log('User with refreshToken found:', user);
    } else {
      console.log('No user found with the given refreshToken.');
    }
  }
}
