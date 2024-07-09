import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum gender {
  Male = 'male',
  Female = 'female',
}

@Schema({
  timestamps: true,
})
export class SignUp {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phoneNumber: number;

  @Prop({ unique: [true, 'duplicate Email address'] })
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: gender })
  Gender: gender;
}

export const signupSchema = SchemaFactory.createForClass(SignUp);
