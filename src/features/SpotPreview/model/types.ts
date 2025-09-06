export type CitySelectorProps = {
  cities: readonly string[];
  selected: string;
  onSelect: (city: string) => void;
};
