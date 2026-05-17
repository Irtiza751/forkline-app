export interface CustomizationOption {
  id: string;
  label: string;
  price: number;
}

export interface CustomizationGroup {
  id: string;
  label: string;
  type: 'single' | 'multiple';
  options: CustomizationOption[];
}

export interface CartItemExtra {
  id: string;
  label: string;
  price: number;
  groupId: string;
  groupLabel: string;
}
