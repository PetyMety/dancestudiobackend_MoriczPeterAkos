import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('/api/courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    const course = await this.courseService.create(createCourseDto);
    return { data: course }; // Visszaadjuk az új kurzust
  }

  @Get()
  async findAll() {
    const courses = await this.courseService.findAll();
    return { data: courses };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const course = await this.courseService.findOne(+id);
    return { data: course };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    const course = await this.courseService.update(+id, updateCourseDto);
    return { data: course };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const course = await this.courseService.remove(+id);
    return { data: course };
  }

  @Post(':course/apply')
  async apply(@Param('course') courseId: string) {
    const application = await this.courseService.apply(+courseId);
    return { data: application }; // Visszaadjuk a jelentkezést
  }
}