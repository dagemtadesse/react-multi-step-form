import { FormTitle } from "../FormTitle";
import { object, string } from "yup";
import { useFormik } from "formik";
import { ChangeEventHandler, EventHandler, useRef } from "react";
import { forwardRef } from "react";
import { useNavigate } from "react-router";

const PersonalInfoSchema = object({
  name: string().required(),
  email: string().email().required(),
  phone: string().required(),
});

export function loadFromLocal<T>(key: string, defaultValue: T): T {
  const json = localStorage.getItem(key);
  if (json && json != "") {
    return JSON.parse(json);
  }

  return defaultValue;
}

export interface Person {
  email: string;
  name: string;
  phone: string;
}

export const PersonalInfo = forwardRef((props, ref: any) => {
  const navigate = useNavigate();

  const { errors, values, handleChange, touched, handleBlur, handleSubmit } =
    useFormik({
      initialValues: loadFromLocal("personal-info", {
        name: "",
        email: "",
        phone: "",
      }),
      validationSchema: PersonalInfoSchema,
      onSubmit: (values) => {
        localStorage.setItem("personal-info", JSON.stringify(values));
        navigate("?step=2");
      },
    });

  return (
    <div className="">
      <FormTitle
        title="Personal info"
        description=" Please provide your name, email address, and phone number"
      />

      <form className="flex flex-col gap-5 mt-10" onSubmit={handleSubmit}>
        <FormInput
          label="Name"
          id="name"
          placeholder=" e.g. Stephen King"
          type="text"
          handleChange={handleChange}
          value={values.email}
          name="name"
          error={touched.name ? errors.name : undefined}
          handleBlur={handleBlur}
        />

        <FormInput
          label="Email"
          id="email"
          placeholder="e.g. stephenking@lorem.com"
          type="text"
          name="email"
          value={values.email}
          handleChange={handleChange}
          error={touched.email ? errors.email : undefined}
          handleBlur={handleBlur}
        />

        <FormInput
          label="Phone number"
          id="phone"
          placeholder="e.g. +1 234 567 890"
          type="text"
          name="phone"
          value={values.phone}
          handleChange={handleChange}
          error={touched.phone ? errors.phone : undefined}
          handleBlur={handleBlur}
        />

        <button type="submit" ref={ref} style={{ display: "none" }}></button>

        {/* <button className="self-end bg-purplishblue text-white p-4 rounded-lg text-sm">Next Step</button>
            <button className="self-end bg-pastelblue text-white p-4 rounded-lg text-sm">Next Step</button>
            <button className="self-end bg-lightblue text-white p-4 rounded-lg text-sm">Next Step</button>
            <button className="self-end bg-strawberryred text-white p-4 rounded-lg text-sm">Next Step</button>
            <button className="self-end bg-coolgray text-white p-4 rounded-lg text-sm">Next Step</button>
            <button className="self-end bg-coolgray text-white p-4 rounded-lg text-sm">Next Step</button>
            <button className="self-end bg-lightgray text-white p-4 rounded-lg text-sm">Next Step</button>
            <button className="self-end bg-magnolia text-white p-4 rounded-lg text-sm">Next Step</button>
            <button className="self-end bg-alabaster text-white p-4 rounded-lg text-sm">Next Step</button> */}
      </form>
    </div>
  );
});

const FormInput = ({
  id,
  error,
  label,
  type,
  placeholder,
  value,
  handleChange,
  name,
  handleBlur,
}: {
  id: string;
  label: string;
  placeholder: string;
  error?: any;
  type: string;
  name: string;
  handleChange: ChangeEventHandler;
  handleBlur: any;
  value: string;
}) => {
  return (
    <>
      <div>
        <div className="flex justify-between items-end">
          <label htmlFor={id} className="text-marineblue">
            {label}
          </label>
          <p className="text-strawberryred text-sm font-medium">{error}</p>
        </div>
        <input
          id={id}
          placeholder={placeholder}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`border ${
            !!error ? "border-strawberryred" : "border-gray-300"
          } w-full py-3 rounded-lg px-4 mt-2 font-medium`}
        />
      </div>
    </>
  );
};
