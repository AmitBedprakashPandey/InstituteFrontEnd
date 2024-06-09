import Compressor from "compressorjs";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BiCamera, BiSave, BiUpload } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getStateAll } from "../Redux/Slice/StateSlice";
import {
  getSchoolbyId,
  createSchool,
  updateSchool,
} from "../Redux/Slice/SchoolSlicse";
import { confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
export default function School() {
  const [formData, setFormData] = useState();
  const { userid } = useSelector((state) => state.UserAuth);
  const { State } = useSelector((state) => state.State);
  const { School, message } = useSelector((state) => state.School);
  const toast = useRef();
  const dispatch = useDispatch();
  const formDataHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      userid: userid,
    });
  };
  useEffect(() => {
    if (School[0].status === true) {
      setFormData(School[0]);
    }
  }, [School]);
  useLayoutEffect(() => {
    dispatch(getStateAll());
    dispatch(getSchoolbyId(userid));
  }, [dispatch]);

  const handleImageUpload = (event) => {
    return new Promise((resolve, reject) => {
      const file = event; // Accessing the file from event

      try {
        new Compressor(file, {
          quality: 0.45,
          maxWidth: 500,
          resize: false,
          success: async (result) => {
            const base64String = await blobUrlToBase64(result);
            resolve(base64String);
            // You may set the base64 URL to state or perform other actions here
          },
          error(error) {
            console.error("Error compressing image:", error);
            reject(error);
          },
        });
      } catch (error) {
        console.error("Error compressing image:", error);
        reject(error);
      }
    });
  };

  async function blobUrlToBase64(blob) {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  const schoolImageHandler = async (e) => {
    try {
      const base64String = await handleImageUpload(e.target.files[0]);
      setFormData({ ...formData, schoolPhoto: base64String });
    } catch (error) {
      console.error("Error handling father image:", error);
    }
  };

  const show = (message) => {
    toast.current.show({ severity: "info", summary: message, life: 2000 });
  };

  useEffect(() => {
    if (message) {
      show(message);
    }
  }, [message]);

  const onSave = () => {
    dispatch(createSchool(formData));
  };

  const onUpdate = () => {
    dispatch(updateSchool(formData)).then(()=>{
      if(message){
        show(message)
      }
    });
  };

  const confirm1 = () => {
    confirmDialog({
      message: "Are you sure you want to save ?",
      header: "Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "accept",
      acceptClassName: "px-4 py-3 bg-cyan-500 text-white",
      rejectClassName: "px-4 py-3",
      accept: onSave,
    });
  };

  const confirm2 = () => {
    confirmDialog({
      message: "Are you sure you want to update ?",
      header: "Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "accept",
      acceptClassName: "px-4 py-3 bg-cyan-500 text-white",
      rejectClassName: "px-4 py-3",
      accept: onUpdate,
    });
  };

  return (
    <>
      <Toast ref={toast} position="bottom-right"/>
      <diV className="min-w-[28%] max-w-[40%] bg-white relative p-3">
        <div className="flex justify-center">
          <div className="relative">
            <img
              src={formData?.schoolPhoto}
              className="w-[100px] h-[100px] bg-cover bg-fit shadow-md shadow-slate-500 rounded-full border"
            />
            <input
              id="schoolphoto"
              type="file"
              accept="image/*"
              onChange={schoolImageHandler}
              className="hidden"
            />
            <label
              htmlFor="schoolphoto"
              className="absolute bottom-0 right-0 border w-8 h-8 shadow shadow-slate-500 bg-white border-black rounded-full flex justify-center items-center"
            >
              <BiCamera size={20} />
            </label>
          </div>
        </div>
        <div className="mt-7">
          <FloatLabel>
            <InputText
              name="schoolName"
              value={formData?.schoolName}
              onChange={formDataHandler}
              className="border border-slate-400 p-3 w-full"
            />
            <label>Enter Organization Name</label>
          </FloatLabel>
        </div>
        <div className="mt-7">
          <FloatLabel>
            <InputText
              name="address"
              value={formData?.address}
              onChange={formDataHandler}
              className="border border-slate-400 p-3 w-full"
            />
            <label>Enter Address</label>
          </FloatLabel>
        </div>
        <div className="mt-7 grid grid-cols-2  gap-3 ">
          <FloatLabel>
            <InputText
              name="email"
              value={formData?.email}
              onChange={formDataHandler}
              className="border w-full border-slate-400 p-3"
            />
            <label>Enter email</label>
          </FloatLabel>
          <FloatLabel>
            <InputText
              name="webiste"
              value={formData?.webiste}
              onChange={formDataHandler}
              className="border w-full border-slate-400 p-3 "
            />
            <label>Enter website</label>
          </FloatLabel>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-7 w-full">
          <FloatLabel>
            <InputNumber
              name="phone"
              value={formData?.phone}
              useGrouping={false}
              maxLength={10}
              inputClassName="pl-3 h-12"
              onChange={(e) => formDataHandler(e.originalEvent)}
              className="border w-full border-slate-400 rounded-md"
            />
            <label>Phone Number</label>
          </FloatLabel>
          <FloatLabel>
            <InputNumber
              name="phone2"
              value={formData?.phone2}
              useGrouping={false}
              maxLength={10}
              inputClassName="pl-3 h-12"
              onChange={(e) => formDataHandler(e.originalEvent)}
              className="border w-full border-slate-400 rounded-md"
            />
            <label>Phone Number 2</label>
          </FloatLabel>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-7">
          <FloatLabel>
            <InputNumber
              name="office"
              value={formData?.office}
              onChange={(e) => formDataHandler(e.originalEvent)}
              useGrouping={false}
              maxLength={10}
              inputClassName="pl-3 h-12"
              className="border w-full border-slate-400 rounded-md"
            />
            <label>Office Number</label>
          </FloatLabel>
          <FloatLabel>
            <InputNumber
              name="office2"
              value={formData?.office2}
              useGrouping={false}
              maxLength={10}
              inputClassName="pl-3 h-12"
              onChange={(e) => formDataHandler(e.originalEvent)}
              className="border w-full border-slate-400 rounded-md"
            />
            <label>Office Number 2</label>
          </FloatLabel>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-7">
          <FloatLabel>
            <InputText
              name="city"
              value={formData?.city}
              onChange={formDataHandler}
              className="border w-full border-slate-400 p-3"
            />
            <label>City</label>
          </FloatLabel>
          <FloatLabel>
            <InputNumber
              name="pincode"
              value={formData?.pincode}
              useGrouping={false}
              maxLength={10}
              inputClassName="pl-3 h-12"
              onChange={(e) => formDataHandler(e.originalEvent)}
              className="border w-full border-slate-400 rounded-md"
            />
            <label>Pincode</label>
          </FloatLabel>
        </div>
        <div className="mt-7 w-full">
          <FloatLabel>
            <Dropdown
              name="state"
              value={formData?.state}
              onChange={formDataHandler}
              options={State}
              optionLabel="state"
              optionValue="state"
              className="border border-slate-400 w-full h-12"
            />
            <label>State</label>
          </FloatLabel>
        </div>
        <div className="pt-5 flex justify-end">
          {School[0]?.status === true ? (
            <Button
              label="update"
              onClick={confirm2}
              icon={<BiUpload size={20} />}
              className="flex gap-2 bg-blue-500 hover:bg-blue-600 duration-300 text-white px-10 py-3"
            />
          ) : (
            <Button
              label="Save"
              onClick={confirm1}
              icon={<BiSave size={20} />}
              className="flex gap-2 bg-green-500 hover:bg-green-600 duration-300 text-white px-12 py-3"
            />
          )}
        </div>
      </diV>
    </>
  );
}
