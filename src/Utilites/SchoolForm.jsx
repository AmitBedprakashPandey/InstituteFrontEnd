import Compressor from "compressorjs";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { useLayoutEffect, useRef, useState } from "react";
import { BiCamera, BiSave, BiUpload } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getStateAll } from "../Redux/Slice/StateSlice";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { getUser } from "../Redux/Slice/UserSlice";
import {
  getSchoolbyId,
  createSchool,
  updateSchool,
} from "../Redux/Slice/SchoolSlicse";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { states } from "../MockDataBase/Database";
export default function School() {
  const [formData, setFormData] = useState();
  const userid = localStorage.getItem("userid");
  const { School, message, loading } = useSelector((state) => state.School);
  const toast = useRef();
  const stepperRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formDataHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      userid: userid,
    });
  };

  useLayoutEffect(() => {
    if (School?.status === true) {
      setFormData(School);
    }
  }, [School]);

  useLayoutEffect(() => {
    dispatch(getStateAll());
    dispatch(getUser());
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

  const schoolStampHandler = async (e) => {
    try {
      const base64String = await handleImageUpload(e.target.files[0]);
      setFormData({ ...formData, schoolStamp: base64String });
    } catch (error) {
      console.error("Error handling father image:", error);
    }
  };

  const show = (message) => {
    toast.current.show({ severity: "info", summary: message, life: 1000 });
  };

  const onSave = () => {
    dispatch(createSchool(formData))
      .then(() => {
        show(message);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch(() => navigate("/wizard"));
  };

  const onUpdate = () => {
    dispatch(updateSchool(formData)).then(() => {
      show(message);
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
      <Toast ref={toast} position="top-center" />
      <ConfirmDialog />
      <div className="relative dark:bg-slate-800 w-full flex justify-center">
        <div className="grid grid-cols-1 px-3 ">
          <div className="w-full flex justify-center">
            <div className="relative w-[100px] h-[100px]  m-3">
              <img
                src={formData?.schoolPhoto}
                className="w-[100px] h-[100px] bg-cover bg-fit dark:border-slate-400 dark:bg-slate-800 rounded-full border border-slate-500"
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
                className="absolute dark:bg-slate-800 dark:text-white bottom-0 right-0 border dark:border-slate-400 dark:bg-slate-800 w-8 h-8  bg-white border-black rounded-full flex justify-center items-center"
              >
                <BiCamera size={20} />
              </label>
            </div>
          </div>
          <div className="w-full mt-7">
            <FloatLabel>
              <InputText
                name="schoolName"
                value={formData?.schoolName}
                onChange={formDataHandler}
                className="border border-slate-400 dark:bg-slate-800 p-3 w-full"
              />
              <label className="dark:text-slate-400">
                Enter Organization Name <span className="text-red-400">*</span>
              </label>
            </FloatLabel>
          </div>
          <div className="mt-7">
            <FloatLabel>
              <InputText
                name="address"
                value={formData?.address}
                onChange={formDataHandler}
                className="border border-slate-400 dark:bg-slate-800 p-3 w-full"
              />
              <label className="dark:text-slate-400">
                Enter Address <span className="text-red-400">*</span>
              </label>
            </FloatLabel>
          </div>
          <div className="mt-7">
            <FloatLabel>
              <InputText
                name="email"
                value={formData?.email}
                onChange={formDataHandler}
                className="w-full border  border-slate-400 dark:bg-slate-800 p-3"
              />
              <label className="dark:text-slate-400">
                Enter email <span className="text-red-400">*</span>
              </label>
            </FloatLabel>
          </div>
          <div className="mt-7">
            <FloatLabel>
              <InputText
                name="webiste"
                value={formData?.webiste}
                onChange={formDataHandler}
                className="w-full border  border-slate-400 dark:bg-slate-800 p-3 "
              />
              <label className="dark:text-slate-400">Enter website</label>
            </FloatLabel>
          </div>
          <div className="flex justify-between mt-7">
            <FloatLabel>
              <InputNumber
                name="phone"
                value={formData?.phone}
                useGrouping={false}
                maxLength={10}
                inputClassName="pl-3 h-12 w-full dark:bg-slate-800"
                onChange={(e) => formDataHandler(e.originalEvent)}
                className="w-full border  border-slate-400 dark:bg-slate-800 rounded-md"
              />
              <label className="dark:text-slate-400">
                Phone Number <span className="text-red-400">*</span>
              </label>
            </FloatLabel>
            <FloatLabel>
              <InputNumber
                name="phone2"
                value={formData?.phone2}
                useGrouping={false}
                maxLength={10}
                inputClassName="pl-3 h-12 w-full dark:bg-slate-800"
                onChange={(e) => formDataHandler(e.originalEvent)}
                className="border border-slate-400 dark:bg-slate-800 rounded-md"
              />
              <label className="dark:text-slate-400">Phone Number 2</label>
            </FloatLabel>
          </div>
          <div className="flex justify-between mt-7">
            <FloatLabel>
              <InputNumber
                name="office"
                value={formData?.office}
                onChange={(e) => formDataHandler(e.originalEvent)}
                useGrouping={false}
                maxLength={10}
                inputClassName="pl-3 h-12 w-full dark:bg-slate-800"
                className="border border-slate-400 dark:bg-slate-800 rounded-md"
              />
              <label className="dark:text-slate-400">
                Office Number <span className="text-red-400">*</span>
              </label>
            </FloatLabel>
            <FloatLabel>
              <InputNumber
                name="office2"
                value={formData?.office2}
                useGrouping={false}
                maxLength={10}
                aria-autocomplete="none"
                inputClassName="pl-3 h-12 w-full dark:bg-slate-800"
                onChange={(e) => formDataHandler(e.originalEvent)}
                className="border border-slate-400 dark:bg-slate-800 rounded-md"
              />
              <label className="dark:text-slate-400">Office Number 2</label>
            </FloatLabel>
          </div>
          <div className="flex justify-between mt-7">
            <FloatLabel>
              <InputText
                name="city"
                value={formData?.city}
                onChange={formDataHandler}
                className="w-full border border-slate-400 dark:bg-slate-800 p-3"
              />
              <label className="dark:text-slate-400">
                City <span className="text-red-400">*</span>
              </label>
            </FloatLabel>
            <FloatLabel>
              <InputNumber
                name="pincode"
                value={formData?.pincode}
                useGrouping={false}
                maxLength={6}
                inputClassName="pl-3 h-12 w-full dark:bg-slate-800"
                onChange={(e) => formDataHandler(e.originalEvent)}
                className=" border  border-slate-400 dark:bg-slate-800 rounded-md"
              />
              <label className="dark:text-slate-400">
                Pincode <span className="text-red-400">*</span>
              </label>
            </FloatLabel>
          </div>
          <div className="mt-7">
            <FloatLabel>
              <Dropdown
                name="state"
                value={formData?.state}
                onChange={formDataHandler}
                options={states}
                optionLabel="state"
                optionValue="state"
                className="w-full border border-slate-400 dark:bg-slate-800  h-12"
              />
              <label className="dark:text-slate-400">
                State <span className="text-red-400">*</span>
              </label>
            </FloatLabel>
          </div>

          {/* <div className="mt-7">
            <div className="relative w-[100px] h-[100px]">
              <img
                src={formData?.schoolStamp}
                className="w-[100px] h-[100px] bg-cover bg-fit rounded-full border"
              />

              <input
                id="schoolStamp"
                type="file"
                accept="image/*"
                onChange={schoolStampHandler}
                className="hidden"
              />
              <label
                htmlFor="schoolStamp"
                className="absolute bottom-0 right-0 border w-8 h-8 shadow shadow-slate-500 bg-white border-black rounded-full flex justify-center items-center"
              >
                <BiCamera size={20} />
              </label>
            </div>
            <label className="dark:text-white">Select Stemp</label>
          </div> */}

          <div className="flex justify-center py-5">
            {School?.status === true ? (
              <Button
                label="update"
                onClick={confirm2}
                loading={loading}
                icon={<BiUpload size={20} />}
                className="flex justify-center gap-2 bg-blue-500 text-white px-28 py-4"
              />
            ) : (
              <Button
                label="Save"
                loading={loading}
                onClick={confirm1}
                disabled={
                  formData?.schoolPhoto &&
                  formData?.schoolName &&
                  formData?.address &&
                  formData?.email
                    ? false
                    : true
                }
                icon={<BiSave size={20} />}
                className="flex justify-center gap-2 bg-green-500 text-white px-28 py-4"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
