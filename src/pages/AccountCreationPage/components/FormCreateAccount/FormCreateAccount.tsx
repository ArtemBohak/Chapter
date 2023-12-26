import { ChangeEvent, FC, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik, Form, FormikProps, FormikHelpers } from "formik";
import cn from "classnames";

import { EndpointsEnum, api } from "@/src/axios";
import { links, keysValue, apiErrorMessage, apiUiMessage } from "@/src/types";
import { useDebounce, useErrorBoundary } from "@/src/hooks";
import {
  deleteCookie,
  emojiRegex,
  getCookies,
  getDataFromLS,
  removeDataFromLS,
} from "@/src/utils";

import { IAccountCreate } from "./FormCreateAccount.type";
import validationSchema from "./validationSchema";
import styles from "./FormCreateAccount.module.scss";

import UIbutton from "@/src/components/Buttons/UIbutton/UIbutton";
import { TextField, PasswordField } from "@/src/components/Fields";

const initialValues: IAccountCreate = {
  fullname: "",
  nickName: "",
  password: "",
  confirm_password: "",
};

const FormCreateAccount: FC = () => {
  const setError = useErrorBoundary();
  const LSFullName = localStorage.getItem("fullName");
  const fullname = LSFullName ? LSFullName : "";

  const [nkIsLoading, setNkIsLoading] = useState(false);
  const [nkErrorMessage, setNkErrorMessage] = useState<string | null>(null);
  const [errorMessageForm, setErrorMessageForm] = useState<
    string | null | undefined
  >(null);
  const [nickname, setNickname] = useState<string>("");
  const debouncedNickname = useDebounce(nickname, 500);
  const navigate = useNavigate();
  const { userId } = useParams();
  const [email] = getCookies(keysValue.EMAIL);

  async function handleNicknameChange(nickname: string) {
    try {
      setNkErrorMessage(null);
      if (nickname.trim().length >= 8) {
        setNkIsLoading(true);
        await api.post(
          `${EndpointsEnum.NICKNAME_VALIDATION}/${nickname}`,
          null
        );
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data.error === apiErrorMessage.NICKNAME_IN_USE) {
          return setNkErrorMessage(apiUiMessage.NICKNAME_IN_USE);
        }
      }
    } finally {
      setNkIsLoading(false);
    }
  }

  async function handleCreateAccount(
    values: IAccountCreate,
    { setSubmitting }: FormikHelpers<IAccountCreate>
  ) {
    try {
      setErrorMessageForm(null);
      setSubmitting(true);

      const [firstName, lastName = ""] = values.fullname
        .trim()
        .split(" ")
        .filter((el) => el);

      const { nickName, confirm_password, password } = values;

      await api.patch(`${EndpointsEnum.REGISTRATION_FINALLY}/${userId}`, {
        nickName,
        password,
        confirmPassword: confirm_password,
        firstName,
        lastName,
        IsAccessCookie: !!getDataFromLS("cookieAccept") || false,
        email,
      });

      removeDataFromLS(keysValue.FULL_NAME);
      deleteCookie(
        keysValue.EMAIL,
        keysValue.USER_ID,
        keysValue.DELETED_ACCOUNT_TIME_STAMP,
        keysValue.RESTORE_EMAIL,
        keysValue.RESTORE_TOKEN
      );
      navigate(links.LOG_IN);
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log(e);
        setError(e);
        setErrorMessageForm(
          e.response?.data.message ||
            e.response?.data.error ||
            e.response?.data.errors.password
        );
      }
      setSubmitting(false);
    }
  }

  const onHandleChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      !e.currentTarget.value.startsWith("@") &&
      e.currentTarget.value.length
    ) {
      return setNickname(
        "@" + e.currentTarget.value.replace(" ", "").replace(emojiRegex, "")
      );
    }
    setNickname(e.currentTarget.value.replace(" ", "").replace(emojiRegex, ""));
  };

  const onHandleChange = (
    e: ChangeEvent<HTMLInputElement>,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  ) => {
    e.target.value = e.target.value.replace(" ", "").replace(emojiRegex, "");
    handleChange(e);
  };

  useEffect(() => {
    if (debouncedNickname !== "") {
      handleNicknameChange(debouncedNickname);
    }

    if (debouncedNickname.length < 8) setNkErrorMessage(null);
  }, [debouncedNickname]);

  return (
    <div className={cn(styles["form-create-account"])}>
      <Formik
        initialValues={{ ...initialValues, fullname }}
        validationSchema={validationSchema}
        onSubmit={handleCreateAccount}
      >
        {({
          isSubmitting,
          isValid,
          dirty,
          values,
          handleChange,
        }: FormikProps<IAccountCreate>) => (
          <Form>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              className="invisible"
              aria-label="email"
            />
            <TextField
              id="fullname"
              name="fullname"
              label="Full Name"
              value={values.fullname}
              placeholder="ex. John Brick, Dina O’neal, Jonathan... "
              dataAutomation="fullname"
              showSuccessIcon={true}
              onChange={(e) => {
                e.target.value = e.target.value.replace(emojiRegex, "");
                handleChange(e);
              }}
            />
            <TextField
              id="nickName"
              name="nickName"
              label="Nickname"
              value={nickname}
              placeholder="@JaneSMTH"
              dataAutomation="nickname"
              showSuccessIcon={true}
              onChange={onHandleChangeNickname}
              customErrorMessage={nkErrorMessage}
            />
            <PasswordField
              id="password"
              name="password"
              label="Create password"
              placeholder="Enter your password"
              strength
              dataAutomation="password"
              onChange={(e) => onHandleChange(e, handleChange)}
            />
            <PasswordField
              id="confirm_password"
              name="confirm_password"
              label="Confirm password"
              placeholder="Re-enter your password"
              dataAutomation="confirm_password"
              onChange={(e) => onHandleChange(e, handleChange)}
            />
            <UIbutton
              type="submit"
              fullWidth
              dataAutomation="submitButton"
              className={styles["button"]}
              disabled={!isValid || !dirty || !!nkErrorMessage || nkIsLoading}
              isLoading={isSubmitting}
            >
              Save changes
            </UIbutton>
            {errorMessageForm ? (
              <p className="text-red text-s text-center mt-1 mr-2">
                {errorMessageForm}
              </p>
            ) : null}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormCreateAccount;
