export interface ChangeNameModalPropsInterface {
  name: string;
  onSuccessFunction: (newName: string) => void;
  onCancelFunction: () => void;
}
