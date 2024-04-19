import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Routers = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleAllTask = () => {
        navigate('/');
    };

    const handleAssignedTask = () => {
        navigate('/assignedtask');
    };

    const handleMyTask = () => {
        navigate('/mytask');
    };

    const createtask = () => {
        navigate('/createtask');
    };

    return (
        <div style={{ display: 'flex', gap: '30px', marginLeft: '20px', marginTop: '20px' }}>
            {location.pathname !== '/login' && (
                <button className='navigator-btn' onClick={handleAllTask}>
                    All TASK
                </button>
            )}
           {location.pathname !== '/login' && (
                <button className='navigator-btn' onClick={handleAssignedTask}>
                    ASSIGNED TASK
                </button>
            )}
              {location.pathname !== '/login' && (
                <button className='navigator-btn' onClick={handleMyTask}>
                    MY TASK
                </button>
            )}
                {location.pathname !== '/login' && (
            <button onClick={createtask} className='navigator-btn'>
                CREATE TASK
            </button>
             )}
        </div>
    );
};

export default Routers;
