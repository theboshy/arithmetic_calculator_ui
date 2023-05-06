import React, { useMemo, useState } from "react";
import { userRecordGetAllService } from "../../../lib/api/user.record.service";

import DataTable from 'react-data-table-component';
import { QueueHelper, QueueItem, getElementInQueue } from "../../../lib/api/datastructs/queue.helper";
import { ButtonComponent } from "../button/button.component";
import { InputDatatableComponent } from "../input/input.datatable.component";
import { TOAST_OPTIONS } from "../../../lib/toast.config/toast.config";
import { toast } from "react-toastify";

export const DataTableComponent: React.FunctionComponent<any> = ({ columns, initialData }) => {
    const [data, setData] = useState<any[] | undefined>(initialData);
    const [totalRows, setTotalRows] = useState(1);
    const [paginationPerPage] = useState(initialData.length + 1);
    const [lastEvaluatedKey, setLastEvaluatedKey] = useState<any>(null);
    const [indexPage, setIndexPage] = useState(1)
    const [queue, setQueue] = useState(new QueueHelper<QueueItem>())
    const [filterText, setFilterText] = useState('');
    const [selectedRows, setSelectedRows] = useState<any>(false);
    const [isLoading, setIsLoading] = useState<any>(false);

    /*const asyncRecordsToDeleteGenerator = () => {
        return {
            async*[Symbol.asyncIterator]() {
                for (const record of selectedRows.selectedRows) {
                    yield record
                }
            },
        };
    }*/

    /**
     * @deprecated need more explanation
     */
    const handleRecordsToBeDeleted = async () => {
        try {
            /*let arraysOfRecordsToDelete = selectedRows.selectedRows.map((record: any) => record.id)
            const result = await userRecordDeleteService(arraysOfRecordsToDelete);
            if (result) {
                window.location.reload();
            }*/
            toast.error('deprecated function', TOAST_OPTIONS);
        } catch (error) {
            console.log(error)
        }
    }


    const subHeaderComponentMemo = useMemo(() => {
        return (<>
            <InputDatatableComponent id="filter" name="filter" autoComplete='on'
                label='filter' placeholder='Filter by'
                onChange={(e: any) => setFilterText(e.target.value)}
            />
            {selectedRows && selectedRows.selectedRows.length > 0 ?
                <ButtonComponent id="remove_record" name={`Remove ${selectedRows.selectedRows.length} Records`} callbackFn={handleRecordsToBeDeleted} />
                : <></>}
        </>
        );
    }, [filterText, selectedRows]);

    const filteredItems = data!.filter(
        item => item.operationId && item.operationId.toLowerCase().includes(filterText.toLowerCase()),
    )

    const handleChange = (selectedRows: any) => {
        setSelectedRows(selectedRows);
    };

    const isGoingBack = (newPerPage: number) => {
        let result = false;
        if (newPerPage < indexPage) {
            result = true;
        }
        setIndexPage(newPerPage);
        return result;
    }


    const handlePerRowsChange = async (newPerPage: any, page: any) => {
        setIsLoading(false)
        if (isGoingBack(newPerPage)) {
            const previousData = getElementInQueue(queue.toArray(), lastEvaluatedKey, "previous")
            if (previousData) {
                setLastEvaluatedKey(previousData.id)
                setData(previousData.items)
            }
        } else {
            if (lastEvaluatedKey === "last") {

            } else {
                const nextData = getElementInQueue(queue.toArray(), lastEvaluatedKey, "next")
                if (nextData) {
                    setLastEvaluatedKey(nextData.id)
                    setData(nextData.items)
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
    }



    return <DataTable
        pagination
        paginationServer
        paginationPerPage={paginationPerPage}
        paginationComponentOptions={{
            noRowsPerPage: true,
        }}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        columns={columns}
        data={filteredItems!}
        paginationTotalRows={totalRows}
        onChangePage={handlePerRowsChange}
        responsive
        selectableRows
        onSelectedRowsChange={handleChange}
        dense
        progressPending={isLoading}
    />
}