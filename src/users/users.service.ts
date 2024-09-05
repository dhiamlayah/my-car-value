import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entites';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    create(email: string, password: string) {
        const user = this.repo.create({ email, password }) //create an instance of an entities
        return this.repo.save(user)     //save in the sqlite db 
    }


    findOne(id: number) {
        const user = this.repo.findOneBy({ id })
        return user;
    }

    find(email: string) {
        const user = this.repo.find({ where: { email } })
        return user;
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id)
        if (!user) {
            throw new Error('User Not Found')
        }
        Object.assign(user, attrs);
        return this.repo.save(user)
    }

    async remove ( id:number ){
        const user = await this.findOne(id)
        if( !user ){
            throw new Error('User Not Found ')
        }
        return this.repo.remove(user)
    }
}
