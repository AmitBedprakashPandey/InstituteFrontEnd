import React, { useLayoutEffect, useRef } from "react";
import SchoolForm from "../../Utilites/SchoolForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSchoolbyId } from "../../Redux/Slice/SchoolSlicse";


export default function Wizard(params) {
  const { userid } = useSelector((state) => state.UserAuth);
  const { School } = useSelector((state) => state.School);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // useLayoutEffect(() => {
  //   if (School) {
  //     navigate("/");
  //   }
  //   dispatch(getSchoolbyId(userid));
  // }, [School, dispatch]);
  return (
    <div className="w-full flex justify-center">
      <div className="w-full mt-0 rounded-lg min-h-screen md:w-12/12">
        <SchoolForm />
      </div>
    </div>
  );
}
