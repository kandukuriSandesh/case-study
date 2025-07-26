import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Account } from '../accounts/accounts.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Account, (account) => account.payments)
  account: Account;

  @Column('decimal')
  amount: number;

  @Column()
  recipientName: string;

  @Column()
  recipientBank: string;

  @Column()
  recipientAccountNumber: string;

  @Column({ nullable: true })
  notes?: string;

  @Column({ default: 'Pending' })
  status: string;
}
