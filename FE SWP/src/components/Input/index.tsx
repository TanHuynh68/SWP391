interface InputProps {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    labelText: string;
    labelFor: string;
    id: string;
    name: string;
    type: string;
    isRequired?: boolean;
    placeholder: string;
    customClass?: string; // Sử dụng dấu ? để biến nó thành tùy chọn
  }
  
  const fixedInputClass = "rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm";
  
  const Input: React.FC<InputProps> = ({
    handleChange,
    value,
    labelText,
    labelFor,
    id,
    name,
    type,
    isRequired = false,
    placeholder,
    customClass = '', // Giá trị mặc định
  }) => {
    return (
      <div className="mb-5">
        <label htmlFor={labelFor} className="sr-only">
          {labelText}
        </label>
        <input
          onChange={handleChange}
          value={value}
          id={id}
          name={name}
          type={type}
          required={isRequired}
          className={`${fixedInputClass} ${customClass}`} // Kết hợp các lớp CSS
          placeholder={placeholder}
        />
      </div>
    );
  };
  
  export default Input;
  