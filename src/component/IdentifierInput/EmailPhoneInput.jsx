import { getAllCountryCodes } from '@/utils/countryCode';
import dynamic from 'next/dynamic';
import React, { useMemo } from 'react'
import { Input } from '../form';
import { verifyicon } from '@/assets/icons';
import Image from 'next/image';
/* Lazy Load SelectBox */
const SelectBox = dynamic(
    () => import("@/component/form/SelectBox"),
    {
        ssr: false,
        loading: () => (
            <select className="form-control input" disabled>
                <option>Loading country codes...</option>
            </select>
        ),
    }
);

const EmailPhoneInput = ({
    identifier,
    control,
    isPending,
    register,
    errors,
    verifyIcon = false,
    placeholder = "Email or Phone Number",

}) => {

    const countryCodes = useMemo(() => getAllCountryCodes(), []);

    /* SHOW COUNTRY SELECT ONLY IF PURE NUMBER */
    const isPhoneMode = identifier && /^[0-9]+$/.test(identifier);

    // -------verify-icon-hide-show-------
    const isEmailValid =
        verifyIcon &&
        identifier &&
        !errors?.identifier &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
    return (
        <div>
            {isPhoneMode && (
                <SelectBox
                    name="countryCode"
                    // register={register}
                    control={control}
                    loading={isPending}
                    defaultValue="+91"
                >
                    {countryCodes.map((item) => (
                        <option key={item.code} value={item.dialCode}>
                            {item.dialCode}
                        </option>
                    ))}
                </SelectBox>
            )}
            <div className="input_group">
                <Input
                    name="identifier"
                    placeholder={placeholder}
                    register={register}
                    error={errors?.identifier?.message}
                    maxLength={isPhoneMode ? '18' : '90'}
                />
                {isEmailValid && (
                    <div className="password_toggle">
                        <Image src={verifyicon} alt="Verified Email" />
                    </div>
                )}
            </div>

        </div>
    )
}

export default EmailPhoneInput