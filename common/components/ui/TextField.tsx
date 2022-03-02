import { ChangeEvent, ChangeEventHandler } from "react";

type Props = {
  label: string;
  name: string;
  type: string;
  value: string | number;
  errors?: string[];
  onChange: ChangeEventHandler;
};

const TextField = ({ label, name, type, value, errors, onChange }: Props) => {
  const hasError = errors && errors.length > 0;

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-base mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className={`border border-solid border-gray-200 rounded-sm w-full px-4 py-3 ${
          hasError && "border-red-200"
        }`}
        value={value}
        onChange={onChange}
      />
      <div>
        {hasError &&
          errors.map((error, idx) => {
            return (
              <div key={idx} className="text-red-600 mt-2">
                {name} {error}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TextField;
