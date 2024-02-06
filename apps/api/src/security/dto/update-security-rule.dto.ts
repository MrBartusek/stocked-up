import { IUpdateSecurityRuleDto } from 'shared-types';
import { CreateSecurityRuleDto } from './create-security-rule.dto';

export class UpdateSecurityRuleDto
	extends CreateSecurityRuleDto
	implements IUpdateSecurityRuleDto {}
