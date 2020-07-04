import { IsNotEmpty } from 'class-validator'; 

export class CretateTaskDto {
    @IsNotEmpty()
    title: string; 

    @IsNotEmpty()
    description: string;
}
