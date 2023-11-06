import { FC, Fragment } from "react";

import { nickNameCharsRegex, symbolsCharsRegex } from "@/src/utils";
import { TextTaggingProps } from "./TextTagging.type";

const TextTagging: FC<TextTaggingProps> = ({
  text,
  className,
  onClick,
  searchValue = "@",
  textClassName = "",
}) => {
  const textArray = text.split(" ");

  const renderString = (value: string) => {
    if (value.includes(searchValue)) {
      const formattedValue = value.replace(nickNameCharsRegex, "");

      const symbol = value.replace(symbolsCharsRegex, "");

      return (
        <>
          <button
            onClick={onClick}
            className={className}
            value={formattedValue}
          >
            {formattedValue}
          </button>
          {`${symbol}`}
        </>
      );
    }
    return ` ${value} `;
  };

  return (
    <p className={textClassName}>
      {textArray.map((item, index) => {
        return <Fragment key={index}>{renderString(item)}</Fragment>;
      })}
    </p>
  );
};

export default TextTagging;
