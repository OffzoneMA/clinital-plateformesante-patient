import FileExtensionToMimeType from "../enums/FileExtensionToMimeType";
export default class Validator {
  constructor(rules) {
    this.rules = rules;
    this.data = {};
    this.errors = {};

  }


  required(value, required, name) {
    if (value === true || value > 0) {
      return true;
    }

    if (
      name &&
      this.rules[name] &&
      Object.keys(this.rules[name]).includes("numeric")
    ) {
      return this.numeric(value) === true
        ? true
        : "the :attribute field is required.";
    }

    return value != null && value.length > 0
      ? true
      : "the :attribute field is required.";
  }

  //the field under validation must be present and not empty if the anotherfield field is equal to any value.
  requiredIf(value, options, name) {
    let field = options?.field;
    let fieldExpectedValue = options?.value;
    let fieldCurrentValue =
      typeof this.data !== "undefined" ? this.data[field] : "undefined";

    if (typeof fieldCurrentValue !== "undefined") {
      if (Array.isArray(fieldExpectedValue)) {
        if (fieldExpectedValue.includes(fieldCurrentValue) === true) {
          return this.required(value, true, name) === true
            ? true
            : "the :attribute field is required when " +
                field +
                " is " +
                fieldExpectedValue.join(", ") +
                ".";
        }
      } else {
        if (fieldCurrentValue == fieldExpectedValue) {
          return this.required(value, true, name) === true
            ? true
            : "the :attribute field is required when " +
                field +
                " is " +
                fieldExpectedValue +
                ".";
        }
      }
    }
    return "";
  }

  requiredWith(value, field) {
    // let fieldCurrentValue =
    //   typeof this.data !== "undefined" ? this.data[field] : "";
    // if (typeof fieldCurrentValue !== "undefined") {
    
    //   return value != null && value.length > 0
    //     ? true
    //     : "the :attribute field is required when " + field + " is present.";
    // }
    // return "";
   
    return value != null 
        ? true
        : "the :attribute field is required when " + field + " is present.";
  }
   

  requiredWithout(value, options) {
    let field = options?.field;
    let fieldExpectedValue = options?.value;
    let fieldCurrentValue =
      typeof this.data !== "undefined" ? this.data[field] : "";

    if (typeof fieldCurrentValue !== undefined) {
      if (fieldExpectedValue !== undefined) {
        if (fieldCurrentValue !== fieldExpectedValue) {
          return value != null && value.length > 0
            ? true
            : "the :attribute field is required when " +
                field +
                " is " +
                fieldExpectedValue +
                " is not present.";
        }
      } else {
        if (fieldCurrentValue == null || fieldCurrentValue?.length === 0) {
          return value != null && value.length > 0
            ? true
            : "the :attribute field is required when " +
                field +
                " is not present.";
        }
      }
    }

    return "";
  }

  minLength(val, length) {
    let value = val?.replace(/<(.|\n)*?>/g, "").trim() || null;
    if (value == null || value.length === 0) {
      return "";
    }

    return value.length >= length
      ? true
      : " the :attribute must be at least " + length + " characters";
  }

  maxLength(val, length) {
    let value = val?.replace(/<(.|\n)*?>/g, "").trim() || null;
    if (value == null || value.length === 0) {
      return "";
    }

    return value.length < length
      ? true
      : " the :attribute must not be greater than " + length + " characters.";
  }

  email(value, boolean) {
    if (value == null || value.length === 0) {
      return "";
    }
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emailPattern.test(value) === false
      ? "the :attribute must be a valid email address."
      : true;
  }
  phone(value,boolean) {
    if (value == null || value.length === 0) {
      return "";
    }
    var phonePattern = /^\+(?:[0-9] ?){6,14}[0-9]$/;

    return phonePattern.test(value) === false
      ? "the :attribute must be a valid phone number."
      : true;
  }

  min(value, digit) {
    if (value == null) {
      return "";
    }
    return Number.isInteger(parseInt(value)) && value >= digit
      ? true
      : "the :attribute must be at least " + digit;
  }

  max(value, digit) {
    if (value == null || value.length === 0) {
      return "";
    }
    return Number.isInteger(parseInt(value)) && value <= digit
      ? true
      : "the :attribute must not be greater than " + digit;
  }

  in(value, array) {
    if (value == null || value.length === 0) {
      return "";
    }
    return array.includes(value) !== true
      ? "the selected :attribute is invalid."
      : true;
  }

