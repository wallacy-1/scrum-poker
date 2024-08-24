export interface ChangeChoiceModalPropsInterface {
  name: string;
  onSuccessFunction: (newChoice: number | string) => void;
  onCancelFunction: () => void;
  cardValues: (string | number)[];
}
