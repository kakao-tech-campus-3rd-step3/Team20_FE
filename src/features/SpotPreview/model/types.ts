export type CitySelectorProps = {
  cities: readonly string[];
  selected: string;
  onSelect: (city: string) => void;
};

export const cities = ['All', 'Seoul', 'Busan', 'Incheon'] as const;
