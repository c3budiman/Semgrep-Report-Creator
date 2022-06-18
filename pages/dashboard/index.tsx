import { useEffect } from "react";
import Head from "next/head";
import dynamic from 'next/dynamic';
import { useSelector } from "react-redux";
import { handleSessions } from "../../Utils/Helpers/GetSession";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { changeSidebarKey } from "../../Redux/layout/action";
import returnStoreAndPersistor from "../../Redux/store";
import { RootState } from "../../Redux/reducer";
import { themeColor } from "../../Configs/themeColor";

const BarCharts = dynamic(
  () => import('../../Components/Charts/BarCharts'),
  { ssr: false }
);

function Dashboard(session: any) {
  const { store } = returnStoreAndPersistor();
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

  return (
    <>
      <Head>
        <title>Dashboard Page</title>
      </Head>
      <DashboardLayout session={session}>
        <BarCharts
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
