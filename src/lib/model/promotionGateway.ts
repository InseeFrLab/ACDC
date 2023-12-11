export interface PromotionGateway {
	id: string;
	title: string;
	content: PromotionContent;
	verifmail: boolean;
	configuration: PromotionConfiguration;
}

export interface PromotionContent {
	enqueteEnDetail: Record<'menu-link', string>;
	description: Record<'title', string>;
	resultats: Record<'menu-title', string>;
}

export interface PromotionConfiguration {
	listOptionsObjetMailAssistance: ListOptionsObjetMailAssistance[];
}

export interface ListOptionsObjetMailAssistance {
	auth: boolean;
	value: string;
	displayValue: string;
}
