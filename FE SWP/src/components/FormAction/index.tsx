import React from 'react';

interface FormActionProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  type?: "submit" | "reset" | "button"; // Đặt kiểu hợp lệ cho thuộc tính type
  action?: "submit" | "reset" | "button"; // Đặt kiểu hợp lệ cho thuộc tính action
  text: string;
}

const FormAction: React.FC<FormActionProps> = ({
  handleSubmit,
  type = 'button',
  action = 'submit',
  text
}) => {
  return (
    <>
      {type === 'button' ? (
        <button
          type={action}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          onClick={()=>handleSubmit} // Sử dụng onClick thay vì onSubmit
        >
          {text}
        </button>
      ) : (
        <></>
      )}
    </>
  );
};

export default FormAction;
