import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Home() {
    const [state, setState] = useState(0)
    const { user } = useAuth()

    return (
        <div className="text-red-700">
            hello
            <Link to={'/login'}>Login</Link>
            <button onClick={() => setState((prev) => prev + 1)}>Click {state}</button>
            {user && <div>{user.roles}</div>}
        </div>
    )
}

export default Home
