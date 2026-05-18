"use client";
import React from "react";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";
import { calendaricon } from "@/assets/icons";
import Image from "next/image";



const CustomDatePicker = ({
    name,
    control,
    label,
    placeholder,
    error,
}) => {
    return (
        <div>
            {label && <label className="form-label">{label}</label>}

            <Controller
                name={name}
                control={control}
                render={({ field }) => {
                    return (
                        <DatePicker
                            placeholderText={placeholder || "Select date"}
                            selected={field.value ? new Date(field.value) : null}
                            onChange={(date) => {
                                if (date) {
                                    field.onChange(date ?? null);
                                }
                            }}
                            dateFormat="dd/MM/yyyy"
                            className={`form-control input date_picker ${error ? "is-invalid" : ""}`}
                            maxDate={new Date()}
                            showYearDropdown
                            scrollableYearDropdown
                            showIcon
                            icon={
                                <Image
                                    src={calendaricon}
                                    alt="calendar"
                                    width={18}
                                    height={18}
                                    style={{ cursor: "pointer" }}
                                />
                            }
                        />
                    )
                }}
            />

            {error && <div className="invalid-feedback d-block">{error}</div>}
        </div>
    );
};

export default CustomDatePicker;