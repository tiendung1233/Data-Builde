export type Tab = {
  id: string;
  content: string;
  accessibilityLabel?: string;
  link: string;
  body: JSX.Element;
};
