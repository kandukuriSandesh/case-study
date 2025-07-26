import { IsNumber, IsString, IsOptional } from 'class-validator';

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
}
