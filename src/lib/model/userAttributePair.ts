export interface UserAttributePair {
  attributeKey: string;
  attributeValue: string;
}
export function isUserAttributePair(obj: any): obj is UserAttributePair {
  return (
    'attributeKey' in obj &&
    'attributeValue' in obj &&
    typeof obj.attributeValue === 'string'
  );
}
