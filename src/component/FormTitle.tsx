export const FormTitle = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <>
      <h1 className="text-4xl font-bold mt-7 text-marineblue">{title}</h1>
      <p className="text-coolgray mt-5">{description}</p>
    </>
  );
};
