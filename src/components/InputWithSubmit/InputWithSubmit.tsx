import { useRef, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import { useClickOutside } from "../../hooks/useClickOutside";
import { IconButton } from "@mui/material";

interface InputWithSubmitProps {
  isDone: boolean;
  onSubmit: (val: string) => void;
  text: string;
}

const InputWithSubmit = ({ isDone, text, onSubmit }: InputWithSubmitProps) => {
  const [isSubmitVisible, setIsSubmitVisible] = useState(false);
  const [value, setValue] = useState(text);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, () => {
    if (document.activeElement !== inputRef.current) return;
    setValue(text);
    setIsSubmitVisible(false);
  });

  const onClickSubmit = () => {
    if (!isSubmitVisible) return;
    if (value === text) {
      setIsSubmitVisible(false);
      return;
    }

    onSubmit(value);
    setIsSubmitVisible(false);
  };

  return (
    <div ref={containerRef} className="flex gap-2">
      <input
        ref={inputRef}
        value={value}
        className={`${isDone ? "line-through" : ""} px-2 w-4/5`}
        onFocus={() => setIsSubmitVisible(true)}
        onChange={(e) => setValue(e.target.value)}
      />
      <IconButton
        color="success"
        onClick={onClickSubmit}
        className={isSubmitVisible ? "" : "opacity-[0]"}
        sx={{ cursor: isSubmitVisible ? "pointer" : "default" }}
      >
        <DoneIcon />
      </IconButton>
    </div>
  );
};

export default InputWithSubmit;
