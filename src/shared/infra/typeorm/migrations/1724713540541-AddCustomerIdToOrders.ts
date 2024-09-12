import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddCustomerIdToOrders1724713540541 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn(
            'orders',
            new TableColumn({
                name: 'customer_id',
                type: 'uuid',
                isNullable: true, //permiti ser null para caso um cliente seja deletado
            })
        );

        await queryRunner.createForeignKey(
            'orders',
            new TableForeignKey({
                name: 'OrdersCustomer',
                columnNames: ['customer_id'],
                referencedTableName: 'customers',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL', //se um cliente for deletado, o campo customer_id será setado como null
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('orders', 'OrdersCustomer');
        await queryRunner.dropColumn('orders', 'customer_id');
    }

}
