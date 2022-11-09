import { ApiProperty } from "@nestjs/swagger";

export class NewPageDto {

    @ApiProperty({
        required: false
    })
    background: string;

    @ApiProperty({
        required: false
    })
    prev: number;

    @ApiProperty({
        required: false
    })
    elements: string;

    @ApiProperty()
    projectId: number;

    @ApiProperty()
    userId: number;
}