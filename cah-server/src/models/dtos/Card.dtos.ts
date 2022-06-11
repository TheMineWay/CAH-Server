import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsBoolean, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";

export class CardContentDTO {
    @IsBoolean()
    isBlank: boolean;

    @IsOptional()
    @IsString()
    text?: string;
}

export class CreateCardDTO {
    @IsBoolean()
    isBlackCard: boolean;

    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => CardContentDTO)
    content: CardContentDTO[];

    @IsUUID('4')
    pack: string;
}