import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Message } from "primereact/message";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userlogin } from "../Redux/Slice/UserSlice";
import { useNavigate } from "react-router-dom";
export default function LoginForm() {
  const [formData, setFormData] = useState({ email: null, password: null });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.UserAuth);

  const formDataHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onLogin = () => {
    dispatch(userlogin(formData)).then(() => {
      if (localStorage.getItem("userToken")) {
        navigate("/wizard");
      }
    });
  };

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <div className="absolute top-0 bottom-0 left-0 right-0 flex min-h-full flex-1 flex-col justify-center px-6 py-0 lg:px-8 z-50 bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm relative">
          <h2 className="text-center text-2xl font-bold leading-0text-gray-900">
            Login
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="h-14 duration-300">
            {error && (
              <Message text={error} severity="error" className="w-full" />
            )}
          </div>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <InputText
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={formDataHandler}
                  autoComplete="email"
                  required
                  className=" pl-3 h-10 w-full border border-slate-300 rounded-lg"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <Password
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={formDataHandler}
                  type="password"
                  autoComplete="current-password"
                  required
                  feedback={false}
                  inputClassName="pl-3 w-full h-10"
                  className="w-full border border-slate-300 rounded-lg"
                />
              </div>
            </div>

            <div>
              <Button
                label="Login"
                onClick={onLogin}
                className="w-full bg-cyan-500 py-3 text-white  "
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
