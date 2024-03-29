import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-blue-500 text-white p-8 flex flex-wrap justify-between items-start">
            <div>
                <h1 className="text-4xl font-bold my-1">Angel's Share Bar Book</h1>
                <p className="mt-2">Because Vince said so!</p>
            </div>
            <nav className="flex space-x-12 mt-12 pt-7">
                <div className="text-white text-end underline hover:text-blue-300">
                    <Link href="/search">Search</Link>
                </div>
                <div className="text-white text-end underline hover:text-blue-300">
                    <Link href="/about" >About</Link>
                </div>
            </nav>
        </header>
    );
}