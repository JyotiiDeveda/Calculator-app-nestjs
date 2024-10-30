import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('operations')
export class Operation {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({
		unique: true,
		nullable: false,
	})
	email: string;

	@Column({
		nullable: false,
	})
	operand1: number;

	@Column({
		nullable: false,
	})
	operand2: number;

	@Column()
	result: number;
}
