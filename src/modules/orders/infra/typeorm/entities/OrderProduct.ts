import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Order from "./Order";
import Product from "../../../../products/infra/typeorm/entities/Product";
import { IOrderProducts } from "../../../domain/models/IOrderProducts";

@Entity("orders_products")
export class OrderProduct implements IOrderProducts{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Order, order => order.order_products)
    @JoinColumn({ name: 'order_id' })
    order: Order;

    @ManyToOne(() => Product, product => product.order_products)
    @JoinColumn({ name: 'product_id' })
    product: Product;

    @Column()
    order_id: string;

    @Column()
    product_id: string;

    @Column('decimal')
    price: number;

    @Column('int')
    quantity: number;

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}

export default OrderProduct;