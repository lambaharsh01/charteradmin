import { useState  } from "react";
import Header from "./Hearder"

import { Tabs, Tab, Container } from 'react-bootstrap';

export default function Dashboard(){

const [visitedOverview, setVisitedOverview]= useState(true);
const onOverview=()=>{
    if(visitedOverview) return;

    // alert('hello world');

    return setVisitedOverview(true);
};

const [visitedPermission, setVisitedPermission]= useState(false);
const onPermission=()=>{
    if(visitedPermission) return;

    // alert('Permission');

    return setVisitedPermission(true);
};

const [visitedAccounts, setVisitedAccounts]= useState(false);
const onAccounts=()=>{
    if(visitedAccounts) return;

    // alert('Accounts')

    return setVisitedAccounts(true);
};


const [activeKey, setActiveKey] = useState('overview');

return(
    <div className="contiainerDiv min-h-screen charterBlue">
        <Header/>


        <Container className="mt-3">
            <h2 className="text-white">Main Dashboard</h2>

            <Tabs id="uncontrolled-tab-example" className="mb-3" activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>

            <Tab eventKey="overview" title={
                <span onClick={onOverview} 
                    className={`font-semibold text-lg ${activeKey!=='overview'? 'text-white':'charterText'}`}>
                    Overview
                </span>
            }>
                <div className="bg-white rounded-lg">
                <h2>Home Section</h2>
                <p>This is the Home section content.</p>
                </div>
            </Tab>

            <Tab eventKey="permission" title={
                <span onClick={onPermission} 
                    className={`font-semibold text-lg ${activeKey!=='permission'? 'text-white':'charterText'}`}>
                        Permission
                </span>
            }>
                <div className="bg-white rounded-lg">
                <h2>Contact Section</h2>
                <p>This is the Contact section content.</p>
                </div>
            </Tab>

            <Tab eventKey="accounts" title={
                <span onClick={onAccounts}
                className={`font-semibold text-lg ${activeKey!=='accounts'? 'text-white':'charterText'}`}>
                    Accounts
                </span>
            }>
                <div className="bg-white rounded-lg">
                <h2>Profile Section</h2>
                <p>This is the Profile section content.</p>
                </div>
            </Tab>

            </Tabs>
        </Container>

    </div>
)
}