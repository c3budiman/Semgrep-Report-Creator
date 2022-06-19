import { forwardRef, useImperativeHandle } from "react";

interface ImperativeProps {
  height: string | number;
}

function Imperative(props: ImperativeProps, ref: any) {
  const { height = 250 } = props;

  useImperativeHandle(ref, () => ({
    tes: "tes",
    someIdiot: () => "anjasss",
  }));

  return (<div>{height}</div>);
}

const ImperativeTesting = forwardRef(Imperative);
export default ImperativeTesting;
