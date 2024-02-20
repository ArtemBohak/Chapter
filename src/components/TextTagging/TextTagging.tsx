import { FC, Fragment } from "react";
import { Link } from "react-router-dom";

import { useAppSelector } from "@/src/redux";
import {
  isNickNameCheckingPattern,
  replaceLettersPattern,
  replaceSymbolsPattern,
} from "@/src/utils";
import { TextTaggingProps } from "./TextTagging.type";

const TextTagging: FC<TextTaggingProps> = ({
  text,
  className,
  textClassName = "",
  linkClassName = "",
  replyTo,
  withTag = false,
  onClick,
}) => {
  const textArray = text.split(" ");
  const userId = useAppSelector((state) => state.userSlice.user.id);
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
        <Link
          className={linkClassName}
          to={replyTo.id !== userId ? "/" + replyTo.id : "#"}
        >
          {replyTo.nickName}
        </Link>
        {text}
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
