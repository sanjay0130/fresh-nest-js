import { Category } from '@prisma/client';
import { IsString, IsEmail, IsEnum, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    firstname: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsEnum(Category)
    category: Category;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsBoolean()
    active?: boolean;
}
