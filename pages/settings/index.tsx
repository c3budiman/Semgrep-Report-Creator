import { useEffect, useState } from "react";
import Head from "next/head";
import { Button, Form, Input, Radio } from "antd";
import { useSelector } from "react-redux";
import { handleSessions } from "../../Utils/Helpers/GetSession";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { changeSidebarKey, InsertBreadcrumb } from "../../Redux/layout/action";
import returnStoreAndPersistor from "../../Redux/store";
import { CalculateFindings, InsertFindings, InsertGithub } from "../../Redux/findings/action";
import { showError, showSuccess } from "../../Utils/Helpers/AntdHelper";
import { RootState } from "../../Redux/reducer";

function Setting(session: any) {
  const { store } = returnStoreAndPersistor();
  const [formSetting] = Form.useForm();
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    store.dispatch(changeSidebarKey(["settings"]));
    store.dispatch(InsertBreadcrumb([{ name: "Settings", url: "/settings" }]));
  }, [store]);

  const doSaveJSON = () => {
    formSetting.validateFields().then((values: any) => {
      try {
        if (values?.json_findings) {
          const jsonFormatted = JSON.parse(values.json_findings);
          store.dispatch(InsertFindings(jsonFormatted));
          store.dispatch(CalculateFindings());
        }
        if (values?.github_uri) {
          const githubUri = values.github_uri;
          store.dispatch(InsertGithub(githubUri));
        }

        showSuccess("Success!", "Everything has been saved");
        formSetting.resetFields();
      } catch (error) {
        showError("Error", "Invalid Input");
      }
    });
  };

  const Findings = useSelector((state: RootState) => state.findings);
  const FindingsLength = Findings.findings.length;
  const hasFinding = FindingsLength > 0;

  return (
    <>
      <Head>
        <title>Setting Page</title>
      </Head>
      <DashboardLayout session={session}>
        <Form
          form={formSetting}
        >
          {
            hasFinding && (
              <>
                <h1>
                  You already submitted
                  {' '}
                  {FindingsLength}
                  {' '}
                  Findings
                </h1>
                <h1>Resubmit?</h1>
                <Radio.Group
                  options={[
                    { label: 'Yes', value: true },
                    { label: 'No', value: false },
                  ]}
                  onChange={(e) => {
                    setEditing(e.target.value);
                  }}
                  value={editing}
                  optionType="button"
                  buttonStyle="solid"
                />
                <div style={{ height: "10px" }} />
              </>
            )
          }

          {
            (!hasFinding || editing) && (
              <>
                <h1>JSON Findings</h1>
                <Form.Item name="json_findings">
                  <Input.TextArea />
                </Form.Item>
              </>
            )
          }
          <>
            <h1>Github URL</h1>
            <Form.Item name="github_uri">
              <Input defaultValue={Findings.githubRepo} type="url" />
            </Form.Item>
          </>
          <div style={{ height: "20px" }} />
          <Button onClick={doSaveJSON}>Submit</Button>
        </Form>
      </DashboardLayout>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const checkSessions = await handleSessions(context);
  return checkSessions;
}

export default Setting;
