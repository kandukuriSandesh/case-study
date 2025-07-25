import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './accounts.entity';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountRepo: Repository<Account>,
  ) {}

  findAll(): Promise<Account[]> {
    return this.accountRepo.find();
  }

  async findOne(id: number): Promise<Account> {
    const account = await this.accountRepo.findOneBy({ id });
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    return account;
  }

  async create(data: CreateAccountDto): Promise<Account> {
    const existing = await this.accountRepo.findOne({
      where: {
        name: data.name,
        address: data.address,
        phoneNumber: data.phoneNumber,
      },
    });

    if (existing) {
      throw new ConflictException(
        'Account already exists with same name, address, and phone number',
      );
    }

    const account = this.accountRepo.create(data);
    return this.accountRepo.save(account);
  }

  async update(id: number, data: CreateAccountDto): Promise<Account> {
    const account = await this.findOne(id);

    account.name = data.name;
    account.address = data.address;
    account.phoneNumber = data.phoneNumber;
    account.bankAccountNumber = data.bankAccountNumber;

    return this.accountRepo.save(account);
  }

  async remove(id: number): Promise<void> {
    await this.accountRepo.delete(id);
  }
}
