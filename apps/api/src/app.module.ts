import { Module } from '@nestjs/common';
import { AuthModule, ProjectModule, TaskModule } from '@src/modules';

@Module({
  imports: [
    AuthModule,
    ProjectModule,
    TaskModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
