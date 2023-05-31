
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { Calendar } from 'primereact/calendar';


const OfferDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const chipTemplate0 = (rowData, { rowIndex }) => <Chip label={rowData.promotion}  />
    const calendarTemplate1 = (rowData, { rowIndex }) => <Calendar className="w-20rem" dateFormat="dd/mm/yy" placeholder={"dd/mm/yy"} value={new Date(rowData.valueFromDate)} showTime ></Calendar>
    const calendarTemplate2 = (rowData, { rowIndex }) => <Calendar className="w-20rem" dateFormat="dd/mm/yy" placeholder={"dd/mm/yy"} value={new Date(rowData.valueToDate)} showTime ></Calendar>
    const chipTemplate3 = (rowData, { rowIndex }) => <Chip label={rowData.discount}  />

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10}>
            <Column field="promotion" header="Promotion" body={chipTemplate0} sortable style={{ minWidth: "8rem" }} />
            <Column field="valueFromDate" header="From" body={calendarTemplate1} sortable style={{ minWidth: "8rem" }} />
            <Column field="valueToDate" header="To" body={calendarTemplate2} sortable style={{ minWidth: "8rem" }} />
            <Column field="discount" header="Discount" body={chipTemplate3} sortable style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
        </DataTable>
    );
};

export default OfferDataTable;