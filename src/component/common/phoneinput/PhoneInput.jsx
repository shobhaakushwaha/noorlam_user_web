import React from 'react';
import './PhoneInput.scss';
import { Input, Select } from '@/component/form';

const PhoneInput = () => {
  return (
    <div className="phone-input-container">
      <Select className="country-code" defaultValue="+91">
        <option value="+91">+91</option>
        <option value="+1">+1</option>
        <option value="+44">+44</option>
        <option value="+61">+61</option>
      </Select>
      <Input
        type="tel"
        placeholder="Mobile Number"
      />
    </div>
  );
};

export default PhoneInput;
