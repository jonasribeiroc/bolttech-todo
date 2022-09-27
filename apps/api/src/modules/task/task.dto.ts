import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  name: string;
}

export class UpdateTaskDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  done: boolean;
}
