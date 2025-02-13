import { Form, Input, Button } from 'antd';
import Title from 'antd/es/typography/Title';

export default function LoginPage() {
  return (
    <>
      <Title level={3} className="text-center">
        Login
      </Title>

      <Form name="login">
        <div className="mt-4">
          <label
            className="block mb-2 text-sm font-medium text-gray-600 "
            for="LoggingEmailAddress"
          >
            Email Address
          </label>
          <input
            id="LoggingEmailAddress"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            type="email"
          />
        </div>

        <div className="mt-4">
          <div className="flex justify-between">
            <label
              className="block mb-2 text-sm font-medium text-gray-600"
              for="loggingPassword"
            >
              Password
            </label>
            <a href="#" className="text-xs text-gray-500 hover:underline">
              Forget Password?
            </a>
          </div>

          <input
            id="loggingPassword"
            className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            type="password"
          />
        </div>

        <div className="mt-6">
          <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
            Masuk
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b md:w-1/4"></span>

          <p className="text-xs text-gray-500 uppercase">
            atau{' '}
            <a href="#" className="text-xs text-blue-600 hover:underline">
              registrasi
            </a>
          </p>

          <span className="w-1/5 border-b md:w-1/4"></span>
        </div>
      </Form>
    </>
  );
}
