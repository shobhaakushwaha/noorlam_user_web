'use client'

import "../auth.scss";
import EmailPhoneInput from '@/component/IdentifierInput/EmailPhoneInput'
import { sendOtp } from "@/services/auth/api";
import { sendSecureParams } from "@/utils/secureRoute";
import { showToast } from "@/utils/toast";
import { emailPhoneValid } from '@/validation/auth/emailPhone';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from "@tanstack/react-query";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import React from 'react'
import { useForm } from 'react-hook-form';

const Signup = () => {
    const router = useRouter()
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
        resolver: zodResolver(emailPhoneValid),
        defaultValues: {
            identifier: "",
            purpose: 'signup',
            countryCode: "+91",
        },
    });


    // ---------send-OTP-handler-----------

    const { isPending, mutate } = useMutation({
        mutationFn: sendOtp,
        onSuccess: (data) => {
            const responseData = data?.data
            showToast.success("send-otp", data?.message);
            sendSecureParams(router, "/otp", { ...responseData, countryCode: watch('countryCode') });
        },
        onError: (err) => {
            showToast.error("send-otp", err?.message);
        }
    })

    const onSubmit = (data) => {
        const { countryCode, identifier } = data;
        const isPhone = /^[0-9]+$/.test(identifier);

        const payload = {
            value: identifier,
            purpose: "signup",
            ...(isPhone && { countryCode }),
        };
        mutate(payload)
        // console.log("payload", payload);
    };

    return (
        <div className="login_wrapper">
            <div className="login_card">
                <header className="login_header">
                    <h2>Noorlambaba</h2>
                </header>

                <div className="divider"></div>

                <section className="login_title_section">
                    <h1>Sign up into your account</h1>
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
                        placeholder="Email/Phone Number"
                        isPending={isPending}
                        identifier={watch('identifier')}
                        verifyIcon
                    />

                    <button type="submit" className="btn_continue"
                        disabled={isPending}
                    >
                        Continue
                    </button>
                </form>

                <div className="create_account">
                    Have an account? <Link href="/login">Login</Link>
                </div>

                <footer className="login_footer">
                    <p>
                        By creating an account, you agree to <br />
                        the <Link href="/terms">Terms of Service</Link> and <Link href="/privacy"> Privacy Policy.</Link>
                    </p>
                </footer>
            </div>
        </div>
    )
}

export default Signup