import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  ConflictException
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Account } from './accounts.entity';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private accountsService: AccountsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAll(): Promise<Account[]> {
    return this.accountsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getOne(@Param('id', ParseIntPipe) id: number): Promise<Account> {
    return this.accountsService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: CreateAccountDto): Promise<Account> {
    return this.accountsService.create(data);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CreateAccountDto, // I am using the same DTO for update as well assuming frontend sends me name,address,phoneNumber as they are mandatory
  ): Promise<Account> {
    return this.accountsService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.accountsService.remove(id);
  }
}
