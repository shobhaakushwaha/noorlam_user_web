"use client";
import React, { useEffect, useMemo, useState } from "react";
import "../auth.scss";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Link from "next/link";
import { Input } from "@/component/form";
import Image from "next/image";
import { arrowright, verifyicon } from "@/assets/icons";
import { registerSchema } from "@/validation/auth/signup";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import CustomDatePicker, { DatePicker } from "@/component/form/DatePicker";
import SelectBox from "@/component/form/SelectBox";
import { formatDate } from "@/utils/common/commonFun";
import SearchLocation from "@/component/common/googleMap/SearchLocation";
import { getAllCountryCodes } from "@/utils/countryCode";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/services/auth/api";
import { showToast } from "@/utils/toast";
import { getSecureParams } from "@/utils/secureRoute";
import { useSearchParams } from "next/navigation";

const CreatePage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const countryCodes = useMemo(() => getAllCountryCodes(), []);
  const searchParams = useSearchParams()
  const [paramsData, setParamsData] = useState(null)

  console.log('paramsData', paramsData)
  // ----------handle-login------------
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      dateOfBirth: null,
      gender: '',
      password: "",
      confirmPassword: "",
      countryCode: "+91",
      mobile: "",
      deviceToken: "abcdefghijklmonpqrstuvwxyz",
      deviceType: "web",
      address: {
        fullAddress: "",
        latitude: "",
        longitude: "",
      },
    },
  });
  const emailValue = watch("email");
  const isEmailValid =
    emailValue &&
    !errors?.email &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

  /* ---------------- MUTATION ---------------- */
  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,

    onSuccess: (data) => {
      showToast.success("signup-success", data?.message);
      router.push("/login");
    },

    onError: (err) => {
      showToast.error(
        "signup-error",
        err?.response?.data?.message ||
        err?.message ||
        "Signup failed"
      );
    },
  });
  /* ---------------- SUBMIT ---------------- */
  const onSubmit = (data) => {
    const { dateOfBirth, address, ...rest } = data
    const payload = {
      ...rest,
      deviceType: "web",
      deviceToken: "abcdefghijklmnopqrstuvwxyz",
      dateOfBirth: formatDate(data?.dateOfBirth),
      address: {
        ...address,
        latitude: Number(address.latitude),
        longitude: Number(address.longitude),
      },
    };

    mutate(payload);
  };
  // --------country-code-change---------------
  const handleCountryChange = (value) => {
    setValue("countryCode", value);
    setValue("mobile", "");
  };

  // ---------------params-data-get-set-------------------
  useEffect(() => {
    const data = getSecureParams(searchParams);
    if (!data) return;
    setParamsData(data)
    const target = data?.target || "";
    const isPhone = /^[0-9]+$/.test(target);
    const isEmail = target.includes("@");
    if (isPhone) {
      console.log('isPjhone', isPhone)
      setValue("mobile", target);
    } else if (isEmail) {
      console.log('isEmail', isEmail)
      setValue("email", target);
    }
  }, [searchParams]);
  return (
    <div className="login_wrapper create_wrapper_page">
      <div className="login_card">
        <header className="login_header">
          <h2>Noorlambaba</h2>
        </header>

        <div className="divider"></div>

        <section className="login_title_section">
          <h1>Create an account</h1>
        </section>

        <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input_group">
            <Input
              name='fullName'
              register={register}
              placeholder='Enter Name'
              error={errors?.fullName?.message}
            />
          </div>
          <div className="input_group overwrite_input_group">
            <Input
              name="email"
              type="email"
              register={register}
              placeholder="Enter Email"
              error={errors?.email?.message}
            />
            {isEmailValid && (
              <div className="password_toggle">
                <Image src={verifyicon} alt="Verified Email" />
              </div>
            )}
          </div>
          <div className="input_group">
            <CustomDatePicker
              name="dateOfBirth"
              control={control}
              placeholder="Select DOB"
              error={errors.dateOfBirth?.message}
            />
          </div>
          <div className="input_group">
            <SelectBox
              name="gender"
              loading={false}
              control={control}
              error={errors.gender?.message}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </SelectBox>
          </div>
          <div className="input_group">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              register={register}
              placeholder="Create New Password"
              error={errors?.password?.message}
            />
            <div
              className="password_toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>
          <div className="input_group">
            <Input
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              register={register}
              placeholder="Confirm Password"
              error={errors?.confirmPassword?.message}
            />
            <div
              className="password_toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </div>
          </div>


          <div>
            <SelectBox
              name="countryCode"
              control={control}
              // loading={isPending}
              defaultValue="+91"
              onChange={(e) => handleCountryChange(e.target.value)}
            >
              {countryCodes.map((item) => (
                <option key={item.code} value={item.dialCode}>
                  {item.dialCode}
                </option>
              ))}
            </SelectBox>
            <div className="input_group">
              <Input
                name="mobile"
                placeholder='Mobile Number'
                register={register}
                error={errors?.mobile?.message}
                maxLength='18'
              />
            </div>

          </div>

          <div
            className="input_group overwrite_input_group"
            style={{ cursor: "pointer" }}
            onClick={() => setIsLocationModalOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setIsLocationModalOpen(true);
              }
            }}
          >
            <Input
              type="text"
              className="form-control"
              placeholder="Set your location"
              value={watch("address.fullAddress") || ""}
              {...register("address.fullAddress")}
              readOnly
              aria-readonly="true"
              aria-label="Full Address"
              error={errors?.address?.fullAddress?.message}
            />

            <div className="password_toggle">
              <Image src={arrowright} alt="arrow icon" />
            </div>
          </div>
          <button type="submit" className="btn_continue" disabled={false}>
            Continue
          </button>
        </form>

        <footer className="login_footer">
          <p>
            By creating an account, you agree to <br />
            the <Link href="/terms">Terms of Service</Link> and <Link href="/privacy"> Privacy Policy.</Link>
          </p>
        </footer>
      </div>

      {isLocationModalOpen &&
        <SearchLocation
          setValue={setValue}
          register={register}
          watch={watch}
          error={errors}
          onClose={() => setIsLocationModalOpen(false)}
        />
      }
    </div>
  );
};

export default CreatePage;