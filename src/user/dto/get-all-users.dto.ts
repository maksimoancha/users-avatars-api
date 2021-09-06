import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class GetAllUsersDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  @ApiPropertyOptional({ default: 0 })
  skip?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Max(50)
  @Min(1)
  @ApiPropertyOptional({ default: 50 })
  limit?: number;
}
