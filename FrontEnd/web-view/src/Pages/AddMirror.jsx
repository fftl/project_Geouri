import React from "react";
import { useSelector } from "react-redux";
import { AddMirrorComp } from "../Components/index";

const AddMirror = () => {
    const user = useSelector((state) => state?.member?.memberKey);

    return (
        <>
            <AddMirrorComp />
        </>
    )
}

export default AddMirror;