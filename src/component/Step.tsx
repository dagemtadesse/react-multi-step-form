export const Step = ({
  step,
  title,
  active = false,
}: {
  step: number;
  title: string;
  active: boolean;
}) => {
  return (
    <section className="flex items-center gap-4 py-2">
      <div
        className={`aspect-square h-[34px] rounded-full grid place-items-center ${
          !active && "border border-white text-white"
        } ${active && "bg-lightblue text-black"}
          }`}
      >
        {step}
      </div>
      <div className="uppercase tracking-wider hidden md:block">
        <h2 className="text-lightgray  text-xs">Step {step}</h2>
        <p className="text-white font text-sm mt-2">{title}</p>
      </div>
    </section>
  );
};
