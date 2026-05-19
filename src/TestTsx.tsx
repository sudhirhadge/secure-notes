type TestTsxProps = {
    title: string
    count?: number
}

export default function TestTsx({
    title,
    count = 0,
}: TestTsxProps) {
    return (
        <div
            style={{
                padding: '16px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                width: '200px',
                textAlign: 'center',
                margin: '16px auto',
            }}
        >
            <h2>{title}</h2>
            <p>Count: {count}</p>
        </div>
    )
}