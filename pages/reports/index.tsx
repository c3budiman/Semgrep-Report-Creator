import { useEffect, useState } from "react";
import Head from "next/head";
import { useSelector } from "react-redux";
import { Button, Col, Row, Table } from "antd";
import { handleSessions } from "../../Utils/Helpers/GetSession";
import DashboardLayout from "../../Layouts/DashboardLayout";
import returnStoreAndPersistor from "../../Redux/store";
import { changeSidebarKey, InsertBreadcrumb } from "../../Redux/layout/action";
import { RootState } from "../../Redux/reducer";
import { FindingsType } from "../../Types/Findings";
import { SeverityData } from "../../Configs/HardCodedSemgrepData";

function Reports(session: any) {
  const { store } = returnStoreAndPersistor();

  const Findings = useSelector((state: RootState) => state.findings);
  const [paginationTable1, setPaginationTable1] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // move this to function area:
  const handleChangeTable1 = async (paginationA: any) => {
    const pager = { ...paginationTable1 };
    pager.current = paginationA.current;
    setPaginationTable1(pager);
  };

  useEffect(() => {
    store.dispatch(changeSidebarKey(["reports"]));
    store.dispatch(InsertBreadcrumb([{ name: "Reports", url: "/reports" }]));

    return () => {
      store.dispatch(InsertBreadcrumb([]));
    };
  }, [store]);

  const generatePDF = async () => {
  };

  return (
    <>
      <Head>
        <title>Report Page</title>
      </Head>
      <DashboardLayout session={session}>
        <Row justify="end">
          <Col>
            <Button type="primary" onClick={generatePDF}>Download PDF Report</Button>
          </Col>
        </Row>
        <div style={{ height: "20px" }} />
        <Table
          className="components-table-demo-nested"
          dataSource={Findings.findings}
          scroll={{ x: '100%' }}
          onChange={handleChangeTable1}
          pagination={paginationTable1}
        >
          <Table.Column
            title="No"
            key="index"
            width="5%"
            render={
              (_value, _item, index) => (paginationTable1.current - 1)
                * paginationTable1.pageSize
                + index
                + 1
            }
          />

          <Table.Column
            title="Github Path"
            key="path"
            dataIndex="path"
            render={
              (_value, item: FindingsType) => (<a href={`${Findings.githubRepo}/blob/${item.ref}/${item.finding?.path}#L${item.finding?.line}`}>{item.finding?.path}</a>)
            }
          />

          <Table.Column
            title="Message"
            key="message"
            dataIndex="message"
            render={
              (_value, item: FindingsType) => item.finding?.message
            }
          />

          <Table.Column
            title="CWE"
            key="CWE"
            dataIndex="CWE"
            render={
              (_value, item: FindingsType) => item.finding?.metadata?.cwe
            }
          />

          <Table.Column
            title="OWASP"
            key="OWASP"
            dataIndex="OWASP"
            render={
              (_value, item: FindingsType) => item.finding?.metadata?.owasp
            }
          />

          <Table.Column
            title="References"
            key="references"
            dataIndex="references"
            render={
              (_value, item: FindingsType) => (<a href={`${item.finding?.metadata?.shortlink}`}>{item.finding?.metadata?.shortlink}</a>)
            }
          />

          <Table.Column
            title="Severity"
            key="severity"
            dataIndex="severity"
            filters={SeverityData}
            onFilter={
              (value, record:FindingsType) => {
                const severity = record.finding?.severity;
                return typeof (severity) !== "undefined" ? value === severity : false;
              }
            }
            render={
              (_value, item: FindingsType) => SeverityData.find(
                (item2) => item2.value === item.finding?.severity
              )?.text
            }
          />
        </Table>
      </DashboardLayout>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const checkSessions = await handleSessions(context);
  return checkSessions;
}

export default Reports;
