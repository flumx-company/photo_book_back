import { ApiProperty } from "@nestjs/swagger";

export class PhotoDto {

    @ApiProperty({
        required: false
    })
    name: string;

    @ApiProperty({
        required: false
    })
    path: string;

    @ApiProperty()
    projectId: number;
}