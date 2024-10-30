import { useState, useEffect } from "react";

function Header({
  toggleUpdate1,
  toggleUpdate2,
  handleScrollToRegisterDonor,
  handleScrollToPatient,
}) {
  const [info, setInfo] = useState("REGISTER AS DONOR");
  const [info2, setInfo2] = useState("EMERGENCY UPDATE");
  const [close, setClose] = useState(false);
  const [close2, setClose2] = useState(false);
  const [fix1, setFix1] = useState(false);
  const [fix2, setFix2] = useState(false);
  const [hasScrolledDownOnce, setHasScrolledDownOnce] = useState(false);

  // Scroll view
  useEffect(() => {
    const handleScroll = () => {
      if (
        !hasScrolledDownOnce &&
        window.scrollY > 100 &&
        !fix1 &&
        !fix2 &&
        !close &&
        !close2
      ) {
        const nextComponent = document.getElementById("main");
        if (nextComponent) {
          nextComponent.scrollIntoView({ behavior: "smooth" });
          setHasScrolledDownOnce(true);
        }
      } else if (window.scrollY === 0 && hasScrolledDownOnce) {
        setHasScrolledDownOnce(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolledDownOnce, close, close2]);

  useEffect(() => {
    if (close) {
      handleScrollToRegisterDonor();
    }
  }, [close]);

  useEffect(() => {
    if (close2) {
      handleScrollToPatient();
    }
  }, [close2]);

  const handleRegisterClick = () => {
    setFix1((prev) => !prev);
    toggleUpdate1();
    setClose((prev) => !prev);
    setInfo((prev) => (prev === "CLOSE" ? "REGISTER AS DONOR" : "CLOSE"));

    // If emergency update is open, close it
    if (close2) {
      toggleUpdate2();
      setClose2(false);
      setInfo2("EMERGENCY UPDATE");
    }
  };

  const handleEmergencyClick = () => {
    setFix2((prev) => !prev);
    toggleUpdate2();
    setClose2((prev) => !prev);
    setInfo2((prev) => (prev === "CLOSE" ? "EMERGENCY UPDATE" : "CLOSE"));

    // If donor registration is open, close it
    if (close) {
      toggleUpdate1();
      setClose(false);
      setInfo("REGISTER AS DONOR");
    }
  };

  return (
    <header className="head_container">
      {/* TITLE LOGO */}
      <div className="logo_Title">
        <h1
          onClick={() => {
            window.location.reload();
          }}
          className="logo_name"
        ></h1>
      </div>

      {/* REGISTER UPDATE */}
      <div className="Register_Update_lOGIN">
        <div className={`REGISTER ${fix1 ? "fix" : ""}`}>
          <button
            onClick={handleRegisterClick}
            className={`btn_h ${close ? "btn_hr" : "btn_h1"}`}
          >
            {info}
          </button>
        </div>

        <div className={`UPDATE ${fix2 ? "fix" : ""}`}>
          <button
            onClick={handleEmergencyClick}
            className={`btn_h ${close2 ? "btn_hr" : "btn_h2"}`}
          >
            {info2}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
