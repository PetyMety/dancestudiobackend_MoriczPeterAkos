import { IsDateString, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateApplicationDto {
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    course_id: number;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    price: number;

    @IsDateString()
    created_at?: Date;

    @IsDateString()
    updated_at?: Date;
}