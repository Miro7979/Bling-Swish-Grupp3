import React from 'react';
import {Col,Row} from 'reactstrap';

const ApproveParent=(props)=>{
(()=> {
  console.log(atob(props.match.params.encoded.split(" ")))
})()
  return(<p>Approved !!!!!!

    {atob(props.match.params.encoded.split(" "))}
  </p>);

}
export default ApproveParent;