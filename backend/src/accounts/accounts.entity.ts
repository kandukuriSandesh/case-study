import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn , UpdateDateColumn} from 'typeorm';
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Payment, (payment) => payment.account)
  payments: Payment[];
}
