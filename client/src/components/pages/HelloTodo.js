import React from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';

const HelloTodo = () => {
    const getListItems = (values) => {
        return (
            <React.Fragment>
                {values.map(value => {
                    return (
                        <li key={value} style={{padding: '4px'}}><i className="fas fa-check-circle"></i> {value}</li>
                    )
                })}
            </React.Fragment>
        )
    }

    return (
        <div>
            <Header />
            <div style={{padding: '20px'}}>
                <h2 style={{padding: '5px'}}>This is TODO managing application which we call Task Management</h2>
                <h4 style={{padding: '5px'}}>Here you can perform the below tasks</h4>
                <ul style={{listStyleType: 'none', marginLeft: '20px',padding:'10px'}}>
                    {
                        getListItems([
                            'Add new todos',
                            'Add specific labels to your todos',
                            'You can also mark your tasks as New, In Progress and Complete',
                            'Each todo has due date by default todo will have to due date of today',
                            'You can also delete the todos',
                            'Manage your labels added to your todos currently we support these labels only:'
                        ])
                    }
                    <ul style={{marginLeft: '30px',listStyleType: 'none'}}>
                        {
                            getListItems([
                                'Personal',
                                'Work',
                                'Shopping',
                                'Others'
                            ])
                        }
                    </ul>
                    {
                        getListItems(["If you don't have account then click on Register",
                        "If you already have account click on login to proceed"])
                    }
                </ul>
                <h4 style={{textAlign: 'center'}}>Happy Coding!!!</h4>
            </div>
            <Footer />
        </div>
    )
}

export default HelloTodo;
