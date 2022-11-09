import { ApiProperty } from "@nestjs/swagger";

export class UserRegistrationDto {

    @ApiProperty({ required: false })
    email: string;

    @ApiProperty({ required: false })
    password: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    authMethod: string;

    @ApiProperty({ required: false })
    uid: string;
}