import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProducts1722697225413 {
    async up(queryRunner: QueryRunner) {
        await queryRunner.createTable(new Table({
            name: 'products',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'price',
                    type: 'decimal',
                    precision: 10,
                    scale: 2
                },
                {
                    name: 'quantity',
                    type: 'int'
                },
                {
                    name: 'created_at',
                    type: 'timestamp with time zone',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp with time zone',
                    default: 'now()',
                }
            ]
        }));
    }

    async down(queryRunner: QueryRunner) {
        await queryRunner.dropTable('products');
    }
}

