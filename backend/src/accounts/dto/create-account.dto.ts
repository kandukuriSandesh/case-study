import { IsString, IsOptional } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  bankAccountNumber?: string;
}
