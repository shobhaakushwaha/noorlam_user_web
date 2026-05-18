"use client";
import React, { useEffect, useState } from "react";
import "../auth.scss";
import { FiEye, FiEyeOff, FiSmartphone } from "react-icons/fi";
import Link from "next/link";
import { Button } from "@/component/form";
import { otpicon } from "@/assets/icons";
import Image from "next/image";
import OTPInput from "react-otp-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema } from "@/validation/auth/otp";
import { Controller, useForm } from 'react-hook-form';
import { getSecureParams, sendSecureParams } from "@/utils/secureRoute";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { showToast } from "@/utils/toast";
import { sendOtp, verifyOtp } from "@/services/auth/api";

const OtpPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter()
  const [paramsData, setParamsData] = useState(null)
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const isPhone = /^[0-9]+$/.test(paramsData?.target);
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  // ---------verify-OTP-handler-----------
  const { isPending, mutate } = useMutation({
    mutationFn: verifyOtp,

    onSuccess: (data) => {
      const responseData = data?.data
      console.log('responseData', responseData)
      showToast.success("send-otp", data?.message);
      sendSecureParams(router, "/createaccount", { ...responseData, ...paramsData });
    },

    onError: (err) => {
      console.log('err?.response', err?.response)
      showToast.error("send-otp", err?.message);
    }
  })

  const onSubmit = (data) => {
    const isPhone = /^[0-9]+$/.test(paramsData.target);
    const payload = {
      otp: data.otp,
      value: paramsData.target,
      purpose: paramsData.purpose,
      deviceToken: 'abcdefghijklmnopqrstuvwxyz',
      deviceType: 'web',
      ...isPhone && { countryCode: paramsData?.countryCode, }
    };

    console.log("Final Payload:", payload);

    mutate(payload);
  };
  // ---------------params-data-get-set-------------------
  useEffect(() => {
    const data = getSecureParams(searchParams);
    if (!data) return;
    setParamsData(data)
  }, [searchParams]);

  // console.log('paramsData', paramsData)
  // console.log('watch()', watch())

  // ---------resend-OTP-API-----------
  const { mutate: resendOtp } = useMutation({
    mutationFn: sendOtp, // same API

    onSuccess: (data) => {
      showToast.success("resend-otp", data?.message);
      setTimer(60);
      setCanResend(false);
    },
    onError: (err) => {
      showToast.error("resend-otp", err?.message);
    },
  });
  // -----------resend-OTP----------------
  const handleResend = () => {
    if (!paramsData) return;
    const payload = {
      value: paramsData.target,
      purpose: paramsData.purpose,
      resend: true,
      ...(isPhone ? { countryCode: paramsData?.countryCode } : {}),
    };
    console.log('payload resend', payload)
    resendOtp(payload);
  };

  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="login_wrapper otp_wrapper">
      <div className="login_card">
        <header className="login_header">
          <h2>Noorlambaba</h2>
        </header>
        <div className="divider"></div>

        <section className="login_title_section">
          <Image src={otpicon} alt="otp-icon" sizes="100vw"></Image>
          <h1>
            Enter code sent <br /> your number
          </h1>
          <p>
            We sent it to these number <b>{isPhone ? paramsData?.countryCode : ""} {paramsData?.target}</b>{" "}
          </p>
        </section>

        <form className="login_form" onSubmit={handleSubmit(onSubmit)}>
          {/* <div className="otp_wrap">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              inputType="tel"
              inputStyle="form-control input otp_input"
              renderInput={(props, index) => (
                <input
                  {...props}
                  className={`form-control input otp_input ${
                    props.value ? "shadow_input" : ""
                  }`}
                />
              )}
            />
          </div> */}
          {/* OTP FIELD */}
          <div className="otp_wrap">
            <Controller
              name="otp"
              control={control}
              render={({ field }) => (
                <OTPInput
                  {...field}
                  numInputs={6}
                  inputType="tel"
                  renderInput={(props) => (
                    <input
                      {...props}
                      className={`form-control input otp_input ${props.value ? "shadow_input" : ""
                        }`}
                    />
                  )}
                />
              )}
            />
          </div>
          {errors.otp && (
            <p className="invalid-feedback d-block">{errors.otp.message}</p>
          )}
          <button type="submit" className="btn_continue">
            Verify OTP
          </button>
        </form>
        {/* <div className="create_account">
          Wait for 00:58 <span> Send Again</span>
        </div> */}
        <div className="create_account">
          {canResend ? (
            <span
              style={{ cursor: "pointer", color: "blue" }}
              onClick={handleResend}
            >
              Resend OTP
            </span>
          ) : (
            <span>Wait for 00:{timer < 10 ? `0${timer}` : timer}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
