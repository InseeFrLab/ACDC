export class CollectionCommunication {
	attributeKey: string;

	attributeValue: CollectionRow[];
}

function isCollectionCommunicationItem(value: unknown): boolean {
	return (
		typeof value === 'object' &&
		value !== null &&
		'attributeKey' in value &&
		'attributeValue' in value
	);
}
export function isCollectionCommunication(
	value: unknown
): value is CollectionRow[] {
	return (
		Array.isArray(value) &&
		value.every((item) => isCollectionCommunicationItem(item))
	);
}

export default interface CollectionRow {
	id: string;

	type: string;

	media: string;

	paperQuestionnaire: boolean;
}
