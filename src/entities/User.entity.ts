import { TypeUser } from './TypeUser.enum';
import { Column, Entity, Generated, PrimaryColumn } from "typeorm";
import { StatusUser } from './StatusUser.enum';

@Entity({ name: 'users' })
export class User {
    @PrimaryColumn({ type: 'uuid' })
    @Generated("uuid")
    id: string;
    @Column({ type: 'varchar' })
    name: string;
    @Column({ type: 'varchar', unique: true, nullable: true })
    username: string;
    @Column({ type: 'varchar', unique: true })
    email: string;
    @Column({ type: 'varchar' })
    password: string;
    @Column({ type: 'enum', enum: TypeUser, default: TypeUser.FARMER })
    type: string;
    @Column({ type: 'enum', enum: StatusUser, default: StatusUser.ENABLED })
    status: string;
}