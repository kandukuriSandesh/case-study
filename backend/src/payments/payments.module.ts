import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Payment } from './payments.entity';
import { Account } from '../accounts/accounts.entity'; // adjust path as needed

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Account])],
  providers: [PaymentsService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
