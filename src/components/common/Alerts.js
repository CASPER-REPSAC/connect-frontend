import React from "react";
import { CasLogoSVG } from "@/icons";
import { useDispatch, useSelector } from "react-redux";
import { hideAlert } from "@/redux/alerts";
import { isArray } from "#serv";

function findObjectByFunction(object, func) {
  if (!object) return false;
  const keys = Object.keys(object);
  let array = [];
  for (let i = 0; i < keys.length; i++) {
    if (func(object[keys[i]])) {
      array = array.concat({ key: keys[i], ...object[keys[i]] });
    }
  }
  return array;
}

const initialState = {
  comment: {
    loading: false,
    error: null,
  },
  activity: {
    loading: false,
    error: null,
  },
  chapter: {
    loading: false,
    error: null,
  },
  files: {
    fileName: {
      loading: false,
      error: null,
    },
  },
};

export const LoadingItem = ({ type }) => {
  return (
    <div className="overscroll-y-scroll bg-green-500 text-text-50 border-2 border-grenn-700 shadow py-1 px-3 min-w-tabletCard rounded-lg ">
      <h3>{type}</h3>
    </div>
  );
};

export const ErrorItem = ({ error, type }) => {
  const { response } = error;
  const dataKeys = Object.keys(response.data) || [];

  return (
    <div className="overscroll-y-scroll bg-point-500 text-text-50 border-2 border-point-700 shadow py-1 px-3 min-w-tabletCard rounded-lg ">
      <h3>
        {type} - {response.status || ""} : {response.statusText || ""}
      </h3>
      {dataKeys.map((key) => (
        <li key={key} className="p-0 m-0 block">
          ☠️ {key} : {JSON.stringify(response.data[key], null, "\t")}
        </li>
      ))}
    </div>
  );
};

export const Alerts = React.memo(() => {
  const dispatch = useDispatch();
  const {
    show, //loadings, errors
  } = useSelector((state) => state.alerts);
  const submits = useSelector((state) => state.submits);
  const submitKeys = Object.keys(submits) || [];
  const errorKeys = submitKeys.filter((key) => submits[key].error) || [];
  const loadingKeys = submitKeys.filter((key) => submits[key].loading) || [];
  const fileKeys = Object.keys(submits.files) || [];

  const fileLoadingKeys =
    fileKeys.filter((key) => submits.files[key].loading) || [];

  const onClose = () => {
    dispatch(hideAlert());
  };

  return (
    <div
      className={
        "fixed max-h-detailCard max-w-lg opacity-80 top-2 right-2 z-50  " +
        (show ? "block" : "hidden")
      }
    >
      <div className="flex gap-1 flex-col">
        {errorKeys &&
          errorKeys.map((errorKey, index) => (
            <ErrorItem
              key={index}
              type={"submit " + errorKey}
              error={submits[errorKey].error}
            />
          ))}
        {loadingKeys &&
          loadingKeys.map((loadingKey, index) => (
            <LoadingItem key={index} type={"submit " + loadingKey} />
          ))}
        {console.log("fileLoadingKeys", fileLoadingKeys)}
        {console.log("submits", submits)}
        {console.log("fileKeys", fileKeys)}
        {fileLoadingKeys &&
          fileLoadingKeys.map((fileLoadingKey, index) => (
            <>
              {console.log("file loading key", fileLoadingKey)}
              <LoadingItem
                key={index}
                type={"submiting file " + fileLoadingKey + "..."}
              />
            </>
          ))}
      </div>
    </div>
  );
});

export default Alerts;
