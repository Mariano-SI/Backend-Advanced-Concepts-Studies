import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Customer from "../../../../customers/infra/typeorm/entities/Customer";
import OrderProduct from "./OrderProduct";
import { IOrder } from "../../../domain/models/IOrder";

@Entity("orders")
export class Order implements IOrder {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Customer)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @OneToMany(() => OrderProduct, order_products => order_products.order, {
        cascade: true
    })
    order_products: OrderProduct[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Order;