import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const DateTask = () => {
    const [data, setData] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [due_date, setDate] = useState('');

    const params = useParams();

    useEffect(() => {
        fetch(`http://localhost/pupsiks/back-end/getTaskByID.php?id=${params.id}`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setTitle(data[0].title);
                setDescription(data[0].description);
                setDate(data[0].due_date);
            })
            .catch((error) => console.log('Error fetching data:', error));
    }, [params.id]);

    return (
        <div>
            <h2>Task Details</h2>
            <p>Title: {title}</p>
            <p>Description: {description}</p>
            <p>Due Date: {due_date}</p>
            <Link to="/">Go Back</Link>
        </div>
    );
};

export default DateTask;
