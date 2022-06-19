import ApexCharts, { ApexOptions } from "apexcharts";
import { useImperativeHandle } from "react";
import Chart from "react-apexcharts";
import { showError } from "../../Utils/Helpers/AntdHelper";
import { isClient } from "../../Utils/Helpers/HelperBrowser";

export interface BarChartsProps { options: ApexOptions, series: ApexOptions['series'], height: string | number | undefined }

interface BarchartsParamsType { props: BarChartsProps, forwardedRef: any }

type generateDataURIType = () => { imgURI: string };

export interface RefBarApex { generateDataURI: generateDataURIType | undefined }

function BarApexWithRef({ props, forwardedRef }: BarchartsParamsType) {
  const { options, series, height = 250 } = props;

  useImperativeHandle(forwardedRef, () => ({
    async generateDataURI() {
      if (isClient) {
        if (options.chart?.id) {
          return ApexCharts.exec(options.chart?.id, "dataURI").then((data: any) => data);
        }
        showError("Error!", "react apex bar chart doesnt have id!");
      }
      return 0;
    }
  }));

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      height={height}
    />
  );
}

export default BarApexWithRef;
