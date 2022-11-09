import { ApiProperty } from "@nestjs/swagger";

export class NewProjectDto {

    @ApiProperty()
    projectName: string;

    @ApiProperty()
    pages: number;

    @ApiProperty()
    status: string;

    @ApiProperty()
    company: string;

    @ApiProperty({
        required: false
    })
    params: string;

    @ApiProperty({
        required: false
    })
    userId: number;
}