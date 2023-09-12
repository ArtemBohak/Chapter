import { FC } from "react";

import { UIbutton } from "@/src/components";
import { IconEnum } from "@/src/components/Icon";
import { Link } from "react-router-dom";
import { links } from "@/src/utils/links/links.types";

const UIPage: FC = () => {
  return (
    <div className="pt-[130px] pb-[100px]">
      <ul className="flex gap-3 justify-center flex-wrap  p-2 text-lg border-2 bg-gray-300">
        <li>
          <Link to={links.WELCOME}>Welcome</Link>
        </li>
        <li>
          <Link to={links.SIGN_UP}>Sign Up</Link>
        </li>
        <li>
          <Link to={links.ACCOUNT_CREATION}>Account creation</Link>
        </li>
        <li>
          <Link to={links.LOG_IN}>Login</Link>
        </li>
        <li>
          <Link to={links.FORGOT_PASSWORD}>Forgot password</Link>
        </li>
        <li>
          <Link to={links.FEED}>Feed</Link>
        </li>
        <li>
          <Link to={links.SETTINGS}>Settings</Link>
        </li>
        <li>
          <Link to={links.NOT_FOUND}>Not found</Link>
        </li>
      </ul>
      <div className="max-w-[1200px] w-full mx-auto px-2-md">
        <div className="mb-4">
          <div>
            <h1>Typography h1</h1>
            <h2>Typography h2</h2>
            <h3>Typography h3</h3>
            <h4>Typography h4</h4>
            <h5>Typography h5</h5>
            <p className="subtitle1">subtitle1</p>
            <p className="subtitle2">subtitle2</p>
            <p className="subtitle3">subtitle3</p>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-12">
            <div className="w-1/4">
              <div className="mb-2">
                <UIbutton
                  variant="contained"
                  color="primary"
                  dataAutomation={""}
                >
                  Button small
                </UIbutton>
              </div>
              <div className="mb-2">
                <UIbutton
                  variant="contained"
                  color="primary"
                  size="medium"
                  dataAutomation={""}
                >
                  Button medium
                </UIbutton>
              </div>
              <div className="mb-2">
                <UIbutton
                  variant="contained"
                  color="primary"
                  size="large"
                  dataAutomation={""}
                >
                  Button large
                </UIbutton>
              </div>
            </div>
            <div className="w-1/4">
              <div className="mb-2">
                <UIbutton
                  variant="outlined"
                  color="primary"
                  dataAutomation={""}
                >
                  Button small
                </UIbutton>
              </div>
              <div className="mb-2">
                <UIbutton
                  variant="outlined"
                  color="primary"
                  size="medium"
                  dataAutomation={""}
                >
                  Button medium
                </UIbutton>
              </div>
              <div className="mb-2">
                <UIbutton
                  variant="outlined"
                  color="primary"
                  size="large"
                  dataAutomation={""}
                >
                  Button large
                </UIbutton>
              </div>
            </div>
            <div className="w-1/4">
              <div className="mb-2">
                <UIbutton
                  variant="outlined"
                  color="primary"
                  disabled
                  dataAutomation={""}
                >
                  Button small
                </UIbutton>
              </div>
              <div className="mb-2">
                <UIbutton
                  variant="outlined"
                  color="primary"
                  size="medium"
                  disabled
                  dataAutomation={""}
                >
                  Button medium
                </UIbutton>
              </div>
              <div className="mb-2">
                <UIbutton
                  variant="outlined"
                  color="primary"
                  size="large"
                  disabled
                  dataAutomation={""}
                >
                  Button large
                </UIbutton>
              </div>
            </div>
            <div className="w-1/4 mb-8">
              <div className="mb-2">
                <UIbutton variant="text" color="primary" dataAutomation={""}>
                  Button small
                </UIbutton>
              </div>
              <div className="mb-2">
                <UIbutton
                  variant="text"
                  color="primary"
                  size="medium"
                  dataAutomation={""}
                >
                  Button medium
                </UIbutton>
              </div>
              <div className="mb-2">
                <UIbutton
                  variant="text"
                  color="primary"
                  size="large"
                  dataAutomation={""}
                >
                  Button large
                </UIbutton>
              </div>
            </div>
            <div className="w-1/3 mb-8">
              <div className="mb-2">
                <UIbutton
                  variant="contained"
                  color="primary"
                  isLoading
                  dataAutomation={""}
                >
                  Button loading
                </UIbutton>
              </div>
              <div className="mb-2">
                <UIbutton
                  variant="contained"
                  color="primary"
                  size="medium"
                  isLoading
                  dataAutomation={""}
                >
                  Button loading
                </UIbutton>
              </div>
              <div className="mb-2">
                <UIbutton
                  variant="contained"
                  color="primary"
                  size="large"
                  isLoading
                  dataAutomation={""}
                >
                  Button loading
                </UIbutton>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-12">
            <div className="w-1/4">
              <div className="mb-2">
                <UIbutton
                  variant="contained"
                  color="primary"
                  icon={IconEnum.Eye}
                  dataAutomation={""}
                >
                  Button
                </UIbutton>
              </div>
              <div className="mb-2">
                <UIbutton
                  variant="contained"
                  color="primary"
                  size="medium"
                  icon={IconEnum.Eye}
                  dataAutomation={""}
                >
                  Button
                </UIbutton>
              </div>
              <div className="mb-2">
                <UIbutton
                  variant="contained"
                  color="primary"
                  size="large"
                  icon={IconEnum.Eye}
                  dataAutomation={""}
                >
                  Button
                </UIbutton>
              </div>
            </div>
            <div className="w-1/4">
              <div className="mb-2">
                <UIbutton
                  variant="contained"
                  color="primary"
                  icon={IconEnum.Eye}
                  alignIcon="right"
                  dataAutomation={""}
                >
                  Button
                </UIbutton>
              </div>
              <div className="mb-2">
                <UIbutton
                  variant="contained"
                  color="primary"
                  size="medium"
                  icon={IconEnum.Eye}
                  alignIcon="right"
                  dataAutomation={""}
                >
                  Button
                </UIbutton>
              </div>
              <div className="mb-2">
                <UIbutton
                  variant="contained"
                  color="primary"
                  size="large"
                  icon={IconEnum.Eye}
                  alignIcon="right"
                  dataAutomation={""}
                >
                  Button
                </UIbutton>
              </div>
            </div>
            <div className="w-1/4">
              <div className="mb-2">
                <UIbutton
                  variant="contained"
                  color="primary"
                  isCustomIcon
                  dataAutomation={""}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M2.66699 16C2.66699 9.71457 2.66699 6.57187 4.61961 4.61925C6.57223 2.66663 9.71493 2.66663 16.0003 2.66663C22.2857 2.66663 25.4284 2.66663 27.381 4.61925C29.3337 6.57187 29.3337 9.71457 29.3337 16C29.3337 22.2854 29.3337 25.428 27.381 27.3807C25.4284 29.3333 22.2857 29.3333 16.0003 29.3333C9.71493 29.3333 6.57223 29.3333 4.61961 27.3807C2.66699 25.428 2.66699 22.2854 2.66699 16Z"
                      stroke="#FFFBFE"
                      stroke-width="2"
                    />
                    <path
                      d="M20 16L16 16M16 16L12 16M16 16L16 12M16 16L16 20"
                      stroke="#FFFBFE"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                  Button
                </UIbutton>
              </div>
              <div className="mb-2">
                <UIbutton
                  variant="contained"
                  color="primary"
                  size="medium"
                  isCustomIcon
                  dataAutomation={""}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M2.66699 16C2.66699 9.71457 2.66699 6.57187 4.61961 4.61925C6.57223 2.66663 9.71493 2.66663 16.0003 2.66663C22.2857 2.66663 25.4284 2.66663 27.381 4.61925C29.3337 6.57187 29.3337 9.71457 29.3337 16C29.3337 22.2854 29.3337 25.428 27.381 27.3807C25.4284 29.3333 22.2857 29.3333 16.0003 29.3333C9.71493 29.3333 6.57223 29.3333 4.61961 27.3807C2.66699 25.428 2.66699 22.2854 2.66699 16Z"
                      stroke="#FFFBFE"
                      stroke-width="2"
                    />
                    <path
                      d="M20 16L16 16M16 16L12 16M16 16L16 12M16 16L16 20"
                      stroke="#FFFBFE"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                  Button
                </UIbutton>
              </div>
              <div className="mb-2">
                <UIbutton
                  variant="contained"
                  color="primary"
                  size="large"
                  isCustomIcon
                  dataAutomation={""}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M2.66699 16C2.66699 9.71457 2.66699 6.57187 4.61961 4.61925C6.57223 2.66663 9.71493 2.66663 16.0003 2.66663C22.2857 2.66663 25.4284 2.66663 27.381 4.61925C29.3337 6.57187 29.3337 9.71457 29.3337 16C29.3337 22.2854 29.3337 25.428 27.381 27.3807C25.4284 29.3333 22.2857 29.3333 16.0003 29.3333C9.71493 29.3333 6.57223 29.3333 4.61961 27.3807C2.66699 25.428 2.66699 22.2854 2.66699 16Z"
                      stroke="#FFFBFE"
                      stroke-width="2"
                    />
                    <path
                      d="M20 16L16 16M16 16L12 16M16 16L16 12M16 16L16 20"
                      stroke="#FFFBFE"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                  Button
                </UIbutton>
              </div>
            </div>
            <div className="w-1/4">
              <div className="mb-2">
                <UIbutton
                  variant="contained"
                  color="primary"
                  alignIcon="right"
                  isCustomIcon
                  dataAutomation={""}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M2.66699 16C2.66699 9.71457 2.66699 6.57187 4.61961 4.61925C6.57223 2.66663 9.71493 2.66663 16.0003 2.66663C22.2857 2.66663 25.4284 2.66663 27.381 4.61925C29.3337 6.57187 29.3337 9.71457 29.3337 16C29.3337 22.2854 29.3337 25.428 27.381 27.3807C25.4284 29.3333 22.2857 29.3333 16.0003 29.3333C9.71493 29.3333 6.57223 29.3333 4.61961 27.3807C2.66699 25.428 2.66699 22.2854 2.66699 16Z"
                      stroke="#FFFBFE"
                      stroke-width="2"
                    />
                    <path
                      d="M20 16L16 16M16 16L12 16M16 16L16 12M16 16L16 20"
                      stroke="#FFFBFE"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                  Button
                </UIbutton>
              </div>
              <div className="mb-2">
                <UIbutton
                  variant="contained"
                  color="primary"
                  size="medium"
                  alignIcon="right"
                  isCustomIcon
                  dataAutomation={""}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M2.66699 16C2.66699 9.71457 2.66699 6.57187 4.61961 4.61925C6.57223 2.66663 9.71493 2.66663 16.0003 2.66663C22.2857 2.66663 25.4284 2.66663 27.381 4.61925C29.3337 6.57187 29.3337 9.71457 29.3337 16C29.3337 22.2854 29.3337 25.428 27.381 27.3807C25.4284 29.3333 22.2857 29.3333 16.0003 29.3333C9.71493 29.3333 6.57223 29.3333 4.61961 27.3807C2.66699 25.428 2.66699 22.2854 2.66699 16Z"
                      stroke="#FFFBFE"
                      stroke-width="2"
                    />
                    <path
                      d="M20 16L16 16M16 16L12 16M16 16L16 12M16 16L16 20"
                      stroke="#FFFBFE"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                  Button
                </UIbutton>
              </div>
              <div className="mb-2">
                <UIbutton
                  variant="contained"
                  color="primary"
                  size="large"
                  alignIcon="right"
                  isCustomIcon
                  dataAutomation={""}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M2.66699 16C2.66699 9.71457 2.66699 6.57187 4.61961 4.61925C6.57223 2.66663 9.71493 2.66663 16.0003 2.66663C22.2857 2.66663 25.4284 2.66663 27.381 4.61925C29.3337 6.57187 29.3337 9.71457 29.3337 16C29.3337 22.2854 29.3337 25.428 27.381 27.3807C25.4284 29.3333 22.2857 29.3333 16.0003 29.3333C9.71493 29.3333 6.57223 29.3333 4.61961 27.3807C2.66699 25.428 2.66699 22.2854 2.66699 16Z"
                      stroke="#FFFBFE"
                      stroke-width="2"
                    />
                    <path
                      d="M20 16L16 16M16 16L12 16M16 16L16 12M16 16L16 20"
                      stroke="#FFFBFE"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>
                  Button
                </UIbutton>
              </div>
            </div>
            <div className="w-1/3">
              <div className="mb-2">
                <UIbutton
                  variant="contained"
                  color="primary"
                  fullWidth
                  dataAutomation={""}
                >
                  Button
                </UIbutton>
              </div>
              <div className="mb-2">
                <UIbutton
                  variant="contained"
                  color="primary"
                  size="medium"
                  fullWidth
                  dataAutomation={""}
                >
                  Button
                </UIbutton>
              </div>
              <div className="mb-2">
                <UIbutton
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  dataAutomation={""}
                >
                  Button
                </UIbutton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UIPage;
