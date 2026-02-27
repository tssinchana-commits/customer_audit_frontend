import axios from "axios";

const BASE_URL = "http://localhost:8081/customer/api/v1/customers";

export const getCustomerById = (id) => {
    return axios.get(`${BASE_URL}/${id}`);
};

export const updateCustomerStatus = (id, data) => {
    return axios.put(`${BASE_URL}/${id}/status`, data);
};