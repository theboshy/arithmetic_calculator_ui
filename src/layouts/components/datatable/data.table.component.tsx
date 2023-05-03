import { useEffect, useState } from "react";
import { userRecordGetAllService } from "../../../lib/api/user.record.service";

import DataTable from 'react-data-table-component';
import { QueueHelper, QueueItem, getElementInQueue } from "../../../lib/api/datastructs/queue.helper";

export const DataTableComponent: React.FunctionComponent<any> = ({ columns }) => {
    const [data, setData] = useState<any[] | undefined>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [totalRows, setTotalRows] = useState(10);
    const [paginationPerPage, setPaginationPerPage] = useState(3);
    const [lastEvaluatedKey, setLastEvaluatedKey] = useState<any>(null);
    const [indexPage, setIndexPage] = useState(0)
    const [queue, setQueue] = useState(new QueueHelper<QueueItem>())

    const isGoingBack = (newPerPage: number, page: number) => {
        let goingBack = false;
        setIndexPage(page - 1)
        if (newPerPage === 1) {
            if (page > indexPage) {
                return goingBack;
            } else {
                return true;
            }
        } else {
            return goingBack;
        }
    }



    const handlePerRowsChange = async (newPerPage: any, page: any) => {
        if (isGoingBack(newPerPage, page)) {
            const previousData = getElementInQueue(queue.toArray(), lastEvaluatedKey, "previous")
            if (previousData) {
                setData(previousData.items)
            }
        } else {
            if (lastEvaluatedKey === "last") {
                
            } else {
                const records = await userRecordGetAllService(`${paginationPerPage}`, lastEvaluatedKey);
                if (records) {
                    setData(records.response.items)
                    setTotalRows(records.response.items.length + paginationPerPage)
                    let lastEvaluatedKey = records?.response.lastEvaluatedKey ? records?.response.lastEvaluatedKey.id : "last";
                    setLastEvaluatedKey(lastEvaluatedKey)
                    queue.enqueue({ id: records?.response.lastEvaluatedKey ? records?.response.lastEvaluatedKey.id : "last", items: records.response.items })
                    setQueue(queue)
                }
            }
        }
    }

    useEffect(() => {
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