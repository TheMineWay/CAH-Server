import { IsBoolean, IsUUID } from "class-validator";

export class SetAdminStateDTO {
    @IsUUID('4')
    declare userId: string;
    @IsBoolean()
    declare isAdmin: boolean;
}