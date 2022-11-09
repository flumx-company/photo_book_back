import { ApiProperty } from "@nestjs/swagger";

export class UpdatePhotoInstanceDto {

    @ApiProperty()
    top: number;

    @ApiProperty()
    left: number;

    @ApiProperty()
    width: number;

    @ApiProperty()
    height: number;

    @ApiProperty()
    degree: number;
}