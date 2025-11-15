import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { RegisterResponseDto } from 'src/dto/register-response.dto';
import { UsersService } from 'src/users/users.service';

@ApiTags('auth')
@Controller('api/v1/')
export class AuthController {

    constructor(private readonly userService: UsersService) { }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Register a new user', description: 'Create a new user account with email, phone, and other details' })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({ 
        status: 201, 
        description: 'User successfully registered',
        type: RegisterResponseDto
    })
    @ApiResponse({ 
        status: 409, 
        description: 'Conflict - Email or phone already exists',
        schema: {
            example: {
                statusCode: 409,
                message: 'Email already exists',
                error: 'Conflict'
            }
        }
    })
    @ApiResponse({ 
        status: 400, 
        description: 'Bad Request - Validation error',
        schema: {
            example: {
                statusCode: 400,
                message: ['firstname should not be empty', 'email must be an email'],
                error: 'Bad Request'
            }
        }
    })
    async register(@Body() createUserDto: CreateUserDto): Promise<RegisterResponseDto> {
        return await this.userService.register(createUserDto);
    }

}
