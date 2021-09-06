import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetByIdDto {
  @ApiProperty()
  @IsUUID()
  id: string;
}
