import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponseDto {
    @ApiProperty({ 
        description: 'Response status code', 
        example: 201 
    })
    statusCode: number;

    @ApiProperty({ 
        description: 'Success message', 
        example: 'User registered successfully' 
    })
    message: string;

    @ApiProperty({ 
        description: 'Response status', 
        example: 'success' 
    })
    status: string;
}

