/*
* - - - - - - - - - - - - - - - -
* Date and time related functions
* - - - - - - - - - - - - - - - -
* */
import {fetchOrderById} from "../api";

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
const fortnight = day * 14;


const homeMadeDateFormat = (date) => {
    const jsDate = new Date(date);
    return `${jsDate.getDate()}-${jsDate.getMonth() + 1}-${jsDate.getFullYear()}`
}
const homeMadeTimeFormat = (date) => {
    return `${date.getSeconds()}-${date.getMinutes()}-${date.getHours()}`
}

const checkIfDateFromLastXDays = (date,daysAgo) => {
    const now = Date.now();
    const twoWeeksAgo = Date.now() - (day * daysAgo);
    return (date < now) && (date > twoWeeksAgo)
}

export const DateAndTimeUtil = {
    checkDateFromLastXDays : checkIfDateFromLastXDays,
    homeMadeDateFormat ,
    homeMadeTimeFormat
}
/*
* - - - - - - - - - - - - - - - -
* Helper functions
* - - - - - - - - - - - - - - - -
* */

export const getOrderOnlyIfFromUptoXDaysAgo = async (id, daysAgo) => {
    const order = await fetchOrderById(id);
    return (DateAndTimeUtil.checkDateFromLastXDays(order.timestamp,daysAgo))? order : undefined;
}
