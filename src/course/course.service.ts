import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'; 
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    return this.prisma.courses.create({
      data: createCourseDto,
    });
  }

  async findAll() {
    return this.prisma.courses.findMany();
  }

  async findOne(id: number) {
    const course = await this.prisma.courses.findUnique({
      where: { id },
    });
    if (!course) {
      throw new NotFoundException(`Course with id ${id} not found`);
    }
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.prisma.courses.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  async remove(id: number) {
    return this.prisma.courses.delete({
      where: { id },
    });
  }

  async apply(courseId: number) {
    const course = await this.findOne(courseId); // Ellenőrizzük, hogy létezik-e a kurzus
    const price = course.length * 500; // Számoljuk ki az árat

    return this.prisma.applications.create({
      data: {
        course_id: courseId,
        price: price,
      },
    });
  }
}