import { Button } from "primereact/button";
import { PiPencilLine, PiEye } from "react-icons/pi";
export const SaveButton=({disable, onClick})=>{
    return<>
    <Button label={"SAVE"}disabled={disable} onClick={onClick} 
    className="w-full h-full m-3 bg-green-500 text-white text-lg hover:bg-green-600 hover:shadow-slate-500 shadow-md duration-200 disabled:cursor-not-allowed"
    />
    </>
}

export const UpdateButton=({disable, onClick})=>{
    return<>
    <Button label={"UPDATE"} disabled={disable} onClick={onClick} 
    className="w-full h-full m-3 bg-blue-500 text-white text-lg hover:bg-blue-600 hover:shadow-slate-500 shadow-md duration-200 disabled:cursor-not-allowed"
    />
    </>
}

export const YesButton=({disable, onClick})=>{
    return<>
    <Button label={"Yes"} disabled={disable} onClick={onClick} 
    className="w-full h-full m-3 bg-blue-500 text-white text-lg hover:bg-blue-600 hover:shadow-slate-500 shadow-md duration-200 disabled:cursor-not-allowed"
    />
    </>
}

export const NoButton=({disable, onClick})=>{
    return<>
    <Button label={"No"} disabled={disable} onClick={onClick} 
    className="w-full h-full m-3  text-black hover:border border-black text-lg hover:shadow-slate-500 shadow-md duration-200 disabled:cursor-not-allowed"
    />
    </>
}

export const EditButton=({disable, onClick})=>{
    return<>
    <Button icon={<PiPencilLine />} disabled={disable} onClick={onClick} 
    className="w-full h-full m-3 bg-blue-500 text-white text-lg hover:bg-blue-600 hover:shadow-slate-500 shadow-md duration-200 disabled:cursor-not-allowed"
    />
    </>
}

export const ViewButton=({disable, onClick})=>{
    return<>
    <Button icon={<PiEye />} disabled={disable} onClick={onClick} 
    className="w-full h-full m-3 bg-blue-500 text-white text-lg hover:bg-blue-600 hover:shadow-slate-500 shadow-md duration-200 disabled:cursor-not-allowed"
    />
    </>
}