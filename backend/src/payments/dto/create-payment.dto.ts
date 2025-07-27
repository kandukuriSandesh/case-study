import { IsNumber, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  accountId: number;

  @IsNumber()
  amount: number;

  @IsString()
  recipientName: string;

  @IsString()
  recipientBank: string;

  @IsString()
  recipientAccountNumber: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsBoolean()
  force?: boolean;
}
