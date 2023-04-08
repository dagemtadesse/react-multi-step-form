import { useFormik } from "formik";
import { forwardRef } from "react";
import { useNavigate } from "react-router";
import { FormTitle } from "../FormTitle";
import { loadFromLocal } from "./PersonalInfo";
import { billing, BillingPlan, Frequency } from "./Plan";

export type AddonTypes = "online-service" | "large-storage" | "custom-profile";

export interface AddOn {
  addons: AddonTypes[];
}

export const AddOns = forwardRef((props, ref: any) => {
  const navigate = useNavigate();

  const { handleSubmit, values, setFieldValue } = useFormik({
    onSubmit: (values) => {
      localStorage.setItem("add-ons", JSON.stringify(values));
      navigate("?step=4");
    },

    initialValues: loadFromLocal<AddOn>("add-ons", {
      addons: [] satisfies string[],
    }),
  });

  const toggleAddons = (item:  AddonTypes) => {
    const index = values.addons.findIndex((i) => i == item);

    if (index >= 0) {
      setFieldValue(
        "addons",
        values.addons.filter((i) => i != item)
      );
    } else {
      setFieldValue("addons", [...values.addons, item]);
    }
  };

  const plan = loadFromLocal<BillingPlan>("billing-plan", {
    plan: "arcade",
    billing: "monthly",
  });

  return (
    <>
      <FormTitle
        title="Pick add-ons"
        description="Add-ons enhance your gaming experience"
      />

      <form className="flex flex-col gap-4 mt-10" onSubmit={handleSubmit}>
        <AddOnItem
          title="Online Service"
          description="Access to multiplayer games"
          price={billing["online-service"]}
          toggle={() => toggleAddons("online-service")}
          isSelected={!!values.addons.find((item) => item == "online-service")}
          frequency={plan.billing}
        />
        <AddOnItem
          title="Larger Storage"
          description="Access to multiplayer games"
          price={billing["large-storage"]}
          toggle={() => toggleAddons("large-storage")}
          frequency={plan.billing}
          isSelected={!!values.addons.find((item) => item == "large-storage")}
        />
        <AddOnItem
          title="Customizable profile"
          description="Access to multiplayer games"
          price={billing["custom-profile"]}
          toggle={() => toggleAddons("custom-profile")}
          frequency={plan.billing}
          isSelected={!!values.addons.find((item) => item == "custom-profile")}
        />

        <button type="submit" ref={ref} style={{ display: "none" }}></button>
      </form>
    </>
  );
});

const AddOnItem = ({
  title,
  description,
  price,
  isSelected,
  toggle,
  frequency,
}: {
  title: string;
  description: string;
  price: { [key in Frequency]: number };
  frequency: Frequency;
  isSelected?: boolean;
  toggle: () => void;
}) => {
  const suffix = frequency == "monthly" ? "mo" : "yr";

  return (
    <div
      className={`border  rounded-lg flex p-4 items-center justify-between gap-6 hover:bg-alabaster cursor-pointer hover:border-purplishblue ${
        isSelected ? "border-purplishblue bg-alabaster" : "border-lightgray"
      }`}
      onClick={toggle}
    >
      <div
        className={`border border-lightgray p-1 rounded-md aspect-square grid place-items-center ${
          isSelected ? "bg-purplishblue" : ""
        }`}
      >
        <img src="/icon-checkmark.svg" />
      </div>
      <div className="grow">
        <h2 className="text-marineblue font-medium">{title}</h2>
        <p className="font-light text-coolgray mt-1">{description}</p>
      </div>
      <p className="text-purplishblue">{`$${price[frequency]}/${suffix}`}</p>
    </div>
  );
};
