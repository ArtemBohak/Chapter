import { FC } from "react";
import PublicLayout from "@/src/layouts/PublicLayout/PublicLayout";
import { Page404 } from "./components";

const ErrorPage: FC = () => {
  return (
    <PublicLayout>
      <section className=" text-black-1000 min-h-screen flex flex-col justify-center flex-1 pt-20 pb-4 md:pt-[100px] md:pb-8 bg-orange-900">
        <div className="max-w-[320px] w-full mx-auto ">
          <Page404 />
        </div>
      </section>
    </PublicLayout>
  );
};

export default ErrorPage;
