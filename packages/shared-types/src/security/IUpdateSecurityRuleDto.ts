import { SecurityRole } from "../OrganizationSecurityRole";

export interface IUpdateSecurityRuleDto {
    organization: string;
    user: string;
    role: SecurityRole;
}
