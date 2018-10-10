import {API_BASE_URL} from '../config';

export const wakeUp = function (loading){
  fetch(`${API_BASE_URL}/wake-up`)
      .then(res => {
        if (res.ok) {
          console.log(res.status, res.statusText);
        }
      });
};