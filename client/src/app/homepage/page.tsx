import Link from "next/link";
import styles from './page.module.css'
export default function HomePage() {
  return (
    <div>
        <h1>Welcome to ChoreT</h1>
        <p>
          <Link href="/about">About ChoreT</Link>
        </p>
        <p>
          <Link href="/admin">Admin Page</Link>
        </p>
  
    </div>
  );
}

