import { Button, Col, Form, Input, Modal, Row } from "antd";
import React from "react";
import { themeColor } from "../../Configs/themeColor";
import { InsertAssesmentSessionsResponse } from "../../Types/AssesmentSession";
import { FetcherPost } from "../../Utils/Fetcher";
import { showSuccess } from "../../Utils/Helpers/AntdHelper";

type ModalAddProjectProps = {
  visible: boolean | undefined;
  // eslint-disable-next-line no-unused-vars
  onCancel: (e: React.MouseEvent<HTMLElement>) => void
};

function ModalAddProject({ visible, onCancel }: ModalAddProjectProps) {
  const [form] = Form.useForm();
  const onCancelButton = (e: any) => {
    form.resetFields();
    onCancel(e);
  };

  const onSubmitButton = async (e: any) => {
    form.validateFields().then(async (values: any) => {
      const { name, githubMain } = values;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/assesmentSessions`;
      const data = { name, githubMain };

      try {
        const response = await FetcherPost<InsertAssesmentSessionsResponse>(undefined, url, data);
        if (response?.data?.statusCode === 201) {
          showSuccess("Success!", "Assesment session created successfully");
          onCancelButton(e);
        }
      } catch (error) {
        // console.log(error);
      }
    });
  };

  return (
    <Modal
      title="Add Project"
      centered
      visible={visible}
      onCancel={onCancel}
      width={1000}
      footer={null}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        autoComplete="off"
      >
        <Form.Item
          label="Project Name"
          name="name"
          rules={[{ required: true, message: 'Please input your Project Name!' }]}
        >
          <Input type="text" />
        </Form.Item>

        <Form.Item
          label="Github Repository URL"
          name="githubMain"
          rules={[{ required: true, message: 'Please input your github repo!' }]}
        >
          <Input type="url" />
        </Form.Item>
      </Form>
      <Row gutter={[20, 20]} justify="end">
        <Col>
          <Button style={{ background: themeColor.danger, borderColor: themeColor.danger }} type="primary" onClick={onCancelButton}>Cancel</Button>
        </Col>
        <Col>
          <Button style={{ background: themeColor.darkBlueSecondary, borderColor: themeColor.darkBlueSecondary }} type="primary" onClick={onSubmitButton}>Submit</Button>
        </Col>
      </Row>
    </Modal>
  );
}
export default ModalAddProject;
