import { useRouter } from 'next/navigation';

export default function addRecipeNav() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/add-recipe');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <button
                onClick={handleClick}
                className="border border-blue-500, hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded"
            >
            </button>

        </div>
    )
}