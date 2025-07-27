import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payments.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Account } from '../accounts/accounts.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,
    @InjectRepository(Account)
    private accountRepo: Repository<Account>,
  ) {}

  findAll(): Promise<Payment[]> {
    return this.paymentRepo.find({ relations: ['account'] });
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.paymentRepo.findOne({
      where: { id },
      relations: ['account'],
    });
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  async create(data: CreatePaymentDto): Promise<Payment> {
  const account = await this.accountRepo.findOneBy({ id: data.accountId });
  if (!account) throw new NotFoundException('Account not found');

  if (!data.force) {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

    const duplicate = await this.paymentRepo.findOne({
      where: {
        account: { id: data.accountId },
        amount: data.amount,
        recipientAccountNumber: data.recipientAccountNumber,
        createdAt: MoreThan(tenMinutesAgo),
      },
    });

    if (duplicate) {
      throw new ConflictException({
        message: 'A similar payment was made recently.',
        allowDuplicate: true,
      });
    }
  }

  const payment = this.paymentRepo.create({
    ...data,
    account,
    status: 'Pending',
  });

  return this.paymentRepo.save(payment);
}

  async update(id: number, data: UpdatePaymentDto): Promise<Payment> {
  const payment = await this.findOne(id);

  if (payment.status !== 'Pending') {
    throw new ConflictException('Only pending payments can be updated.');
  }

  if (data.accountId) {
    const account = await this.accountRepo.findOneBy({ id: data.accountId });
    if (!account) throw new NotFoundException('Account not found');
    payment.account = account;
  }

  if (data.amount !== undefined) payment.amount = data.amount;
  if (data.recipientName !== undefined) payment.recipientName = data.recipientName;
  if (data.recipientBank !== undefined) payment.recipientBank = data.recipientBank;
  if (data.recipientAccountNumber !== undefined) payment.recipientAccountNumber = data.recipientAccountNumber;
  if (data.notes !== undefined) payment.notes = data.notes;
  if (data.status !== undefined) payment.status = data.status;

  return this.paymentRepo.save(payment);
}

}
