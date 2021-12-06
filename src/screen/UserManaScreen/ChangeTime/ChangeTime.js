import React from 'react';    


function changeTime(time) {
    if(time == null) return "";
    else {
        const newTime = new Date(time);
        let month = "", date = "";
        if(newTime.getMonth() + 1 < 10) month = `0${newTime.getMonth() + 1}`;
        else month = `${newTime.getMonth() + 1}`;
        if(newTime.getDate() < 10) date = `0${newTime.getDate()}`;
        else date =  `${newTime.getDate()}`;
        return ` ${newTime.getFullYear()}-${month}-${date}`;
    }
  }  
export default changeTime;