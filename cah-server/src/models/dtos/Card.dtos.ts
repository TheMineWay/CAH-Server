import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsBoolean, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { CardCreateAttributes, CardUpdateAttributes } from "src/database/definitions/Card.definition";

export class CardContentDTO {
    @IsBoolean()
    isBlank: boolean;

    @IsOptional()
    @IsString()
    text?: string;
}

export class CreateCardDTO implements CardCreateAttributes {
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

export class UpdateCardDTO implements CardUpdateAttributes {
    @IsOptional()
    @IsBoolean()
    isBlackCard: boolean;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @Type(() => CardContentDTO)
    content: CardContentDTO[];

    @IsOptional()
    @IsUUID('4')
    pack: string;
}