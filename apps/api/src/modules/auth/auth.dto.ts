import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class RegisterAuthDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
