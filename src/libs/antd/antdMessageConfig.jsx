'use client';

import { message } from 'antd';

export const antdMessageConfig = message.config({
  top: 30,
  duration: 2.5,
  maxCount: 3,
  rtl: false,
  // prefixCls: 'my-message',
});
