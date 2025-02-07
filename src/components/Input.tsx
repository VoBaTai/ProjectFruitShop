import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  RefObject,
} from "react";

type InputAttributes = InputHTMLAttributes<HTMLInputElement>;

interface Props extends DetailedHTMLProps<InputAttributes, HTMLInputElement> {
  id: string;
  label: string;
  inputRef?: RefObject<HTMLInputElement | HTMLTextAreaElement> | null; // Sửa lại kiểu của inputRef
  labelSize?: number;
  rows?: number;
}

const Input: React.FC<Props> = ({
  id,
  label,
  inputRef = null, // Đặt mặc định là null nếu không có ref truyền vào
  labelSize = 3,
  rows = 1,
  className,
  ...others
}) => {
  const inputClass = `form-control ${className}`;
  const labelClass = `col-sm-${labelSize} col-form-label`;

  return (
    <div className="row mb-3">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="col-sm">
        {rows > 1 ? (
          <textarea
            ref={inputRef as RefObject<HTMLTextAreaElement>} // Cast ref cho textarea
            id={id}
            rows={rows}
            {...(others as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          ></textarea>
        ) : (
          <input
            ref={inputRef as RefObject<HTMLInputElement>} // Cast ref cho input
            {...others}
            className={inputClass}
            id={id}
          />
        )}
      </div>
    </div>
  );
};

export default Input;
