import { ApiProperty } from "@nestjs/swagger";

export class PhotoInstanceDto {

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

    @ApiProperty({
        required: false
    })
    templateId: number;

    @ApiProperty()
    pageId: number;

    @ApiProperty()
    photoId: number;

    @ApiProperty()
    projectId: number;
}