import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

const InternalServerError = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Result
        status="500"
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Link to="/">
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    </div>
  );
};

export default InternalServerError;
