import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Loading = () => {
    return (
        <div className="flex justify-center items-center">
            <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
    )
}
export default Loading;