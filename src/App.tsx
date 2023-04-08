import React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AddOns } from "./component/form/AddOns";
import { PersonalInfo } from "./component/form/PersonalInfo";
import { Plan } from "./component/form/Plan";
import { Summary } from "./component/form/Summary";
import { Thankyou } from "./component/form/Thankyou";
import { Step } from "./component/Step";

function App() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const current = Number(params.get("step")) || -1;
  const completed = params.get("completed") == "true";

  const submitbutton = React.createRef<HTMLFormElement>();

  useEffect(() => {
    if (current <= 0 || current >= 5) {
      navigate("/?step=1");
    }
  }, []);

  const goBack = () => {
    navigate(`/?step=${current - 1}`);
  };

  return (
    <div className="md:bg-white md:p-4 shadow-none md:shadow-xl max-w-[940px] mx-auto md:my-[62px] flex flex-col  md:flex-row md:rounded-[18px]">
      <div className="shrink-0 p-[30px] md:bg-sidebarBgDesktop bg-sidebarBgMobile bg-no-repeat bg-cover md:basis-[275px] bg-strech md:min-h-[570px] flex md:flex-col gap-4 md:rounded-[18px] justify-center md:justify-start pb-[104px]">
        <Step step={1} title="Your info" active={current == 1} />
        <Step step={2} title="Select plan" active={current == 2} />
        <Step step={3} title="Add-ons" active={current == 3} />
        <Step step={4} title="Summary" active={current == 4} />
      </div>
      <div className="md:px-24 grow flex flex-col  -mt-[74px] md:mt-0">
        <div className="grow bg-white rounded-xl shadow-xl md:shadow-none md:mx-0 px-8 md:px-0 py-8 md:py-0 mx-4">
          {current == 1 && <PersonalInfo ref={submitbutton} />}
          {current == 2 && <Plan ref={submitbutton} />}
          {current == 3 && <AddOns ref={submitbutton} />}
          {current == 4 && (completed ? <Thankyou /> : <Summary />)}
        </div>
        {!completed && (
          <div className="flex justify-between flex-row-reverse bg-white px-4 md:px-4 mt-4 md:mt-16 py-4 md:py-0">
            <>
              {current != 4 && (
                <button
                  className="self-end bg-marineblue text-white py-3 px-6 rounded-lg tracking-wider text-base "
                  onClick={() => {
                    submitbutton.current?.click();
                  }}
                >
                  Next Step
                </button>
              )}

              {current == 4 && (
                <button
                  className="self-end bg-purplishblue text-white py-3 px-6 rounded-lg tracking-wider text-base"
                  onClick={() => {
                    navigate("?step=4&completed=true");
                  }}
                >
                  Finish
                </button>
              )}

              {current != 1 && (
                <button
                  className="self-end  text-coolgray p-3 rounded-lg tracking-wider text-base"
                  onClick={goBack}
                >
                  Go Back
                </button>
              )}
            </>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
