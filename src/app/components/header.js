import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-teal-400 text-amber-300 p-8 flex flex-wrap justify-between items-start">
            <div>
                <h1 className="text-4xl font-bold my-1">Angel's Share Bar Book</h1>
            </div>
            <nav className="flex space-x-12 mt-12 pt-7">
                <div className="text-amber-300 text-end font-bold underline hover:text-blue-300">
                    <Link href="/">Home</Link>
                </div>
                <div className="text-amber-300 text-end font-bold underline hover:text-blue-300">
                    <Link href="/search">Search</Link>
                </div>
                <div className="text-amber-300 text-end font-bold underline hover:text-blue-300">
                    <Link href="/add-recipe">Add Recipe</Link>
                </div>
                <div className="text-amber-300 text-end font-bold underline hover:text-blue-300">
                    <Link href="/about" >About</Link>
                </div>
            </nav>
        </header>
    );
}