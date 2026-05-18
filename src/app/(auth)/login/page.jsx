"use client";
import React, { useState } from "react";
import "../auth.scss";
import { FiEye, FiEyeOff, FiSmartphone } from "react-icons/fi";
import Link from "next/link";
import { Input } from "@/component/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/validation/auth/login";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/services/auth/api";
// import dynamic from "next/dynamic";
import { showToast } from "@/utils/toast";

import { setToken } from "@/utils/cookie";
import { useRouter } from "next/navigation";
import EmailPhoneInput from "@/component/IdentifierInput/EmailPhoneInput";
// /* Lazy Load SelectBox */
// const SelectBox = dynamic(
//   () => import("@/component/form/SelectBox"),
//   {
//     ssr: false,
//     loading: () => (
//       <select className="form-control input" disabled>
//         <option>Loading country codes...</option>
//       </select>
//     ),
//   }
// );

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  // const countryCodes = useMemo(() => getAllCountryCodes(), []);
  const router = useRouter()
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      identifier: "",
      countryCode: "+91",
      password: "",
    }
  });
  const identifier = watch("identifier");
  // detect email or phone
  // const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier || "");
  // const isPhone = /^[6-9]\d{9}$/.test(identifier || "");



  // /* SHOW COUNTRY SELECT ONLY IF PURE NUMBER */
  // const isPhoneMode = identifier && /^[0-9]+$/.test(identifier);

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      console.log('. onSuccess  data', data?.data?.token)
      showToast.success("login-success", data?.message);
      setToken({
        token: data?.data?.token,
        role: "user",
      });

      router.push('/');
    },

    onError: (err) => {
      showToast.error('login-error', err?.message || "Something went wrong")
    },
  });

  const onSubmit = (data) => {
    const payload = {
      value: identifier,
      password: data.password,
      countryCode: data?.countryCode,//|| "+91"
      deviceType: 'web',
      deviceToken: 'cvrewrfdcwerd',
    };
    mutate(payload);
  };



  return (
    <div className="login_wrapper">
      <div className="login_card">
        <header className="login_header">
          <h2>Noorlambaba</h2>
        </header>

        <div className="divider"></div>

        <section className="login_title_section">
          <h1>Log in to your account</h1>
          <p>For any assistance, feel free to contact us</p>
          <p>
            at <span>+91 98XXXXXXXXX</span>
          </p>
        </section>

        <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
          <EmailPhoneInput
            control={control}
            register={register}
            errors={errors}
            isPending={isPending}
            identifier={identifier}
            verifyIcon={false}
          />

          <div className="input_group">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              register={register}
              error={errors?.password?.message}
            />
            <div
              className="password_toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>

          <div className="forgot_password">
            <Link href="/forget-password">Forgot Password</Link>
          </div>

          <button type="submit" className="btn_continue" disabled={isPending}>
            Continue
          </button>

          <button type="button" className="btn_otp">
            <FiSmartphone className="otp_icon" />
            Login With OTP
          </button>
        </form>

        <div className="create_account">
          Don't have an account? <Link href="/signup">Create an account</Link>
        </div>

        <footer className="login_footer">
          <p>
            By creating an account, you agree to <br />
            the <Link href="/terms">Terms of Service</Link> and <Link href="/privacy"> Privacy Policy.</Link>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;