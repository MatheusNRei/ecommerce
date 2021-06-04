
import React, {useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'

const Loading = () => {
    const [count,setCount] = useState(3)
    let history = useHistory()

    useEffect(()=>{
        const interval = setInterval(()=>{
        setCount((currentCount) => --currentCount);
        }, 1000);

        count === 0 && history.push('/')
        return () => clearInterval(interval);
    },[count])

return (<div className ="container p-5 text-center">
    <p>redirecionando você em {count} segundos</p>
</div>)
};

export default Loading;