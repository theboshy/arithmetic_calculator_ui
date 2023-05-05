import { useEffect, useState } from "react";
import { userRecordGetAllService } from "../../../lib/api/user.record.service";

import DataTable from 'react-data-table-component';
import { QueueHelper, QueueItem, getElementInQueue } from "../../../lib/api/datastructs/queue.helper";

export const DataTableComponent: React.FunctionComponent<any> = ({ columns }) => {
    const [data, setData] = useState<any[] | undefined>([]);
    const [totalRows, setTotalRows] = useState(1);
    const [paginationPerPage] = useState(3);
    const [lastEvaluatedKey, setLastEvaluatedKey] = useState<any>(null);
    const [indexPage, setIndexPage] = useState(1)
    const [queue, setQueue] = useState(new QueueHelper<QueueItem>())

    const isGoingBack = (newPerPage: number) => {
        let result = false;
        if (newPerPage < indexPage) {
            result = true;
        }
        setIndexPage(newPerPage);
        return result;
    }



    const handlePerRowsChange = async (newPerPage: any, page: any) => {
        if (isGoingBack(newPerPage)) {
            const previousData = getElementInQueue(queue.toArray(), lastEvaluatedKey, "previous")
            if (previousData) {
                setLastEvaluatedKey(previousData.id)
                setData(previousData.items)
            }
        } else {
            if (lastEvaluatedKey === "last") {

            } else {
                const records = await userRecordGetAllService(`${paginationPerPage}`, lastEvaluatedKey);
                if (records) {
                    setData(records.response.items)
                    setTotalRows(totalRows + records.response.items.length)
                    let lastEvaluatedKey = records?.response.lastEvaluatedKey ? records?.response.lastEvaluatedKey.id : "last";
                    setLastEvaluatedKey(lastEvaluatedKey)
                    queue.enqueue({ id: records?.response.lastEvaluatedKey ? records?.response.lastEvaluatedKey.id : "last", items: records.response.items })
                    setQueue(queue)
                }
            }
        }
    }

    useEffect(() => {
        handlePerRowsChange(1, 3);
    }, [])

    return <DataTable
        pagination
        paginationServer
        paginationPerPage={paginationPerPage}
        paginationComponentOptions={{
            noRowsPerPage: true,
        }}
        columns={columns}
        data={data!}
        paginationTotalRows={totalRows}
        onChangePage={handlePerRowsChange}
    />
}