import React, { createRef, forwardRef } from 'react';
import dynamic from 'next/dynamic';
import { Button } from 'antd';

// Dynamically imported component
const Component = dynamic(import('../Components/Experiment/SomeComponents'), { ssr: false });

function ForwardedRefComponent(props: any, ref: any) {
  return <Component props={props} forwardedRef={ref} />;
}

const BarApex = forwardRef(ForwardedRefComponent);

function Experiment() {
  const myref = createRef();
  const saveToArchive = () => {
    // console.log(myref);
  };

  return (
    <>
      <Button type="primary" onClick={() => { saveToArchive(); }}>Download PDF Report</Button>
      <BarApex height={200} ref={myref} />
    </>
  );
}

export default Experiment;
