import moment from "moment";

// ----------date-formate-------------
export const formatDate = (date = "", format = "YYYY-MM-DD") => {
    if (!date) return "";
    const parsedDate = moment(date);
    return parsedDate.isValid() ? parsedDate.format(format) : "";
};