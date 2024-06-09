import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { FaEye, FaEyeSlash, FaPenToSquare } from "react-icons/fa6";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  getCourseTypebyId,
  createCourseType,
  updateCourseType,
  CourseTypeStatus
} from "../../../Redux/Slice/CourseTypeSlice";
import { useDispatch, useSelector } from "react-redux";
export default function Coursetype(params) {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const [openModel, setOpenModel] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const { userid } = useSelector((state) => state.UserAuth);
  const { CourseType, message, error, loading } = useSelector(
    (state) => state.CourseType
  );
  const [formData, setFormData] = useState();
  const formDataHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      status: true,
      userid: userid,
    });
  };
  useLayoutEffect(() => {
    dispatch(getCourseTypebyId(userid));
  }, [dispatch]);

  const actiontemplate = (rowData) => {
    return (
      <div className="flex items-center gap-5">
        {rowData?.status === true ? (
          <FaEye onClick={()=>dispatch(CourseTypeStatus({_id:rowData?._id , status:rowData?.status === true ? false :true}))} size={20} color="#0abf53" />
        ) : (
          <FaEyeSlash onClick={()=>dispatch(CourseTypeStatus({_id:rowData?._id,status:rowData?.status === true ? false :true}))} size={20} color="#ff0000" />
        )}
        <Button
          onClick={() => {
            setSelectedData(rowData);
            setOpenModel(true);
          }}
          icon={<FaPenToSquare size={20} color="#0099e5" />}
        />
      </div>
    );
  };

  useEffect(() => {
    if (message) {
      show(message);
    }
    if (error) {
      show(error);
    }
  }, [message, error]);

  const show = (message) => {
    toast.current.show({ severity: "info", summary: message, life: 2000 });
  };
  const onSave = () => {
    dispatch(createCourseType(formData));
  };
  const confirm1 = () => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      acceptClassName: "bg-blue-600 text-white px-5 py-3",
      accept: onSave,
    });
  };

  const statusHandler=()=>{
    dispatch(CourseTypeStatus({}))
  }

  return (
    <>
      <Toast ref={toast} position="bottom-right" />
      <Dialog
        visible={openModel}
        onHide={() => setOpenModel(false)}
        position="top"
        header="Course Type Form"
      >
        <CoursetypeForm data={selectedData} />
      </Dialog>
      <h1 className="font-bold text-3xl">Course Type</h1>
      <div className="grid">
        <div className="flex items-center gap-3">
          <div className="mt-7">
            <FloatLabel>
              <InputText
                name="coursetype"
                value={formData?.coursetype}
                onChange={formDataHandler}
                className="border border-gray-400 p-3 rounded-md"
              />
              <label>Enter Course Type</label>
            </FloatLabel>
          </div>
          <div className="mt-7">
            <Button
              label="Save"              
              disabled={formData?.coursetype ? false : true}
              onClick={confirm1}
              className="bg-green-500 py-3 px-10 text-white font-bold"
            />
          </div>
        </div>
        <div className="mt-7">
          <DataTable className="border" value={CourseType}>
            <Column
              header="Particular"
              field="coursetype"
              headerClassName="border w-42"
            />
            <Column
              header="Action"
              headerClassName="border flex justify-center"
              bodyClassName="flex justify-center"
              body={actiontemplate}
            />
          </DataTable>
        </div>
      </div>
    </>
  );
}

function CoursetypeForm({ mode, data }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(); 
  const {loading } = useSelector(
    (state) => state.CourseType
  );
  const formDataHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    setFormData(data);
  }, [data]);

  const onSave = () => {
    dispatch(updateCourseType(formData));
  };
  const confirm1 = () => {
    confirmDialog({
      message: "Are you sure you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      acceptClassName: "bg-blue-600 text-white px-5 py-3",
      accept: onSave,
    });
  };
  return (
    <div className="">
      <div className="mt-7">
        <FloatLabel>
          <InputText
            name="coursetype"
            value={formData?.coursetype}
            onChange={formDataHandler}
            className="border border-gray-400 p-3 rounded-md"
          />
          <label>Enter Course Type</label>
        </FloatLabel>
      </div>
      <div className="mt-7 flex justify-end">
        <Button
          label="Update"
          loading={loading}
          onClick={confirm1}
          className="bg-blue-500 hover:bg-blue-600 duration-300  py-3 px-10 text-white font-bold"
        />
      </div>
    </div>
  );
}
