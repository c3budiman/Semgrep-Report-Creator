import { useEffect, useState } from "react";
import Head from "next/head";
import { Button, Col, Form, Input, Radio, Row, Table, Tabs } from "antd";
import { FolderAddOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { handleSessions } from "../../Utils/Helpers/GetSession";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { changeSidebarKey, InsertBreadcrumb } from "../../Redux/layout/action";
import returnStoreAndPersistor from "../../Redux/store";
import { themeColor } from "../../Configs/themeColor";
import ModalAddProject from "../../Components/Modals/ModalAddProject";
import { fetchAssesment } from "../../Services/AssesmentService";
import { SelectAssesmentSessionsResponse } from "../../Types/AssesmentSession";
import SemgrepConverter from "../../Utils/Helpers/Converter/SemgrepConverter";
import { FetcherPost } from "../../Utils/Fetcher";
import { CreateFindingResponse } from "../../Types/FindingsResponse";
import { RootState } from "../../Redux/reducer";
import { showSuccess } from "../../Utils/Helpers/AntdHelper";

function Setting(session: any) {
  const { store } = returnStoreAndPersistor();
  const [openAddProject, setOpenAddProject] = useState<boolean>(false);
  const [platformType, setPlatformType] = useState<"semgrep" | "snyk" | "codeql" | undefined>("semgrep");
  const [paginationTable1, setPaginationTable1] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [formFinding] = Form.useForm();
  const AssesmentSession = useSelector(
    (state: RootState) => state.assesmentSession.selectedSessions
  );

  // Start of Fetching
  const AssesmentFromDB = useQuery<SelectAssesmentSessionsResponse>("assesment-sessions-inSettings", fetchAssesment, {
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000,
  });
  // End of Fetching

  useEffect(() => {
    store.dispatch(changeSidebarKey(["settings"]));
    store.dispatch(InsertBreadcrumb([{ name: "Settings", url: "/settings" }]));
  }, [store]);

  const handleChangeTable1 = async (paginationA: any) => {
    const pager = { ...paginationTable1 };
    pager.current = paginationA.current;
    setPaginationTable1(pager);
  };

  const doSubmitFinding = () => {
    formFinding.validateFields().then(async (values: any) => {
      try {
        const jsonParsed = JSON.parse(values?.json_findings);
        if (platformType === "semgrep") {
          const conversionData = SemgrepConverter(
            { data: jsonParsed, sessionsId: AssesmentSession?.uuid }
          );
          const url = `${process.env.NEXT_PUBLIC_API_URL}/findings`;
          const response = await FetcherPost<CreateFindingResponse>(undefined, url, conversionData);
          if (response.data.statusCode === 201) showSuccess("Success!", "Assesment session created successfully");
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    });
  };

  return (
    <>
      <Head>
        <title>Setting Page</title>
      </Head>
      <ModalAddProject
        visible={openAddProject}
        onCancel={() => setOpenAddProject(false)}
      />
      <DashboardLayout session={session}>
        <Tabs type="line" size="large" defaultActiveKey="1">
          <Tabs.TabPane tab="Available Projects" key="1">
            <Row justify="end">
              <Col>
                <Button style={{ background: themeColor.darkBlueSecondary }} icon={<FolderAddOutlined />} type="primary" onClick={() => { setOpenAddProject(true); }}>Add Project</Button>
              </Col>
            </Row>
            <Table
              className="components-table-demo-nested"
              loading={AssesmentFromDB.isLoading}
              dataSource={AssesmentFromDB.data?.rows}
              scroll={{ x: '100%' }}
              onChange={handleChangeTable1}
            >
              <Table.Column
                title="No"
                key="index"
                width="20px"
                render={
                  (_value, _item, index) => (paginationTable1.current - 1)
                    * paginationTable1.pageSize
                    + index
                    + 1
                }
              />
              <Table.Column
                title="Project Name"
                key="index"
                dataIndex="name"
              />
              <Table.Column
                title="Github Repo URL"
                key="index"
                dataIndex="githubMain"
              />
            </Table>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Findings" key="2">
            <Form form={formFinding}>
              <h1>Platform Type?</h1>
              <Radio.Group
                options={[
                  { label: 'Semgrep', value: 'semgrep' },
                  { label: 'Snyk', value: 'snyk' },
                  { label: 'Codeql', value: 'codeql' },
                ]}
                onChange={(e) => {
                  setPlatformType(e.target.value);
                }}
                value={platformType}
                optionType="button"
                buttonStyle="solid"
              />
              <div style={{ height: "10px" }} />
              <h1>JSON Findings</h1>
              <Form.Item name="json_findings">
                <Input.TextArea rows={6} />
              </Form.Item>
              <Button onClick={doSubmitFinding}>Submit</Button>
            </Form>
          </Tabs.TabPane>
        </Tabs>
      </DashboardLayout>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const checkSessions = await handleSessions(context);
  return checkSessions;
}

export default Setting;
