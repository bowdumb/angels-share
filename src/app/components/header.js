import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-blue-500 text-white text-start p-8">
            <h1 className="text-4xl font-bold">Angel's Share Bar Book</h1>
            <p className="mt-2">Because Vince said so!</p>
            <div className="text-white text-end underline">
                <Link href="/about" >
                    About
                </Link>
            </div>
        </header>
    );
}