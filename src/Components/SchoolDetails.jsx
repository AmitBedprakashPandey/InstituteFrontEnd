import { useDispatch, useSelector } from "react-redux";
import SchoolForm from "../Utilites/SchoolForm";
import { getSchoolbyId } from "../Redux/Slice/SchoolSlicse";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function SchoolDetails(params) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userid } = useSelector((state) => state.UserAuth);
  const { School, message } = useSelector((state) => state.School);
  useLayoutEffect(() => {
    dispatch(getSchoolbyId(userid));
    if (School) {
      navigate("/");
    }
  }, [dispatch,School]);
  return (
    <div className="flex justify-center pt-10 w-96">
      <SchoolForm />
    </div>
  );
}
