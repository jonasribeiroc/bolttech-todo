import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty()
  name: string;
}

export class UpdateProjectDto {
  @ApiProperty()
  name: string;
}