  numberBetween(value, between = [0, 1]) {
    return Number.isInteger(parseInt(value)) &&
      Number(value) >= between[0] &&
      Number(value) <= between[1]
      ? true
      : "the :attribute must be between " + between[0] + " and " + between[1];
  }

  //https://svn.apache.org/repos/asf/httpd/httpd/trunk/docs/conf/mime.types
  mimes(files, allowedMimes) {
    if (files == null) {
      return "";
    }

    let isVerified = true;
    if (files.length > 0) {
      let errs = [];
      for (let i = 0; i < files.length; i++) {
        let file = files[i];

        if (allowedMimes.includes(file.type) !== true) {
          errs.push({
            file: file,
            message:
              "the :attribute must be a file of type: " +
              allowedMimes
                .map((mim) => {
                  if (
                    Object.values(FileExtensionToMimeType || {}).includes(mim)
                  ) {
                    return (
                      Object.keys(FileExtensionToMimeType).find(
                        (key) => FileExtensionToMimeType[key] === mim
                      ) || mim
                    );
                  }
                })
                .join(","),
          });
        }
      }
      if (errs.length > 0) {
        return errs;
      }

      return isVerified;
    }
    return "";
  }

  image(files, bool) {
    return this.mimes(files, [
      "image/jpg",
      "image/jpeg",
      "image/png",
      "image/bmp",
      "image/gif",
      "image/svg+xml",
      "image/webp",
    ]);
  }
  maxFiles(files, count) {
    if (files == null || !Array.isArray(files)) {
      return "";
    }
    if (files.length > count) {
      return "the :attribute must be less than " + count + " files.";
    }
    return true;
  }

  // size in KB.
  maxSize(files, size) {
    if (files == null) {
      return "";
    }
    let isVerified = true;
    if (files.length > 0) {
      let errs = [];
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        if (file.size > size * 1000) {
          errs.push({
            file: file,
            message: "the :attribute must be less than " + size + " kilobytes.",
          });
        }
      }
      if (errs.length > 0) {
        return errs;
      }

      return isVerified;
    }
  }

  numeric(value, boolean) {
    if (value == null || value.length === 0) {
      return "";
    }
    return Number.isInteger(parseInt(value))
      ? true
      : "the :attribute must be a number.";
  }

  same(value, expected) {}

  url(value, boolean) {
    if (value == null || value.length === 0) {
      return "";
    }
    let urlPattern =
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

    return urlPattern.test(value) === false
      ? "the :attribute format is invalid."
      : true;
  }

  urlParts(value, parts) {
    if (value == null || value.length === 0) {
      return "";
    }
    try {
      let url = new URL(value);
      let keys = Object.keys(parts);
      for (let i = 0; i < keys.length; i++) {
        let value = keys[i];
        if (Array.isArray(parts[value])) {
          if (parts[value].includes(url[value]) !== true) {
            return "the :attribute " + value + " must be " + parts[value];
          }
        } else {
          if (url[value] !== parts[value]) {
            return "the :attribute " + value + " must be " + parts[value];
          }
        }
      }
      return true;
    } catch (error) {
      return "";
    }

    return "";
  }

  regex(value, regex) {
    return "";
  }

  date(value, format) {
    if (value == null || value.length === 0) {
      return "";
    }
    return typeof Date.parse(value) !== "NaN"
      ? true
      : "the :attribute is not a valid date.";
  }

  boolean(value, param) {
    return typeof value === "boolean";
  }

  check(name, value, data) {
    if (typeof this.rules[name] !== undefined) {
      this.data = data;
      let rules = this.rules[name];
      for (let method in rules) {
        if (rules.hasOwnProperty(method)) {
          let param = rules[method];
          let result = method in this ? this[method](value, param, name) : true;

          if (result !== true) {
            if (Array.isArray(result)) {
              if (rules.hasOwnProperty("multipleFiles")) {
                return result;
              } else {
                return result[0];
              }
            } else if (result?.hasOwnProperty("message")) {
              return result?.message;
            }
            return result;
          }
        }
      }
      return true;
    }

    return "";
  }

  checkAll(data) {
    let errors = {};
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        let result = this.check(key, data[key], data);
        if (result !== true && result?.length > 0) {
          errors[key] = result;
        }
      }
    }

    return Object.keys(errors).length === 0 ? true : errors;
  }
}
