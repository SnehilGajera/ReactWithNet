import React,{useState,useEffect, Fragment} from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css';

const CRUD = () => {
    // const employeeData = [{
    //     id :1,
    //     name : 'Snehil',
    //     age : 28,
    //     isActive : 1
    // },
    // {
    //     id :3,
    //     name : 'Manan',
    //     age : 24,
    //     isActive : 1
    // },
    // {
    //     id :3,
    //     name : 'Ankit',
    //     age : 28,
    //     isActive : 0
    // }]

    const [data,setData] = useState([]);
    const [show, setShow] = useState(false);

    const [name,setName] = useState('');
    const [age,setAge] = useState('');
    const [isactive,setIsActive] = useState(0);

    const [editId,setEditId] = useState('');
    const [editName,setEditName] = useState('');
    const [editAge,setEditAge] = useState('');
    const [editIsactive,setEditIsActive] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=> {
        // setData(employeeData);
        getdata();
    },[]);

    const getdata = () =>{
        axios.get("https://localhost:7282/api/Employee").then((result)=>{
            setData(result.data)
        }).catch((error)=>{
            console.log(error);
        })
    }

    const handleSave = () =>{
        const url = "https://localhost:7282/api/Employee";
        const postData = {
            "name": name,
            "age": age,
            "isActive": isactive
        }

        axios.post(url,postData).then((result)=>{
            getdata();
            clear();
            toast.success('Employee has been added');
        }).catch((error)=>{
            toast.error(error);
        })
    }

    const handleActiveChange = (e) =>{
        if (e.target.checked) {
            setIsActive(1);
        }
        else{
            setIsActive(0);
        }
    }

    const handleEditActiveChange = (e) =>{
        if (e.target.checked) {
            setEditIsActive(1);
        }
        else{
            setEditIsActive(0);
        }
    }

   
    const handleEdit = (id) => {
        handleShow();
        axios.get(`https://localhost:7282/api/Employee/${id}`).then((result)=>{
                setEditName(result.data.name);
                setEditAge(result.data.age);
                setEditIsActive(result.data.isActive);
                setEditId(id);
            }).catch((error)=>{
                toast.error(error);
            })
    }

    const handleDelete = (id) => {
        if(window.confirm("Are you sure you want to delete") === true)
        {
            axios.delete(`https://localhost:7282/api/Employee/${id}`).then((result)=>{
                if(result.status == 200)
                {
                    toast.success('Employee has been deleted');
                    getdata();
                }
            }).catch((error)=>{
                toast.error(error);
            })
        }
    }

    const handleUpdate = () =>{
        debugger
        const url = `https://localhost:7282/api/Employee/${editId}`;
        const postData = {
            "id":editId,
            "name": editName,
            "age": editAge,
            "isActive": editIsactive
        }

        axios.put(url,postData).then((result)=>{
            debugger
            handleClose();
            getdata();
            clear();
            toast.success('Employee has been updated');
        }).catch((error)=>{
            debugger
            toast.error(error);
        })
    }

    const clear = () =>{
        setName('');
        setAge('');
        setIsActive(0);
        setEditName('');
        setEditAge('');
        setEditIsActive(0);
    }

    return(
        <Fragment>
            <ToastContainer/>
            <Container className='mt-4'>
            <Row>
                <Col>
                    <input type='text' className='form-control' placeholder='Enter your name'
                    value={name} onChange={(e) => setName(e.target.value)}/>
                </Col>
                <Col>
                    <input type='text' className='form-control' placeholder='Enter your age'
                    value={age} onChange={(e) => setAge(e.target.value)}></input>
                </Col>
                <Col>
                    <input type='checkbox'
                    checked={isactive === 1 ? true : false} 
                    value={isactive}
                    onChange={(e) => handleActiveChange(e)}></input>
                    <label>Active</label>
                </Col>
                <Col>
                <button className='btn btn-primary' onClick={(e)=> handleSave(e)}>Submit</button>
                </Col>
            </Row>
            
            </Container>
            
            <Table striped bordered hover className='mt-4'>
            <thead>
                <tr>
                <th>#</th>
                <th>Name</th>
                <th>Age</th>
                <th>Active</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                { 
                    data && data.length > 0 ? 
                        data.map((item,i) => {
                            return(
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.age}</td>
                                    <td>{item.isActive}</td>
                                    <td colSpan={2}>
                                        <button className='btn btn-primary' onClick={()=>handleEdit(item.id)}>Edit</button> &nbsp;
                                        <button className='btn btn-danger' onClick={()=>handleDelete(item.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                }) : 'Loading....' 
                }
                
            </tbody>
            </Table>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Modify / Update Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Row>
                <Col>
                    <input type='text' className='form-control' placeholder='Enter your name'
                    value={editName} onChange={(e) => setEditName(e.target.value)}/>
                </Col>
                <Col>
                    <input type='text' className='form-control' placeholder='Enter your age'
                    value={editAge} onChange={(e) => setEditAge(e.target.value)}></input>
                </Col>
                <Col>
                    <input type='checkbox'
                    checked={editIsactive === 1 ? true : false} 
                    value={editIsactive}
                    onChange={(e) => handleEditActiveChange(e)}></input>
                    <label>Active</label>
                </Col>
            </Row>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleUpdate()}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default CRUD;
