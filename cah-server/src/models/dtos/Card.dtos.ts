import { IsArray, IsBoolean, IsUUID } from "class-validator";

export class CreateCardDTO {
    @IsBoolean()
    isBlackCard: boolean;

    @IsArray()
    content: string[];

    @IsUUID('4')
    pack: string;
}