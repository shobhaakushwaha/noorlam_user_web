"use client";

import React from "react";
import { Controller } from "react-hook-form";

const SelectBox = ({
    label,
    name,
    control,
    error,
    loading = false,
    isDisabled = false,
    icon,
    children,
    defaultValue = "",
    ...rest
}) => {
    return (
        <>
            {label && <label className="form-label">{label}</label>}
            {icon && <div className="input-icon-start">{icon}</div>}

            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <select
                        {...field}
                        className={`form-control input ${error ? "is-invalid" : ""
                            }`}
                        disabled={loading || isDisabled}
                        {...rest}
                    >
                        {children}
                    </select>
                )}
            />

            {error && <div className="invalid-feedback">{error}</div>}
        </>
    );
};

export default SelectBox;