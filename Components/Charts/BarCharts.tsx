import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

interface BarChartsProps { options: ApexOptions, series: ApexOptions['series'], height: string | number | undefined }

function BarApex({ options, series, height = 250 } : BarChartsProps) {
  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      height={height}
    />
  );
}
export default BarApex;
