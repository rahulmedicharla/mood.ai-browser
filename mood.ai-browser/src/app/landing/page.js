import Link from 'next/link'

export default function Landing(){
    return (
        <div>
            <Link href = "/signup">Signup</Link>
            <Link href = "/login">Login</Link>
        </div>
    )
}