import React, { useEffect, useMemo, useState } from "react";
import { userRecordGetAllService } from "../../../lib/api/user.record.service";

import DataTable from 'react-data-table-component';
import { QueueHelper, getElementInQueue } from "../../../lib/api/datastructs/queue.helper";
import { ButtonComponent } from "../button/button.component";
import { InputDatatableComponent } from "../input/input.datatable.component";
import { TOAST_OPTIONS } from "../../../lib/toast.config/toast.config";
import { toast } from "react-toastify";
import './data.table.component.scss'
import { ArrowComponent } from "../arrow.component.tsx/arrow.component";

export const useInitialDataToQue = (initialDataArray: any): any => {
    if (initialDataArray && initialDataArray.length > 0) {
        const lastItem = initialDataArray[initialDataArray.length - 1];
        return [{ id: lastItem.id, items: initialDataArray }]
    }
    return []
}

export const DataTableComponent: React.FunctionComponent<any> = ({ columns, initialData }) => {
    const [data, setData] = useState<any[]>(useInitialDataToQue(initialData));
    const [totalRows, setTotalRows] = useState(useInitialDataToQue(initialData).length + 1);
    const [paginationPerPage] = useState(3);
    const [lastEvaluatedKey, setLastEvaluatedKey] = useState<any>(null);
    const [queue, setQueue] = useState(new QueueHelper(useInitialDataToQue(initialData)))
    const [filterText, setFilterText] = useState('');
    const [selectedRows, setSelectedRows] = useState<any>(false);
    const [isLoading, setIsLoading] = useState(true);
    const [indexPage, setIndexPage] = useState(1)

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

    const filteredItems = data?.filter(
        item => item.operationId && item.operationId.toLowerCase().includes(filterText.toLowerCase()),
    )


    const handleRowSelectionChange = (selectedRows: any) => {
        setSelectedRows(selectedRows);
    };

    const handleNextInPagination = async () => {
        if (!isLoading) {
            if (lastEvaluatedKey === "last") {

            } else {
                const nextData = getElementInQueue(queue, lastEvaluatedKey, "next")
                if (nextData && nextData.items) {
                    setLastEvaluatedKey(nextData.id)
                    setData(nextData.items)
                } else {
                    const records = await userRecordGetAllService(`${paginationPerPage}`, lastEvaluatedKey);
                    if (records) {
                        updateShowingData(records.response.items, records?.response.lastEvaluatedKey)
                    } else {
                        setLastEvaluatedKey("last")
                    }
                }
            }
        }
    }

    const handlePreviousInPagination = async () => {
        if (!isLoading) {
            const previousData = getElementInQueue(queue, lastEvaluatedKey, "previous")
            if (previousData && previousData.items) {
                setLastEvaluatedKey(previousData.id)
                setData(previousData.items)
            }
        }
    }


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
            await handlePreviousInPagination();
            return
        }
        await handleNextInPagination()
        return
    }


    const updateShowingData = (records: any, lastEvaluatedKey: any) => {
        setData(records)
        setTotalRows(totalRows + records.length)
        let key = lastEvaluatedKey ? lastEvaluatedKey?.id : "last";
        setLastEvaluatedKey(key)
        addItemToQue({ id: key, items: records } as any)
    }

    const addItemToQue = (item: any) => {
        try {
            queue.enqueue(item.items, item.id)
            setQueue(queue)
        } catch (error) {
            //handle error trying to put repeated id in que
        }
    }


    useEffect(() => {
        async function loadRecordsInitialData() {
            const records = await userRecordGetAllService("3");
            if (records) {
                updateShowingData(records.response.items, records?.response.lastEvaluatedKey);
            }
            setIsLoading(false)
        }
        loadRecordsInitialData();
    }, []);

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
        data={filteredItems}
        paginationTotalRows={totalRows}
        onChangePage={handlePerRowsChange}
        responsive
        selectableRows
        onSelectedRowsChange={handleRowSelectionChange}
        dense
        highlightOnHover
        paginationIconNext={
            <ArrowComponent direction={"left"} active={lastEvaluatedKey !== "last"} />
        }
        paginationIconPrevious={
            <ArrowComponent direction={"right"} active={getElementInQueue(queue, lastEvaluatedKey, "previous") !== undefined} />
        }
        paginationIconLastPage={
            null
        }
    />
}