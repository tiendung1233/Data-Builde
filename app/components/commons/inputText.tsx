import { useState } from "react";

interface InputTextProps {
  value: string;
  handleChangeHeading: (type: string, val: string) => void;
  type: string;
}

const InputTextHeading: React.FC<InputTextProps> = ({
  value,
  handleChangeHeading,
  type,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <input
      style={{
        width: "100%",
        minHeight: "2rem",
        padding: "6px 12px",
        minWidth: "110px",
        textAlign: "center",
        borderRadius: "6px",
        border: "1px solid #8a8a8a",
      }}
      type="text"
      value={value}
      defaultValue={value}
      onChange={(el) => {
        handleChangeHeading(type, el.target.value);
      }}
    />
  );
};

export default InputTextHeading;
