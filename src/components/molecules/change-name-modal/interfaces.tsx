export interface ChangeNameModalPropsInterface {
  oldName: string;
  onSuccessFunction: (newName: string) => void;
  onCancelFunction: () => void;
}
