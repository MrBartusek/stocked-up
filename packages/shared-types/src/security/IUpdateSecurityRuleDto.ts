import { SecurityRole } from "../SecurityRole";

export interface IUpdateSecurityRuleDto {
    organization: string;
    user: string;
    role: SecurityRole;
}
