import { useImperativeHandle } from "react";

// @ts-ignore
export default function SomeComponent({ props, forwardedRef }) {
  console.log(props);
  useImperativeHandle(forwardedRef, () => ({
    tes: "tes",
    someIdiot: () => "anjasss",
  }));
  return (
    <div ref={forwardedRef}>
      Hi from Component
      {' '}
    </div>
  );
}
