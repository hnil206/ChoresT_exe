'use client'
import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';

const Admin = () => {
    const router = useRouter()
    const handleBtn = () => {
        router.push("/")
    }
    return (
        <div>
            <h1>Admin Page</h1>
            <div>
                <Button variant='danger'>Dangerous</Button>
                <button onClick={() => handleBtn()}>Back Homepage</button>
            </div>
        </div>
    );
};

export default Admin;