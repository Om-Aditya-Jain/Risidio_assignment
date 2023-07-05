import React from "react";
import './todolist.css';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

const todolist = (props) => {
  const currentDate = new Date();
  const todoDate = new Date(props.date);
  let diff, diff_days, diff_days_string;
  if(currentDate<todoDate){
    diff = todoDate.getTime() - currentDate.getTime();
    diff_days = Math.ceil(diff / (1000 * 3600 * 24));
    if(diff_days===1){
      diff_days_string = diff_days+" day remaining";
    }else{
      diff_days_string = diff_days+" days remaining";
    }
  }else{
    diff = currentDate.getTime() - todoDate.getTime();
    diff_days = Math.ceil(diff / (1000 * 3600 * 24));
    if(diff_days===1){
      diff_days_string = "Today";
    }else if(diff_days===2){
      diff_days_string = "1 Day late";
    }else{
      diff_days_string = (diff_days-1)+" Days late";
    }
  }

  if (props.edit === props.id) {
    return (
      <div className="list">
        <input
          type="text"
          name="item"
          className="list__input"
          value={props.newValue}
          placeholder="Add Items"
          onChange={props.handleNewValue}
        />
        <input type="date" className="list__date" name="date" value={props.newDate} onChange={props.handleNewDate}/>
        
        <div className="list__icons">
        <DeleteRoundedIcon className="list__icons__delete"
          onClick={() => {
            props.deleteItem(props.id);
          }}/>
        <CheckRoundedIcon className="list__icons__save"
          onClick={()=>{props.handleEdit({
            id:props.id,
            value:props.value,
            date:props.date,
            isCompleted:props.status,
          })}} sx={{fontWeight:'bold', fontSize:'29px'}}/>
        </div>
      </div>
    );
  } else {

    return (
      <div className="list">
        <input
          type="checkbox"
          className="list__checkbox"
          defaultChecked={props.status}
          onChange={() => {
            props.handleChange({
              id: props.id,
              status: !props.status,
            });
          }}
        />
        <li className="list__text">
        <p className={`list__text__para ${props.status === true ? 'list__text__complete' : ''}`}>{props.value}</p>{props.status === false && <p className={'list__text__date'}>{diff_days_string}</p>}
        </li>
        <div className="list__icons">
        <DeleteRoundedIcon className="list__icons__delete"
          onClick={() => {
            props.deleteItem(props.id);
          }}/>
        <EditRoundedIcon className="list__icons__edit" onClick={() => props.handleEnableEditing(props.id, props.value, props.date)}/>
        </div>
         
      </div>
    );
  }
};

export default todolist;
