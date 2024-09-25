import { UsersService } from './users.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize, SerializerInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)   // it is the same as  @UseInterceptors(new SerializerInterceptor(UserDto)) but to make it easyer to read 
// by the way we can put interception (serialize) before each route or for the full controller 

export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService : AuthService
    ) { }

    @Post("/signup")
    createUser(@Body() body: CreateUserDto) {
        return this.authService.signup(body.email,body.password)
    }   

    @Post('/signin')
    signin(@Body() body : CreateUserDto){
        return this.authService.signin(body.email,body.password)
    }


    @Get("/:id")
    findUser(@Param("id") id: string) {
        console.log('handler is running')
        return this.usersService.findOne(parseInt(id))
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email)
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, body: UpdateUserDto) {
        return this.usersService.update(parseInt(id), body)
    }

    @Delete("/:id")
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id))
    }

}


