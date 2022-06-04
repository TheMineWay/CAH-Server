import { IsBoolean } from "class-validator";
import { ConfigurationCreateAttributes } from "src/database/definitions/Configuration.definition";

export class ConfigurationCreateDTO implements ConfigurationCreateAttributes {
    @IsBoolean()
    privateRegistration: boolean;
}