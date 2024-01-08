import './switchTab.scss'
import { useState } from 'react';


function SwitchTabs (props){
const [selectedTab,setSelectedTab]= useState(0)
const [left , setLeft] = useState(0)

const activeTab = (tab , index)=>{
setLeft(index *100)
setTimeout(()=>{
  setSelectedTab(index)
},300)
props.onChangTab(tab);
}

return (
  <div className="switchingTabs">
    <div className="tabItems">
      {props.data.map((tab, index) => (
        <span key={index} className={`tabItem ${selectedTab === index ? 'active':''} `} onClick={() => {activeTab(tab, index);}}>
          {tab}
        </span>
      ))}
      <span className="movingBg" style={{ left }} />
    </div>
  </div>
);
}

export default SwitchTabs;