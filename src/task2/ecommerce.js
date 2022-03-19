////////////////////////////////////////////// Helper code, do not edit /////////////////////////////////////////
import { allIds, fetchOrderById } from "../api";
import {DateAndTimeUtil, getOrderOnlyIfFromUptoXDaysAgo} from "./utils";

////////////////////////////////// Your code tasks are below //////////////////////////////////////////////////////
const fetchAllOrders = async () => {
    const ids = allIds;
    const orders = await Promise.all([...allIds.map(async (id)=>{return await fetchOrderById(id)})]);
    return orders;
    // .....
    //   1. TODO: fetch all ids using the "fetchOrderById" and the given ids, make it work as efficient and clean as possible.
};

const bucketOrdersByUsers = async () => {
    const orders = await fetchAllOrders();
    return orders.reduce((acc,currentOrder)=>{
        const currentUserId = currentOrder.userId;
        acc[currentUserId] = acc[currentUserId] ? [...acc[currentUserId],currentOrder] : [currentOrder];
        return acc;
    },{});
    //   2. TODO: using the function from section 1 you should now bucket the orders by user.
    // each key in the object (ordersByUsers) represents a userId and each value is an array of the orders of that user.
};

const getLast2WeeksOrders = async () => {
    const ids = allIds;
    const orders = await Promise.all([...allIds.map(async (id)=>{return await getOrderOnlyIfFromUptoXDaysAgo(id,14)})]);
    return orders.filter(order=>order);
    //   3. TODO: fetch all Ids and return array with only the last 2 weeks orders. make it work as efficient and clean as possible.
};

const bucketOrdersByDate = async () => {
    const orders = await getLast2WeeksOrders();
    return orders.reduce((acc,currentOrder)=>{
        const currentOrderDate = DateAndTimeUtil.homeMadeDateFormat(currentOrder.timestamp);
        acc[currentOrderDate] = acc[currentOrderDate] ? [...acc[currentOrderDate],currentOrder] : [currentOrder];
        return acc;
    },{});
    //   4. TODO: using the function from section 3 bucket the orders by date.
    // each key in the object (ordersByDate) represents a day and each value is an array of the orders in that date.
};

await fetchAllOrders();
// .then(console.log);

await bucketOrdersByUsers();
// .then(console.log);

await getLast2WeeksOrders();
// .then(console.log);

await bucketOrdersByDate();
// .then(console.log);

////////////////////////////////////////
