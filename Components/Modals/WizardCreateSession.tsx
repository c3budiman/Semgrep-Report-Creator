import { Modal, Select, Spin } from "antd";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { fetchAssesment } from "../../Services/AssesmentService";
import { RowSelectAssesmentSessionsResponse, SelectAssesmentSessionsResponse } from "../../Types/AssesmentSession";
import returnStoreAndPersistor from "../../Redux/store";
import { SelectAssesment } from "../../Redux/assesmentSession/action";
import { RootState } from "../../Redux/reducer";

type WizardCreateSessionProps = {
  visible: boolean | undefined;
  // eslint-disable-next-line no-unused-vars
  onCancel: (e: React.MouseEvent<HTMLElement>) => void
};

function WizardCreateSession({ visible, onCancel }: WizardCreateSessionProps) {
  const [emptyAssesment, setEmptyAssesment] = useState<boolean>(false);
  const [selection, setSelection] = useState<RowSelectAssesmentSessionsResponse | undefined>();
  const { store } = returnStoreAndPersistor();
  const AssesmentSession = useSelector(
    (state: RootState) => state.assesmentSession.selectedSessions
  );
  // Start of Fetching
  const AssesmentFromDB = useQuery<SelectAssesmentSessionsResponse>(["assesment-sessions-inHeader-Wizard", visible], fetchAssesment, {
    enabled: visible,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
    onSuccess: (data: any) => {
      if (data?.data?.count === 0) {
        setEmptyAssesment(true);
      }
    }
  });
  // End of Fetching

  const onOk = (e: any) => {
    if (selection) {
      const data = {
        uuid: selection?.id,
        name: selection?.name,
        githubRepo: selection?.githubMain
      };
      store.dispatch(SelectAssesment(data));
      onCancel(e);
    }
  };

  return (
    <Modal
      title={AssesmentSession?.uuid === "" ? "No Assesment in Sessions" : "Changing Assesment Session"}
      centered
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
    >
      <Spin spinning={AssesmentFromDB.isLoading} tip="Loading...">
        {
          emptyAssesment && (
            <p>
              It seems like there are no assesment available for you to take.
              you can add new assesment in settings. along with findings data.
            </p>
          )
        }
        {
          !emptyAssesment && (
            <>
              {
                AssesmentSession?.uuid === "" && (
                  <p>
                    hi, we`ve notice you doesnt have an assesment sessions yet.
                    would you mind, tell us what project are you working on?
                  </p>
                )
              }
              {
                AssesmentSession?.uuid !== "" && (
                  <p>
                    Changing the assesment session?
                  </p>
                )
              }
              <Select
                placeholder="Select a project"
                style={{ width: "100%" }}
                onChange={(value: string | undefined) => {
                  const realValue = AssesmentFromDB.data?.rows?.find(
                    (item: RowSelectAssesmentSessionsResponse) => item.id === value
                  );
                  setSelection(realValue);
                }}
              >
                {
                  AssesmentFromDB.data?.rows?.map(
                    (
                      item: RowSelectAssesmentSessionsResponse
                    ) => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                  )
                }
              </Select>
            </>
          )
        }
      </Spin>
    </Modal>
  );
}
export default WizardCreateSession;
