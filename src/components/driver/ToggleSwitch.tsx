import "./ToggleSwitch.css";

const ToggleSwitch = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "20px",
        margin: "50px",
      }}
    >
      <h3
        style={{
          margin: "20px 0",
        }}
      >
        Tap to toggle the availability
      </h3>
      <div className="checkbox-wrapper-31">
        <input type="checkbox" />
        <svg viewBox="0 0 35.6 35.6">
          <circle className="background" cx="17.8" cy="17.8" r="17.8"></circle>
          <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
          <polyline
            className="check"
            points="11.78 18.12 15.55 22.23 25.17 12.87"
          ></polyline>
        </svg>
      </div>
    </div>
  );
};

export default ToggleSwitch;
