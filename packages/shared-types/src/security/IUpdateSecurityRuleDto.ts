import { OrganizationSecurityRole } from "../OrganizationSecurityRole";

export interface IUpdateSecurityRuleDto {
    organization: string;
    user: string;
    role: OrganizationSecurityRole;
}
