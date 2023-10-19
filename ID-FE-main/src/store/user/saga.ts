import { call, put, all, takeLatest } from 'redux-saga/effects'
import * as userActions from '../user/actions';
import { toast } from 'react-toastify';
import { useAddEmployee, useGetEmployees, useGetFiles, useUpdateRole, useUpdateUser } from 'apollo/hooks/user';
import * as api from 'api/entries'

function* getFiles() {
  try {
    yield put({type: userActions.USER_START_LOADING});

    const {data} = yield call(useGetFiles);
    const {result, error, files} = data.getFiles;

    if (result) {
      yield put({type: userActions.USER_FILES_RESPONSE, files});
    } else {
      toast.error(error, {
        position: 'bottom-right',
        theme: 'light'
      });
      yield put({type: userActions.USER_FILES_RESPONSE});
    }
  } catch (e) {
    console.error(e);
    toast.error(e.message, {
      position: 'bottom-right',
      theme: 'light'
    });
  }
  yield put({type: userActions.USER_FINISH_LOADING});
}

function* updateUser(action) {
  try {
    yield put({type: userActions.USER_START_LOADING});

    const {data} = yield call(useUpdateUser, action.data);
    const {user, error, result} = data.updateUser;
    if (result && user) {
      yield put({type: userActions.USER_FILES_RESPONSE, user});
    } else {
      toast.error(error, {
        position: 'bottom-right',
        theme: 'light'
      });
    }
  } catch(e) {
    toast.error(e, {
      position: 'bottom-right',
      theme: 'light'
    });
  }
  yield put({type: userActions.USER_FINISH_LOADING});
}

function* addEmployee(action) {
  try {
    yield put({type: userActions.USER_START_LOADING});

    const {data} = yield call(useAddEmployee, action.data);
    const {employee, error, result} = data.addEmployee;

    if (result && employee) {
      yield put({type: userActions.USER_GET_EMPLOYEES_REQUEST});

      toast.success('Employee is added successfully and sent invitation to his/her email.', {
        position: 'bottom-right',
        theme: 'light'
      });

      return;
    } else {
      toast.error(error, {
        position: 'bottom-right',
        theme: 'light'
      });
    }
  } catch(e) {
    toast.error(e, {
      position: 'bottom-right',
      theme: 'light'
    });
  }
  yield put({type: userActions.USER_FINISH_LOADING});
}

function* getEmployees() {
  try {
    yield put({type: userActions.USER_START_LOADING});

    const {data} = yield call(useGetEmployees);
    const {employees, error, result} = data.getEmployees;

    if (result && employees) {
      yield put({type: userActions.USER_GET_EMPLOYEES_RESPONSE, employees});
    } else {
      toast.error(error, {
        position: 'bottom-right',
        theme: 'light'
      });
    }
  } catch(e) {
    toast.error(e, {
      position: 'bottom-right',
      theme: 'light'
    });
  }
  yield put({type: userActions.USER_FINISH_LOADING});
}

function* sendInvitation(action) {
  try {
    yield put({type: userActions.USER_START_LOADING});
    const {result} = yield call(api.sendInvitation, action.data.email);

    if (result) {
      toast.success("Invited successfully", {
        position: 'bottom-right',
        theme: 'light'
      });
    } else {
      toast.error("Invitation was not sent, please try again later!", {
        position: 'bottom-right',
        theme: 'light'
      });
    }
  } catch(e) {
    toast.error(e, {
      position: 'bottom-right',
      theme: 'light'
    });
  }
  yield put({type: userActions.USER_FINISH_LOADING});
}

function* updateRole(action) {
  try {
    yield put({type: userActions.USER_START_LOADING});
    const {data} = yield call(useUpdateRole, action.data);
    const {error, result} = data.updateRole;

    if (result) {
      toast.success("Employee's role is updated successfully", {
        position: 'bottom-right',
        theme: 'light'
      });
    } else {
      toast.error("Role is not updated, please try again later!", {
        position: 'bottom-right',
        theme: 'light'
      });
    }
  } catch(e) {
    toast.error(e, {
      position: 'bottom-right',
      theme: 'light'
    });
  }
  yield put({type: userActions.USER_FINISH_LOADING});
}

function* deleteEmployee(action) {
  try {
    yield put({type: userActions.USER_START_LOADING});
    console.log(action);
    const {result} = yield call(api.deleteEmployee, action.data.id);

    if (result) {
      yield put({type: userActions.USER_GET_EMPLOYEES_REQUEST});
      
      toast.success("Deleted successfully", {
        position: 'bottom-right',
        theme: 'light'
      });

      return;
    } else {
      toast.error("Deleting this employee is failed, please try again later!", {
        position: 'bottom-right',
        theme: 'light'
      });
    }
  } catch(e) {
    toast.error(e, {
      position: 'bottom-right',
      theme: 'light'
    });
  }
  yield put({type: userActions.USER_FINISH_LOADING});
}



/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* userSaga() {
  yield all([
    takeLatest(userActions.USER_FILES_REQUEST, getFiles),
    takeLatest(userActions.USER_UPDATE_RUQUEST, updateUser),
    takeLatest(userActions.USER_ADD_EMPLOYEE_REQUEST, addEmployee),
    takeLatest(userActions.USER_GET_EMPLOYEES_REQUEST, getEmployees),
    takeLatest(userActions.USER_SEND_INVITATION, sendInvitation),
    takeLatest(userActions.USER_DELETE_EMPLOYEE, deleteEmployee),
    takeLatest(userActions.USER_ROLE_UPDATE, updateRole),
  ]);
}

export default userSaga;