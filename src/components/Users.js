import React, { useState, useEffect } from 'react';
import { Row, Card, CardBody, CardHeader, Badge, Collapse } from 'reactstrap';
import axios from 'axios';
import FetchItems from './FetchItems';
import FetchItemName from './FetchItemName';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import AddUserModal from './UserModal';



const UserCard = ({ userURL, itemList }) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [user, setUser] = useState({});
    useEffect(() => {
        const fetchItem = () => {
            axios
                .get(userURL, {
                    'headers': {
                        'Authorization': "Token " + localStorage.getItem('token'),
                    }
                })
                .then(res => {
                    setUser(res.data);
                }).catch(err => {
                    console.log(err.response.data)
                });
        };
        fetchItem();
    }, [userURL]);

    const itemNames = FetchItemName(user.items, itemList);
    const downArrow = <FontAwesomeIcon icon={faChevronDown} />;
    const upArrow = <FontAwesomeIcon icon={faChevronUp} />;

    
    return (
        <Card className="mb-2 shadow-sm">

            <CardHeader className="py-4 bg-white clearfix" style={{cursor: "pointer"}} onClick={toggle}>
                {user.name}
                <span className="float-right">
                    {isOpen ? upArrow : downArrow}
                </span>
            </CardHeader>
                
            <Collapse isOpen={isOpen}>
                <CardBody className="p-4 bg-light">
                    <div>
                        {itemNames.map(name => (
                            <Badge key={name.toString()} className="mx-2" color="secondary" pill>
                                {name}
                            </Badge>
                        ))}
                    </div>
                </CardBody>
            </Collapse>

        </Card>
    );

};


const Users = ({ usersList, addUser, items, id }) => {
    
    const itemList = FetchItems(items);

    const displayList =
        usersList.map(userURL => (
            <UserCard key={userURL.toString()} itemList={itemList} userURL={userURL} />
        ));
    const emptyMsg = <div className="text-center shadow-sm p-3 bg-light rounded">No users added</div>;
    

    return (
        <>
            <Card className="my-3 shadow-sm">
                <CardBody>

                    <Row className="px-3">
                        <h2 className="m-0">Users</h2>
                        <AddUserModal billId={id} addItems={addUser} itemList={itemList} />
                    </Row>

                    <hr />
                    
                    {usersList.length > 0 ? displayList : emptyMsg}
                    
                </CardBody>
            </Card>
        </>
    );

};


export default Users;