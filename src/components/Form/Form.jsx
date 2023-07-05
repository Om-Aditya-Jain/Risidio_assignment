import * as React from "react";
import './Form.css';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const Form = (props) => {
  return (
    <div className="inputDiv">
      <input
        type="text"
        name="item"
        value={props.value}
        placeholder="Add Items"
        onChange={props.addItem}  
        className="inputDiv__text"      
      />
      <input type="date" className="inputDiv__date" name="date" value={props.date} onChange={props.handleDate}/>
      <AddRoundedIcon className="inputDiv__add" onClick={props.updateItemList} sx={{fontSize:'30px'}}/>
    </div>
  );
};

export default Form;
