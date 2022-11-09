import { ApiProperty } from "@nestjs/swagger";

export class TemplateDto {

    @ApiProperty()
    top: number;

    @ApiProperty()
    left: number;

    @ApiProperty()
    width: number;

    @ApiProperty()
    height: number;

    @ApiProperty()
    borderColor: string;

    @ApiProperty()
    borderWidth: number;

    @ApiProperty()
    pageId: number;

    @ApiProperty()
    default: boolean;
}