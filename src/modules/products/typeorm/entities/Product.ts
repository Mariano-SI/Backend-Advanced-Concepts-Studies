import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import OrderProduct from "../../../orders/typeorm/entities/OrderProduct";

@Entity('products')
class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(() => OrderProduct, order_products => order_products.product)
    order_products: OrderProduct[];

    @Column()
    name: string;

    @Column('decimal')
    price: number;

    @Column('int')
    quantity: number;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;
}

export default Product;