import axios from "axios";

export default {
  // Gets the user with the given id
  getUser: function(id) {
    return axios.get("/api/user/" + id);
  },

  createUser: function(userData) {
    return axios.post("/api/user/create", userData);
  },
  saveUser: function(userData) {
    return axios.post("/api/user", userData);
  }
};
