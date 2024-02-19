import { FC, Fragment } from "react";

import {
  isNickNameCheckingPattern,
  replaceLettersPattern,
  replaceSymbolsPattern,
} from "@/src/utils";
import { TextTaggingProps } from "./TextTagging.type";
import { Link } from "react-router-dom";

const TextTagging: FC<TextTaggingProps> = ({
  text,
  className,
  textClassName = "",
  replyTo,
  withTag = false,
  onClick,
}) => {
  const textArray = text.split(" ");

  const renderButton = (value: string) => {
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

  if (replyTo)
    return (
      <p className={textClassName}>
        <Link to={`/${replyTo.id}`}>{replyTo.nickName}</Link> {text}
      </p>
    );

  if (withTag)
    return (
      <p className={textClassName}>
        {textArray.map((item, index) => {
          return <Fragment key={index}>{renderButton(item)}</Fragment>;
        })}
      </p>
    );

  return <p className={textClassName}>{text}</p>;
};

export default TextTagging;
