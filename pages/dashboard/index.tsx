import { createRef, forwardRef, useEffect } from "react";
import Head from "next/head";
import dynamic from 'next/dynamic';
import { useSelector } from "react-redux";
import { Col, Row } from "antd";
import { Button } from "antd/lib/radio";
import { jsPDF as JSPDF } from "jspdf";
import { handleSessions } from "../../Utils/Helpers/GetSession";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { changeSidebarKey } from "../../Redux/layout/action";
import returnStoreAndPersistor from "../../Redux/store";
import { RootState } from "../../Redux/reducer";
import { themeColor } from "../../Configs/themeColor";
import { BarChartsProps, RefBarApex } from "../../Components/Charts/BarCharts";

const BarChartsC = dynamic(import('../../Components/Charts/BarCharts'), { ssr: false });
function BarChartsCFwd(props: BarChartsProps, ref: any) {
  return <BarChartsC props={props} forwardedRef={ref} />;
}
const BarCharts = forwardRef(BarChartsCFwd);

function Dashboard(session: any) {
  const { store } = returnStoreAndPersistor();
  const RefSeverityBar = createRef<RefBarApex>();
  const BarOptions = {
    colors: [themeColor.darkBlue],
    title: {
      text: "Severity of Findings"
    },
    plotOptions: {
      bar: {
        barHeight: '100%',
        horizontal: false,
        borderRadius: 5,
        dataLabels: {
          position: 'bottom'
        },
      }
    },
    dataLabels: {
      enabled: false,
    },
    chart: {
      id: "severity-bar"
    },
    xaxis: {
      categories: ['LOW', 'MEDIUM', 'HIGH']
    }
  };

  useEffect(() => {
    store.dispatch(changeSidebarKey(["dashboard"]));
  }, [store]);

  const CountBySeverity = useSelector((state: RootState) => state.findings.findingsBySeverity);

  const TestGeneratePDF = async () => {
    if (typeof RefSeverityBar.current?.generateDataURI === "function") {
      const data = await RefSeverityBar.current?.generateDataURI();
      if (data?.imgURI) {
        const pdf = new JSPDF();
        pdf.addImage(data?.imgURI, "PNG", 0, 0, 200, 30, "Approved", "SLOW", 0);
        pdf.save("pdf-chart.pdf");
      }
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard Page</title>
      </Head>
      <DashboardLayout session={session}>
        <Row justify="end">
          <Col>
            <Button type="primary" onClick={() => { TestGeneratePDF(); }}>Download PDF Report</Button>
          </Col>
        </Row>

        <BarCharts
          ref={RefSeverityBar}
          options={BarOptions}
          series={[
            {
              name: "Findings",
              data: [
                CountBySeverity.find((a: any) => a?.severity === "LOW")?.count ?? 0,
                CountBySeverity.find((a: any) => a?.severity === "MEDIUM")?.count ?? 0,
                CountBySeverity.find((a: any) => a?.severity === "HIGH")?.count ?? 0,
              ]
            },
          ]}
          height={250}
        />
      </DashboardLayout>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const checkSessions = await handleSessions(context);
  return checkSessions;
}

export default Dashboard;
