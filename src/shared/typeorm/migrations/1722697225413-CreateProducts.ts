const {MigrationInterface, QueryRunner, Table} = require("typeorm");

class CreateProducts1722697225413 {
    async up(queryRunner) {
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

    async down(queryRunner) {
        await queryRunner.dropTable('products');
    }
}

// A classe é atribuída à propriedade `exports` do objeto `module`.
module.exports = {
    CreateProducts1722697225413
}