import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum gender {
  Male = 'male',
  Female = 'female',
}
export enum role {
  Reader = 'reader',
  Poster = 'Poster',
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phoneNumber: number;

  // @Prop({ unique: [true, 'duplicate Email address'] })
  // @Prop({ required: true })
  // email: string;
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: gender })
  Gender: gender;

  @Prop({ enum: role, default: role.Reader })
  Role: role;

  @Prop()
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
