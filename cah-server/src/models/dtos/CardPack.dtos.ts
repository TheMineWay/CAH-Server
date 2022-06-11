import { IsString, MaxLength, MinLength } from "class-validator";
import { CardPackCreateAttributes, CardPackUpdateAttributes } from "src/database/definitions/CardPack.definition";

export class CreateCardPackDTO  implements CardPackCreateAttributes {
    @IsString()
    @MinLength(2)
    @MaxLength(255)
    declare name: string;

    @IsString()
    @MinLength(2)
    @MaxLength(4091)
    declare description: string;

    @IsString()
    @MinLength(2)
    @MaxLength(10)
    declare language: string;
}

export class UpdateCardPackDTO  implements CardPackUpdateAttributes {
    @IsString()
    @MinLength(2)
    @MaxLength(255)
    declare name: string;

    @IsString()
    @MinLength(2)
    @MaxLength(4091)
    declare description: string;

    @IsString()
    @MinLength(2)
    @MaxLength(10)
    declare language: string;
}