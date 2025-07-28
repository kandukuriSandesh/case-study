import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './accounts.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountRepo: Repository<Account>,
  ) {}

  findAll(): Promise<Account[]> {
    return this.accountRepo.find({
      order: {
        createdAt: 'DESC',
      },
    });
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

  async update(id: number, data: UpdateAccountDto): Promise<Account> {
    const account = await this.findOne(id); // already checks if account exists

    // Only assign fields if they are provided
    if (data.name !== undefined) account.name = data.name;
    if (data.address !== undefined) account.address = data.address;
    if (data.phoneNumber !== undefined) account.phoneNumber = data.phoneNumber;
    if (data.bankAccountNumber !== undefined)
      account.bankAccountNumber = data.bankAccountNumber;

    return this.accountRepo.save(account);
  }

  async remove(id: number): Promise<void> {
    await this.accountRepo.delete(id);
  }
}
