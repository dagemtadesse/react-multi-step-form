import { useFormik } from "formik";
import { forwardRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { number, object, string } from "yup";
import { FormTitle } from "../FormTitle";
import { loadFromLocal } from "./PersonalInfo";

export const billing = {
  arcade: {
    monthly: 9,
    yearly: 90,
  },

  advanced: {
    monthly: 12,
    yearly: 120,
  },

  pro: {
    monthly: 15,
    yearly: 150,
  },

  "online-service": { name: "Online Service", monthly: 1, yearly: 10 },
  "large-storage": { name: "Larger Storage", monthly: 2, yearly: 20 },
  "custom-profile": { name: "Customizable profile", monthly: 5, yearly: 50 },
};

export type Frequency = "monthly" | "yearly";

export interface BillingPlan {
  plan: "arcade" | "advanced" | "pro";
  billing: Frequency;
}

const PlanValidationSchema = object({
  plan: string().required(),
  billing: string().required(),
});

export const Plan = forwardRef((props, ref: any) => {
  const navigate = useNavigate();

  const { values, setFieldValue, handleSubmit } = useFormik<BillingPlan>({
    initialValues: loadFromLocal<BillingPlan>("billing-plan", {
      plan: "arcade",
      billing: "monthly",
    }),
    onSubmit: (values) => {
      localStorage.setItem("billing-plan", JSON.stringify(values));
      navigate("?step=3");
    },
    validationSchema: PlanValidationSchema,
  });

  const select = (field: string, val: string) => {
    return () => setFieldValue(field, val);
  };

  return (
    <div>
      <FormTitle
        title="Select your plan"
        description="You have the option of monthly or yearly billing"
      />
      <form onSubmit={handleSubmit}>
        <div className="mt-10 flex gap-4">
          <CheckPlan
            iconSrc="/icon-arcade.svg"
            title="Arcade"
            price={billing.arcade}
            sale={values.billing == "yearly"}
            selected={values.plan == "arcade"}
            setSelected={select("plan", "arcade")}
            frequency={values.billing satisfies Frequency}
          />

          <CheckPlan
            iconSrc="/icon-advanced.svg"
            title="Advanced"
            price={billing.advanced}
            sale={values.billing == "yearly"}
            selected={values.plan == "advanced"}
            setSelected={select("plan", "advanced")}
            frequency={values.billing satisfies Frequency}
          />

          <CheckPlan
            iconSrc="/icon-pro.svg"
            title="Pro"
            price={billing.pro}
            sale={values.billing == "yearly"}
            selected={values.plan == "pro"}
            setSelected={select("plan", "pro")}
            frequency={values.billing satisfies Frequency}
          />
        </div>

        <PlanToggler billing={values.billing} setValue={setFieldValue} />

        <button type="submit" ref={ref} style={{ display: "none" }}></button>
      </form>
    </div>
  );
});

const CheckPlan = ({
  iconSrc,
  title,
  price,
  sale,
  selected,
  setSelected,
  frequency,
}: {
  iconSrc: string;
  title: string;
  price: { [key in Frequency]: number };
  frequency: Frequency;
  sale: boolean;
  selected: boolean;
  setSelected: any;
}) => {
  const suffix = frequency == "monthly" ? "mo" : "yr";

  return (
    <div
      className={`border border-lightgray p-4 rounded-lg w-[138px] hover:bg-magnolia ${
        selected ? "border-purplishblue bg-magnolia" : ""
      } hover:border-purplishblue`}
      onClick={setSelected}
    >
      <img src={iconSrc} />
      <h2 className="mt-6 text-marineblue font-bold">{title}</h2>
      <p className="text-coolgray font-light text-sm mt-2">{`$${price[frequency]}/${suffix}`}</p>
      {sale && <p className="text-marineblue text-sm mt-2">2 month free</p>}
    </div>
  );
};

const PlanToggler = ({
  billing,
  setValue,
}: {
  billing: string;
  setValue: any;
}) => {
  const toggle = (newbilling?: "monthly" | "yearly") => {
    setValue(
      "billing",
      newbilling || billing != "monthly" ? "monthly" : "yearly"
    );
  };

  const isMonthly = billing == "monthly";

  const linkStyle = (val: boolean) =>
    val ? "text-marineblue font-medium" : "text-coolgray";

  return (
    <div className="bg-alabaster p-3 mt-8 rounded-lg flex justify-center gap-6 items-center transition-all duration-300 ease-in-out">
      <p className={linkStyle(isMonthly)} onClick={() => toggle("monthly")}>
        Monthly
      </p>
      <div
        className={`w-8 rounded-full bg-marineblue h-5 py-1 px-1 flex ${
          isMonthly ? "justify-start" : "justify-end"
        }`}
        onClick={() => toggle()}
      >
        <div className="bg-white rounded-full aspect-square w-3"></div>
      </div>
      <p className={linkStyle(!isMonthly)} onClick={() => toggle("yearly")}>
        Yearly
      </p>
    </div>
  );
};
