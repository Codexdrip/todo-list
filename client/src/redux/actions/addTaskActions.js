import axios from "axios";
const API_URL = "http://localhost:5000";

export function addTaskAction(task) {
  return {
    type: "ADD_TASK",
    payload: task
  };
}

export function updateTaskAction(id) {
  return function(dispatch) {
    // {
    //   console.log(`actions id: ${id}`);
    // }
    axios
      .post(`${API_URL}/post/update-task`, id)
      .then(response => {
        console.log(`posted data, response: ${response}`);
        dispatch({
          type: "MARKTASKCOMPLETED_ACTION",
          payload: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function taskCompletedAction(id) {
  return function(dispatch) {
    // {
    //   console.log(`actions id: ${id}`);
    // }
    axios
      .post(`${API_URL}/post/completed-task`, id)
      .then(response => {
        console.log(`posted data, response: ${response}`);
        dispatch({
          type: "MARKTASKCOMPLETED_ACTION",
          payload: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function submitTaskAction(dataFromStore) {
  console.log(dataFromStore);
  return function(dispatch) {
    axios
      .post(`${API_URL}/post/create-task`, dataFromStore)
      .then(response => {
        dispatch({
          type: "GET_TASK_ACTION",
          payload: response.data
        });
      })
      .then(() => {
        console.log("about to reset...");
        document.getElementById("create-course-form").reset();
      })

      .catch(error => {
        console.log(error);
      });
  };
}

export function deleteTaskAction(id) {
  // console.log(`actions: ${id}`);
  // console.log(`actions prop: ${id.taskId}`);
  return function(dispatch) {
    axios({
      method: "delete",
      url: `${API_URL}/delete/delete-task`,
      data: id,
      params: {
        force: true
      }
    })
      .then(res => {
        dispatch({
          type: "DELETE_ACTION",
          payload: res.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function testAction(e) {
  return function(dispatch) {
    e.preventDefault();
    axios
      .get(`${API_URL}`)
      .then(response => {
        dispatch({
          type: "TEST_ACTION",
          payload: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export function getTaskAction() {
  return function(dispatch) {
    axios
      .get(`${API_URL}/get/all-task`)
      .then(response => {
        dispatch({
          type: "GET_TASK_ACTION",
          payload: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
}
