"use client";

import PhoneInput from "react-phone-number-input";
import { Controller } from "react-hook-form";
import "react-phone-number-input/style.css";

const CustomPhoneInput = ({
    name,
    control,
    label,
    placeholder = "Enter phone number",
    error,
    defaultCountry = "IN",
    ...rest
}) => {
    return (
        <div>
            {label && <label className="form-label">{label}</label>}

            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <PhoneInput
                        {...field}
                        international
                        defaultCountry={defaultCountry}
                        countryCallingCodeEditable={false}
                        placeholder={placeholder}
                        value={field.value || ''}
                        onChange={field.onChange}
                        limitMaxLength={18}
                        className={`form-control input ${error ? "is-invalid" : ""
                            }`}
                        {...rest}
                    />
                )}
            />

            {error && (
                <div className="invalid-feedback d-block">
                    {error}
                </div>
            )}
        </div>
    );
};

export default CustomPhoneInput;