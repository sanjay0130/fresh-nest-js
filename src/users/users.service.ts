import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { RegisterResponseDto } from 'src/dto/register-response.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService) { }
    
    async register(data: CreateUserDto): Promise<RegisterResponseDto> {
        // Check for duplicate email
        const existingUserByEmail = await this.prisma.user.findUnique({
            where: { email: data.email },
        });

        if (existingUserByEmail) {
            throw new ConflictException('Email already exists');
        }

        // Check for duplicate phone
        const existingUserByPhone = await this.prisma.user.findFirst({
            where: { phone: data.phone },
        });

        if (existingUserByPhone) {
            throw new ConflictException('Phone number already exists');
        }

        try {
            await this.prisma.user.create({
                data: {
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    phone: data.phone,
                    category: data.category,
                    description: data.description,
                    active: data.active ?? true,
                },
            });

            return {
                statusCode: 201,
                message: 'User registered successfully',
                status: 'success',
            };
        } catch (error) {
            if (error instanceof ConflictException) {
                throw error;
            }
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    // Unique constraint violation (fallback check)
                    throw new ConflictException('Email or phone already exists');
                }
            }
            throw new InternalServerErrorException('Failed to create user');
        }
    }
}
