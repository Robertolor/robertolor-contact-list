import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import rigoImage from "../../img/rigo-baby.jpg";
import { FaPencilAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import "../../styles/contact.css";

export const ContactCard = () => {
    const { store, actions } = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [contactToDelete, setContactToDelete] = useState(null);

    const handleDeleteClick = (contactId) => {
        setShowModal(true);
        setContactToDelete(contactId);
    };

    const deleteContact = async () => {
        try {
            const res = await fetch(`https://playground.4geeks.com/contact/agendas/Daniel1/contacts/${contactToDelete}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (res.ok) {
                await actions.loadContactsData();
                handleModalClose();
            } else {
                throw new Error("Error al eliminar el contacto");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            handleModalClose();
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
        setContactToDelete(null);
    };
    
    return (
        <div>
            <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Delete Contact</h5>
                            <button type="button" className="btn-close" onClick={handleModalClose}></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this contact?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={deleteContact}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container d-flex flex-column">
                <div className="m-3 flex-end align-self-end">
                    <Link to={"/add-contact"}>
                        <button type="button" className="btn btn-success">Add new Contact</button>
                    </Link>
                </div>
                <div>
                    <div>
                        <ul>
                            {store.contacts.map((item, index) => {
                                return (
                                    <div key={index} className="card container">
                                        <li className="d-flex justify-content-between">
                                            <div className="d-flex">
                                                <div>
                                                    <img src={rigoImage} alt="Contact"></img>
                                                </div>
                                                <div className="m-2">
                                                    <p className="mx-2 fs-4 text text-dark">{item.name}</p>
                                                    <p className="text-secondary"><FaPhone className="mx-2" />Phone: {item.phone}</p>
                                                    <p className="text-secondary"><MdOutlineEmail className="mx-2" />Email: {item.email}</p>
                                                    <p className="text-secondary"><FaMapMarkerAlt className="mx-2" />Address: {item.address}</p>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <span className="px-2">
                                                    <Link to={`/update-contact/${item.id}`}><FaPencilAlt className="icons text-primary pt-2" /></Link>
                                                </span>
                                                <button className="delete" onClick={() => handleDeleteClick(item.id)}><MdDeleteForever className="icons-garbage text-danger pt-2" /></button>
                                            </div>
                                        </li>
                                    </div>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
