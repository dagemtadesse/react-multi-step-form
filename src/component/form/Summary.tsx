import { Link } from "react-router-dom";
import { FormTitle } from "../FormTitle";
import { AddOn } from "./AddOns";
import { loadFromLocal } from "./PersonalInfo";
import { billing, BillingPlan } from "./Plan";

export const Summary = () => {
  const { plan, billing: frequency } = loadFromLocal<BillingPlan>(
    "billing-plan",
    {
      plan: "arcade",
      billing: "monthly",
    }
  );

  const addons = loadFromLocal<AddOn>("add-ons", {
    addons: [],
  });

  const suffix = frequency == "monthly" ? "mo" : "yr";

  let total = addons.addons
    .map((addon) => billing[addon][frequency])
    .reduce((prev, cur) => cur + prev, 0);

  total += billing[plan][frequency];

  return (
    <>
      <FormTitle
        title="Finishing up"
        description="Double check everythings OK before confirming"
      />
      <div className="bg-magnolia p-4 rounded-lg border border-lightgray mt-10">
        <div className="flex justify-between items-center border-b border-b-lightgray pb-6 pt-4">
          <div>
            <h2 className="text-marineblue font-medium capitalize">
              {plan} ({frequency})
            </h2>
            <p className="underline text-coolgray text-sm">
              <Link to="?step=2">Change</Link>
            </p>
          </div>
          <p className="text-marineblue font-bold">
            {billing[plan][frequency]}/{suffix}
          </p>
        </div>

        {addons.addons.map((addon) => (
          <div className="flex justify-between items-center py-2 text-sm" key={addon}>
            <div>
              <h2 className="text-coolgray">{billing[addon].name}</h2>
            </div>
            <p className="text-marineblue ">
              +${billing[addon][frequency]}/{suffix}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center py-5 text-sm px-4">
        <div>
          <h2 className="text-coolgray">Total (per {frequency})</h2>
        </div>
        <p className="text-purplishblue text-lg ">
          +${total}/{suffix}
        </p>
      </div>
    </>
  );
};
