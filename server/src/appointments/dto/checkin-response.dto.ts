import { ApiProperty } from '@nestjs/swagger';

export class CheckinResponseDto {
  @ApiProperty()
  time_difference: number; // 시간 차이를 초 단위로 저장
}
