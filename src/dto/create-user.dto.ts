import { Category } from '@prisma/client';
import { IsString, IsEmail, IsEnum, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ description: 'User first name', example: 'John' })
    @IsNotEmpty()
    @IsString()
    firstname: string;

    @ApiProperty({ description: 'User last name', example: 'Doe' })
    @IsNotEmpty()
    @IsString()
    lastname: string;

    @ApiProperty({ description: 'User email address', example: 'john.doe@example.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'User phone number', example: '+1234567890' })
    @IsNotEmpty()
    @IsString()
    phone: string;

    @ApiProperty({ 
        description: 'User category', 
        enum: Category,
        example: Category.Startup
    })
    @IsNotEmpty()
    @IsEnum(Category)
    category: Category;

    @ApiPropertyOptional({ description: 'User description', example: 'Optional description about the user' })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional({ description: 'User active status', example: true, default: true })
    @IsOptional()
    @IsBoolean()
    active?: boolean;
}
