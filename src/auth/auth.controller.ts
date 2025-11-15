import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('api/v1/')
export class AuthController {

    constructor(private readonly userService: UsersService) { }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return await this.userService.register(createUserDto);
    }

}
