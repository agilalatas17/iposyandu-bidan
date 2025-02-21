import { Flex, Spin } from 'antd';

export default function Loading() {
  return (
    <Flex justify="center" align="center" className="!w-full h-screen">
      <Spin tip="Loading" size="large" fullscreen />
    </Flex>
  );
}
