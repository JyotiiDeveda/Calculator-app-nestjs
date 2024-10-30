import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableOperations1730288514402 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'operations',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
            isNullable: false,
          },
          {
            name: 'operand1',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'operand2',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'result',
            type: 'int',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('operations');
  }
}
