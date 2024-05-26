import { DetailedHTMLProps, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function PageWrapper(props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
  return (
    <main
      {...props}
      className={twMerge("p-8 lg:p-12 bg-no-repeat z-10 grow overflow-auto relative", props.className)}
    />
  );
}
