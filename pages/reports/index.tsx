import { useEffect, useState } from "react";
import Head from "next/head";
import { Button, Col, Row, Table } from "antd";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { BugOutlined, LikeOutlined } from "@ant-design/icons";
import { ColumnFilterItem } from "antd/lib/table/interface";
import { handleSessions } from "../../Utils/Helpers/GetSession";
import DashboardLayout from "../../Layouts/DashboardLayout";
import returnStoreAndPersistor from "../../Redux/store";
import { changeSidebarKey, InsertBreadcrumb } from "../../Redux/layout/action";
import { SeverityData } from "../../Configs/HardCodedSemgrepData";
import { RootState } from "../../Redux/reducer";
import { fetchFinding } from "../../Services/FindingService";
import { RowFindingResponse } from "../../Types/FindingsResponse";
import { themeColor } from "../../Configs/themeColor";
import { fetchStatusFinding } from "../../Services/StatusFindingService";
import { RowStatusFinding, StatusFinding } from "../../Types/StatusFinding";
import ModalFalsePositive from "../../Components/Modals/ModalFalsePositive";

function Reports(session: any) {
  const { store } = returnStoreAndPersistor();
  const [paginationTable1, setPaginationTable1] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [statusFinding, setStatusFinding] = useState<ColumnFilterItem[]>([]);
  const [openModalFalsePositive, setOpenModalFalsePositive] = useState(false);
  const [detailFinding, setDetailFinding] = useState<RowFindingResponse>();
  const offset = (paginationTable1.current - 1) * paginationTable1.pageSize;
  const AssesmentSession = useSelector(
    (state: RootState) => state.assesmentSession.selectedSessions
  );

  const FindingFromDB = useQuery(["findings-inReports", offset, AssesmentSession?.uuid], () => fetchFinding(paginationTable1.pageSize, offset, AssesmentSession?.uuid), {
    refetchOnWindowFocus: true,
    staleTime: 60 * 1000,
    keepPreviousData: true,
    onSuccess: (data: any) => {
      setPaginationTable1({
        ...paginationTable1,
        total: data?.data?.count ?? 0,
      });
    }
  });

  // move this to function area:
  const handleChangeTable1 = async (paginationA: any) => {
    const pager = { ...paginationTable1 };
    pager.current = paginationA.current;
    setPaginationTable1(pager);
  };

  const fetchAndSetStatus = async () => {
    const statusList = await fetchStatusFinding<StatusFinding>();
    const fixStatusList = statusList.data.rows?.map(
      (item: RowStatusFinding) => ({
        text: item.name ?? "",
        value: item.id ?? ""
      })
    ) ?? [];
    setStatusFinding(fixStatusList);
  };

  useEffect(() => {
    store.dispatch(changeSidebarKey(["reports"]));
    store.dispatch(InsertBreadcrumb([{ name: "Reports", url: "/reports" }]));
    fetchAndSetStatus();

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
          // className="components-table-demo-nested"
          dataSource={FindingFromDB?.data?.data?.rows}
          loading={FindingFromDB.isLoading}
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
              (_value, item: RowFindingResponse) => (<a target="_blank" rel="noreferrer" href={`${item.session?.githubMain}/tree/main/${item.githubPath}`}>{`${item.session?.githubMain}/tree/main/${item.githubPath}`}</a>)
            }
          />

          <Table.Column
            title="Message"
            key="message"
            dataIndex="message"
            render={
              (_value, item: RowFindingResponse) => item.message
            }
          />

          <Table.Column
            title="CWE"
            key="CWE"
            dataIndex="CWE"
            render={
              (_value, item: RowFindingResponse) => item.cwe
            }
          />

          <Table.Column
            title="OWASP"
            key="OWASP"
            dataIndex="OWASP"
            render={
              (_value, item: RowFindingResponse) => item.owasp
            }
          />

          <Table.Column
            title="References"
            key="references"
            dataIndex="references"
            render={
              (_value, item: RowFindingResponse) => (<a target="_blank" rel="noreferrer" href={`${item.references}`}>{item.references}</a>)
            }
          />

          <Table.Column
            title="Severity"
            key="severity"
            dataIndex="severity"
            filters={SeverityData}
            render={
              (_value, item: RowFindingResponse) => item.severity
            }
          />

          <Table.Column
            title="Status"
            key="Status"
            dataIndex="status"
            filters={statusFinding}
            render={
              (_value, item: RowFindingResponse) => item.status.name
            }
          />

          <Table.Column
            title="Actions"
            key="Actions"
            render={
              // eslint-disable-next-line no-unused-vars
              (_value, item: RowFindingResponse) => (
                <>
                  <Button
                    onClick={() => { setOpenModalFalsePositive(true); setDetailFinding(item); }}
                    size="small"
                    icon={<LikeOutlined />}
                  >
                    Flag as False Positive
                  </Button>
                  <br />
                  <div style={{ height: "5px" }} />
                  <Button
                    style={{
                      background: themeColor.darkBlueSecondary,
                      borderColor: themeColor.darkBlueSecondary
                    }}
                    type="primary"
                    size="small"
                    icon={<BugOutlined />}
                  >
                    Confirm Findings
                  </Button>
                </>
              )
            }
          />
        </Table>
      </DashboardLayout>

      <ModalFalsePositive
        visible={openModalFalsePositive}
        onCancel={() => { setOpenModalFalsePositive(false); }}
        onFinish={() => { FindingFromDB.refetch(); }}
        data={detailFinding}
      />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const checkSessions = await handleSessions(context);
  return checkSessions;
}

export default Reports;
