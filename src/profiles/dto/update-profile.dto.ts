import { IsString, Length, Min } from 'class-validator';

export class UpdateProfileDTO {
  @IsString()
  @Length(3, 100)
  name: string;

  @IsString()
  description: string;
}
