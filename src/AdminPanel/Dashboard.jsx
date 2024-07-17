import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from 'axios';

import Header from "./Hearder"

import { AiFillEdit } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";
import { IoMdSearch } from "react-icons/io";

import { Tabs, Tab, Container, Modal } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard() {

    const navigate = useNavigate()
    
    axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');
    axios.defaults.headers.common['Content-Type'] = 'application/json'; 

    const [visitedOverview, setVisitedOverview] = useState(true);
    const onOverview = () => {
        if (visitedOverview) return;
        return setVisitedOverview(true);
    };

    const [visitedPermission, setVisitedPermission] = useState(false);
    const onPermission = () => {
        if (visitedPermission) return;

        // alert('Permission');

        return setVisitedPermission(true);
    };

    const [visitedAccounts, setVisitedAccounts] = useState(false);
    const onAccounts = () => {
        if (visitedAccounts) return;

        return setVisitedAccounts(true);
    };


    const [activeKey, setActiveKey] = useState('overview');
    const [userPermissions, setUserPermissions] = useState([]);

    const [filterTextPermission, setFilterTextPermission] = useState('');

    const filteredItemsHelper = (item) => {
        if (typeof item != 'string')
            return false;

        if (item.toLowerCase().includes(filterTextPermission.toLowerCase()))
            return true;

        return false;
    }
    const filteredItems = userPermissions.filter(item => filteredItemsHelper(item.userName) || filteredItemsHelper(item.userEmail) || filteredItemsHelper(item.validUntil));



    const [showPermissionModal, setShowPermissionModal] = useState(false);
    const [extendDate, setExtedDate] = useState(new Date().toISOString().split('T')[0]);
    const [ticketUploadInterval, setTicketUploadInterval] = useState(30);

    const [modalName, setModalName] = useState('');
    const [modalEmail, setModalEmail] = useState('');
    const [documentId, setDocumentId] = useState('');

    const [chosenIndex, setChosenIndex] = useState(-1);

    const setModalDetails = (data, index) => {

        setExtedDate(new Date().toISOString().split('T')[0]);
        setModalName(data.userName);
        setModalEmail(data.userEmail);
        setDocumentId(data._id);
        setTicketUploadInterval(data.ticketUploadInterval);
        setChosenIndex(index);

        setShowPermissionModal(true);
    }

    const appendUserControls = () => {

        let formatedDate = extendDate.split('-').reverse().join('-')

        let message = `${modalName} ( ${modalEmail} ) will be able to generate tickets till ${formatedDate} before the next approval is required.
The tickets will have to be uploaded on an interval of ${ticketUploadInterval} tikets or less.
Please confirm if you approve of these changes`;

        if (!window.confirm(message))
            return;

        let requestBody = { ticketUploadInterval, validUntil:extendDate, documentId }; 
        axios.put('/api/admin/updatePermission', requestBody)
            .then(res => {

                toast.success('Permissions Updated for '+modalName);

                setUserPermissions(prevArray => {
                    let newArray = [...prevArray];
                    newArray[chosenIndex].validUntil = formatedDate;
                    newArray[chosenIndex].ticketUploadInterval = ticketUploadInterval;
                    return newArray;
                });

            }).catch(err => {
                toast.error('Network Error');
            });

       
        setShowPermissionModal(false);

    }

    useEffect(() => {

        let checkToken = localStorage.getItem('token');
        let validTill = localStorage.getItem('validTill');
        if (!checkToken || !validTill) navigate('/');

        if (new Date(validTill) < new Date()) navigate('/');

        // localStorage.removeItem('token');
        // localStorage.removeItem('validTill');

        axios.get('/api/admin/getAllPermsisions')
            .then(res => {
                setUserPermissions(res.data?.data?.premissionRequired ?? [])
            }).catch(err => {
                toast.error('Network Error');
            });


    }, []);

    return (
        <div className="contiainerDiv min-h-screen charterBlue">
            <ToastContainer  autoClose={2000} hideProgressBar={true} newestOnTop={true} />
            <Header />

            <Container className="mt-3">
                <h2 className="text-white pb-2">Main Dashboard</h2>

                <Tabs id="uncontrolled-tab-example" className="mb-3 flext justify-center sm:justify-start" activeKey={activeKey} onSelect={(tab) => setActiveKey(tab)}>

                    <Tab eventKey="overview" title={
                        <span onClick={onOverview}
                            className={`font-semibold text-lg ${activeKey !== 'overview' ? 'text-white' : 'charterText'}`}>
                            Overview
                        </span>
                    }>
                        <div className="bg-white rounded-md p-2">
                            <h3>Analytics Coming Soon...</h3>
                        </div>
                    
                    </Tab>


                    <Tab eventKey="permission" title={
                        <span onClick={onPermission}
                            className={`font-semibold text-lg ${activeKey !== 'permission' ? 'text-white' : 'charterText'}`}>
                            Permission
                        </span>
                    }>

                            <div className="w-full bg-white rounded-md p-2">
                            <div className="w-full mb-3 py-2 relative">
                                <input type="text" className="w-full border-2 rounded-full h-9 ps-9" onChange={(event) => setFilterTextPermission(event.target.value)} />
                                <IoMdSearch className="absolute top-1/4 left-2 text-2xl" />
                            </div>

                            <div className="table-responsive">
                                <table className="table table-bordered table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Expires On</th>
                                            <th>Upload Interval</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredItems.map((elem, index) => (
                                            <tr key={'permsission' + index}>
                                                <td className="whitespace-nowrap">{elem.userName}</td>
                                                <td className="whitespace-nowrap">{elem.userEmail}</td>
                                                <td className="whitespace-nowrap">{elem.validUntil}</td>
                                                <td className="whitespace-nowrap">{elem.ticketUploadInterval}</td>
                                                <td className="flex justify-center text-xl charterText">
                                                    <AiFillEdit className="text-3xl" onClick={() => setModalDetails(elem, index)} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                       
                    </Tab>

                    <Tab eventKey="accounts" title={
                        <span onClick={onAccounts}
                            className={`font-semibold text-lg ${activeKey !== 'accounts' ? 'text-white' : 'charterText'}`}>
                            Accounts
                        </span>
                    }>
                        <div className="bg-white rounded-md">
                            <h2>Profile Section</h2>
                            <p>This is the Profile section content.</p>
                        </div>
                    </Tab>

                </Tabs>
            </Container>

            <Modal show={showPermissionModal} onHide={() => setShowPermissionModal(false)}>

                <Modal.Body>
                    <div className="flex justify-between py2">
                        <h5>User Process Controls</h5>
                        <span className="text-2xl" onClick={() => setShowPermissionModal(false)}><RxCrossCircled /></span>
                    </div>

                    <div>

                        <span className="text-slate-600 text-sm">all the controls will be applicable till the extended date ends only after that new controls will be applicable or untill the user opens admin authentication page</span>

                        <h6 className="mt-4">User Name</h6>
                        <h6 className="font-semibold">{modalName}</h6>

                        <h6 className="mt-4">User Email</h6>
                        <h6 className="font-semibold">{modalEmail}</h6>
                    </div>

                    <div>
                        <div className="mt-4">
                            <h6>Extend Date</h6>
                            <input type="date" value={extendDate} onChange={(elem) => { setExtedDate(elem.currentTarget.value) }} className="w-1/2 h-9 rounded-md border-2 border-blue-900 bg-white ps-1" id="extensionDate" />
                        </div>

                        <div className="mt-4">
                            <h6>Ticket Interval <span className="text-xs text-slate-600 font-normal">(after how many tickets does the user have to upload his ticket data)</span></h6>
                            <input type="number" value={ticketUploadInterval} onChange={(elem) => { setTicketUploadInterval(elem.currentTarget.value) }} className="w-1/2 h-9 rounded-md border-2 border-blue-900 bg-white ps-1" id="extensionDate" />
                        </div>
                    </div>

                    <div className="flex justify-around pt-4">
                        <button className="btn rounded-md bg-danger font-semibold text-white" onClick={() => setShowPermissionModal(false)}>Cancle</button>
                        <button className="btn rounded-md charterBlue font-semibold text-white" onClick={appendUserControls}>Save</button>
                    </div>
                </Modal.Body>

            </Modal>

        </div>
    )
}