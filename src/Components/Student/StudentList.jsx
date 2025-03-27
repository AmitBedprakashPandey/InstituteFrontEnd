import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export default function StudentList(params) {
    return(
        <>
        <div className="dark:text-white font-medium">
        Student List

        </div>

        <DataTable 
        size="small"
        
        >
<Column header="#"/>
<Column header="Roll No."/>
<Column header="Admi. No."/>
<Column header="Name"/>
<Column header="Class"/>
<Column header="Section"/>
<Column header="Action"/>
        </DataTable>
        </>
    )
}