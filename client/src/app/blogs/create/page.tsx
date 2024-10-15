import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation'; // Updated import
import Link from 'next/link';

const CreateBlog = dynamic(() => import('../../../components/CreateBlog'), {
  ssr: false,
});

export default function CreateBlogPage() {
  const router = useRouter(); // This will now work with the App Router

  const handleBlogCreated = () => {
    router.push('/blogs');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/blogs">
          <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
            Back to Blogs
          </button>
        </Link>
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <CreateBlog onBlogCreated={handleBlogCreated} />
      </div>
    </div>
  );
}
