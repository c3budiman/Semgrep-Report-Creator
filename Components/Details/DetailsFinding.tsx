import { Col, Row } from "antd";
import React from "react";
import { RowFindingResponse } from "../../Types/FindingsResponse";

type DetailsFindingProps = {
    data: RowFindingResponse | undefined
};

function DetailsFinding({ data }: DetailsFindingProps) {
  return (
    <Row>
      <Col lg={6}>
        <p>
          Github Path
        </p>
      </Col>
      <Col lg={24 - 6}>
        <p>
          :
          {' '}
          {data?.githubPath}
        </p>
      </Col>
      <Col lg={6}>
        <p>
          Finding Message
        </p>
      </Col>
      <Col lg={24 - 6}>
        <p>
          :
          {' '}
          {data?.message}
        </p>
      </Col>
      <Col lg={6}>
        <p>
          Severity
        </p>
      </Col>
      <Col lg={24 - 6}>
        <p>
          :
          {' '}
          {data?.severity}
        </p>
      </Col>
    </Row>
  );
}
export default DetailsFinding;
