import { Button, Col, Form, Input, Modal, Row } from "antd";
import React from "react";
import { themeColor } from "../../Configs/themeColor";
import { fetchUpdateFinding } from "../../Services/FindingService";
import { RowFindingResponse, UpdateFindingResponse } from "../../Types/FindingsResponse";
import { showError, showSuccess } from "../../Utils/Helpers/AntdHelper";
import DetailsFinding from "../Details/DetailsFinding";
// import { InsertAssesmentSessionsResponse } from "../../Types/AssesmentSession";
// import { FetcherPost } from "../../Utils/Fetcher";
// import { showSuccess } from "../../Utils/Helpers/AntdHelper";

type ModalFalsePositiveProps = {
  visible: boolean | undefined;
  // eslint-disable-next-line no-unused-vars
  onCancel: (e: React.MouseEvent<HTMLElement>) => void;
  // eslint-disable-next-line no-unused-vars
  onFinish: (data: UpdateFindingResponse) => void;
  data: RowFindingResponse | undefined
};

function ModalFalsePositive({ visible, onCancel, data, onFinish }: ModalFalsePositiveProps) {
  const [form] = Form.useForm();
  const onCancelButton = (e: any) => {
    form.resetFields();
    onCancel(e);
  };

  const onSubmitButton = async (e: any) => {
    form.validateFields().then(async (values: any) => {
      if (data?.id) {
        try {
          const resultUpdate = await fetchUpdateFinding({
            id: data.id,
            isFalsePositive: true,
            idStatus: "a043dafa-a3fe-44d1-9836-8bf61e422e3b", // false positive
            assesmentWord: values?.assesmentWord,
          });
          if (resultUpdate.statusCode === 200) {
            showSuccess("Success", "Finding Has Been Flagged as False Positive");
            onCancelButton(e);
            onFinish(resultUpdate);
          }
        } catch (error) {
          // @ts-ignore
          showError("Error", error);
        }
      } else {
        showError("Error", "Finding Not Found");
      }
    });
  };

  return (
    <Modal
      title="Make This Data as False Positive?"
      centered
      visible={visible}
      onCancel={onCancel}
      width={1000}
      footer={null}
    >
      <DetailsFinding data={data} />
      <Form
        form={form}
        name="basic"
      >
        <Form.Item
          label="Comments"
          name="assesmentWord"
          rules={[{ required: true, message: 'Please input your Comments!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
      <Row gutter={[20, 20]} justify="end">
        <Col>
          <Button style={{ background: themeColor.danger, borderColor: themeColor.danger }} type="primary" onClick={onCancelButton}>No</Button>
        </Col>
        <Col>
          <Button style={{ background: themeColor.darkBlueSecondary, borderColor: themeColor.darkBlueSecondary }} type="primary" onClick={onSubmitButton}>Yes</Button>
        </Col>
      </Row>
    </Modal>
  );
}
export default ModalFalsePositive;
