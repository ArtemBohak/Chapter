import { FC, Fragment } from "react";

import {
  isNickNameCheckingPattern,
  replaceLettersPattern,
  replaceSymbolsPattern,
} from "@/src/utils";
import { TextTaggingProps } from "./TextTagging.type";

const TextTagging: FC<TextTaggingProps> = ({
  text,
  className,
  onClick,
  textClassName = "",
}) => {
  const textArray = text.split(" ");

  const renderString = (value: string) => {
    if (isNickNameCheckingPattern.test(value)) {
      const formattedValue = value.replace(replaceSymbolsPattern, "");
      const symbol = value.replace(replaceLettersPattern, "");

      return (
        <>
          <button
            onClick={onClick}
            className={className}
            value={formattedValue}
          >
            {formattedValue}
          </button>
          {symbol}
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
