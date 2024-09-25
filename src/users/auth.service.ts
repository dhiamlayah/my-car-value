import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import {randomBytes,scrypt as _scriypt} from "crypto"
import { promisify } from "util";

const scrypt = promisify(_scriypt);

@Injectable()
export class  AuthService {
    
    constructor(private usersService : UsersService){}

    async signup(email: string , password : string){
        const users = await this.usersService.find(email)
        if ( users.length){
            throw new BadRequestException('User already exist')
        }

        const salt = randomBytes(8).toString("hex")
        const hash = (await scrypt(password,salt,32)) as Buffer ; // just to help typescript to identify the type 

        const result = salt + '.' + hash.toString("hex") ; //Join the hashed and the salt together 

        const user = await this.usersService.create(email,result)

    }

    signin(){

    }

} 