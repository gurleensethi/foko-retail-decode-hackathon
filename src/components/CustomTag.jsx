import { useStyletron } from "baseui";

export const CustomTag = ({ textColor, backgroundColor, text }) => {
  const [css] = useStyletron();

  return (
    <span
      className={css({
        color: textColor,
        backgroundColor,
        padding: "2px 12px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "bold",
        border: `1.5px solid ${textColor}`,
      })}
    >
      {text}
    </span>
  );
};
