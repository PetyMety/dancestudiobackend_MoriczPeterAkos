import { IsDate, IsDateString, IsIn, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['solo', 'partner', 'group']) // Validáció a type mezőre
    type: string;

    @IsNumber()
    @IsPositive()
    length: number;

    @IsString()
    @IsNotEmpty()
    instructor: string;
}