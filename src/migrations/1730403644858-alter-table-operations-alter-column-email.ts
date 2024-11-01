import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableOperationsAlterColumnEmail1730403644858 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'operations',
            'email',
            new TableColumn({
                name: 'email',
                type: 'varchar',
                isNullable: false,
                isUnique: false
            })

        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'operations',
            'email',
            new TableColumn({
                name: 'email',
                type: 'varchar',
                isNullable: false,
                isUnique: true
            })

        )
    }

}
