import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

export const AddContact = () => {
    const { actions } = React.useContext(Context);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone: '',
        email: ''
    });
  
    const navigate= useNavigate();

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await fetch('https://playground.4geeks.com/contact/agendas/Daniel1/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Failed to add contact');
            };
            await actions.loadContactsData();
            navigate('/');
            
        } catch (error) {
            console.error('Error adding contact:', error);
        }
    };

    return (
        <div className="container card mt-4 w-50">
            <h1 className="pt-2 px-2">Add New contact</h1>
            <form className="px-2" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="FullName" className="form-label">
                        Full Name
                    </label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        id="FullName"
                        aria-describedby=""
                    ></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">
                        Email address
                    </label>
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        className="form-control"
                        id="Email"
                        aria-describedby="emailHelp"
                    ></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="Phone" className="form-label">
                        Phone
                    </label>
                    <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        type="number"
                        className="form-control"
                        id="Phone"
                        aria-describedby=""
                    ></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="Address" className="form-label">
                        Address
                    </label>
                    <input
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        id="Address"
                        aria-describedby=""
                    ></input>
                </div>

                <button type="submit" className="btn btn-primary">
                    Create Contact
                </button>
            </form>
            <Link to={'/'} className="mt-2 pb-2 px-2">
                Go back to contact list
            </Link>
        </div>
    );
};