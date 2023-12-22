import {useEffect, useState} from "react";
import Validator from "../helpers/Validator";

export default function useForm(rules={}, initData={}) {
  const validator = new Validator(rules);

  const [errors, setErrors] = useState({});
  const [data, setData] = useState(initData);
  const [uploadedfileUrl,setUploadedfileUrl]=useState("");


  const handleChange = (e) => {
    delete errors[name];
    const name = e.target?.name;
    const type = e.target?.type;
    let value = e.target?.value;
    if (type === "checkbox") 
    {
      value = e.target.checked;
    }else if(type === "radio"){
      value=e.target.value
    } else if (type === "file") {
      value = e.target.files;
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedfileUrl(reader.result);
      };
      reader.readAsDataURL(file);

    }else if(type === "text"){
      value=value.charAt(0).toUpperCase() + value.slice(1)
    }
    else if(type === "number"){
      value = e.target?.value;
    }
    else if(type === "tel"){
      var input = document.querySelector("#phoneNumber");
    var iti = window.intlTelInputGlobals.getInstance(input);
    var fullNumber = iti.getNumber();
      value=fullNumber;
    }
    
    let result = validator.check(name, value, data);
    setData({
      ...data,
      [name]: value,
    });
    if (result === true) {
      delete errors[name];
      setErrors(errors);
    } else if (Array.isArray(result) && type === "file") {
      delete errors[name];
      setErrors({
        fileError: Array.from(result)?.map((res) => {
          return {
            message: res?.message,
            file: res?.file,
          };
        }),
      });
    } else if (result?.length > 0) {
      setErrors({
        ...errors,
       [name]: result,

      });
    }
  };

  const handleCancel = () => {
    setData({});
  };

  const validateAll = (customRules) => {
    let result = {};
    if (customRules && Object.keys(customRules).length) {
      for (let cr in customRules) {
        if (customRules.hasOwnProperty(cr)) {
          if (typeof rules[cr] !== undefined) {
            let validatorName = customRules[cr].validator;
            let validatorParams = customRules[cr].rules;
            let res = customValidators[validatorName](validatorParams);
            if (res !== true) {
              result[cr] = res;
            }
          }
        }
      }
    }
    console.log(data);
    let check = validator.checkAll(data);
    if (check !== true) {
      Object.keys(check).forEach((v) => {
        result[v] = check[v];
      });
    }
    if (Object.keys(result).length) {
      setErrors(result);
      return false;
    }
    return true;
  };

  const setApiErrors = (response) => {
    if (!response.errors && response.message) {
      setErrors({ email: response.message });
      return;
    }

    let apiErrors = response?.errors;
    let er = {};
    Object.keys(apiErrors).forEach((k) => {
      if (k.includes(".")) {
        let ks = k.split(".");
        if (ks.length > 1) {
          let key = ks[0] + "[" + ks[1] + "]";
          er[key] = apiErrors[k][0];
        } else {
          er[k] = apiErrors[k][0];
        }
      } else {
        er[k] = Array.isArray(apiErrors[k]) ? apiErrors[k][0] : apiErrors[k];
      }
    });
    setErrors(er);
  };

  const setFieldValue = (field, value) => {
    
    if (errors.hasOwnProperty(field)) {
      delete errors[field];
      setErrors(errors);
    }

    setData({
      ...data,
      [field]: value,
    });
  };

  const removeField = (field) => {
    let tempData = { ...data };
    delete tempData[field];
    setData(tempData);
  };

  const removeFieldErrors = (name, subName) => {
    if (subName) {
      delete errors[name][subName];
    } else {
      delete errors[name];
    }
    setErrors(errors);
  };
  const customValidators = {
    metadataValidator: (metadataInfo) => {
      if (!metadataInfo.length) {
        delete data["metadata"];
        return true;
      }
      let selectedMetadata = data.metadata || {};
      let metaError = {};
      metadataInfo?.forEach((meta) => {
        if (
          meta.required === 1 &&
          (!selectedMetadata.hasOwnProperty(meta.id.toString()) ||
            !selectedMetadata[meta.id.toString()]?.length)
        ) {
          metaError[meta.name] = `At least one $[meta.title} required`;
        }
        if (
          selectedMetadata.hasOwnProperty(meta.id.toString()) &&
          parseInt(meta.max_to_select) >= 0 &&
          selectedMetadata[meta.id.toString()]?.length >
            parseInt(meta.max_to_select)
        ) {
          metaError[meta.name] =
            "you can select only "+parseInt(meta?.max_to_select)+" "+ meta.title;
        }
      });

      if (Object.keys(metaError).length) {
        return metaError;
      }
      return true;
    },
  };

  const setMultipleFieldsValues = (prams) => {
    setData({
      ...data,
      ...prams,
    });
  };

  const setExteriorErrors = (exteriorErrors) => {
    setErrors({
      ...errors,
      ...exteriorErrors,
    });
  };

  const clearData = (customInitData = null) => {
    setData(customInitData != null ? customInitData : initData);
  };

  return {
    errors,
    setApiErrors,
    setErrors,
    data,
    setData,
    setFieldValue,
    handleChange,
    validateAll,
    setMultipleFieldsValues,
    removeFieldErrors,
    handleCancel,
    removeField,
    setExteriorErrors,
    clearData,
    uploadedfileUrl,setUploadedfileUrl,
  };
}
