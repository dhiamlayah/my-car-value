import { AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn } from "typeorm"


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    password: string;

    @AfterInsert()
    logInsert() {
        console.log('inserted id ==>', this.id)
    }

    @AfterUpdate()
    logUpdate() {
        console.log('updated id ==>', this.id)
    }

    @AfterRemove()
    logRemove() {
        console.log('removing id ==>', this.id)
    }


}