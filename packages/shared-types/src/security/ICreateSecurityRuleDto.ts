import { SecurityRole } from "../SecurityRole";

export interface ICreateSecurityRuleDto {
    organization: string;
    user: string;
    role: SecurityRole;
}
