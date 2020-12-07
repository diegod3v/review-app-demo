import classnames from "classnames";
import { useEffect, useState } from "react";

type Props = {
  rate: number;
  size?: "small" | "medium" | "large";
  inline?: boolean;
  editable?: boolean;
  onChange?: (item: number) => void;
};

const MAX_RATE = 5;

function Rate({
  rate = 0,
  size = "medium",
  editable,
  inline,
  onChange,
}: Props) {
  const [tempRate, setTempRate] = useState<number | undefined>();

  const cleanRate = tempRate ?? Math.round(rate) % 6;
  const stars = [
    ...Array(cleanRate).fill(true),
    ...Array(MAX_RATE - cleanRate).fill(false),
  ];
  return (
    <div
      className={classnames("items-center", {
        flex: !inline,
        "inline-flex": inline,
      })}
      onMouseLeave={() => editable && setTempRate(undefined)}
    >
      {stars.map((isOn, i) => (
        <svg
          key={i}
          className={classnames("mr-1 fill-current", {
            "w-3 h-3": size === "small",
            "w-5 h-5": size === "medium",
            "w-8 h-8": size === "large",
            "text-yellow-500": isOn,
            "text-gray-400": !isOn,
          })}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          onClick={() => onChange && onChange(i)}
          onMouseEnter={() => editable && setTempRate(i + 1)}
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
}

export default Rate;
