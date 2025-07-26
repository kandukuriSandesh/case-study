import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Payment } from '../payments/payments.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column({ nullable: true })
  bankAccountNumber?: string;

  @OneToMany(() => Payment, (payment) => payment.account)
  payments: Payment[];
}
