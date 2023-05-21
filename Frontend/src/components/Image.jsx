import { useEffect, useState } from 'react'

function Image(props) {
    const [isError, setError] = useState(false)

    useEffect(() => {
        setError(false)
    }, [props.src])

    return isError || !props.src ? (
        <img alt="error" {...props} src="/images/default-image.jpg" />
    ) : (
        <img alt="error" {...props} onError={(e) => setError(true)} />
    )
}

export default Image
