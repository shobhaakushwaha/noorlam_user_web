"use client";

import Link from "next/link";

export default function NotFound() {
    return (
        <div className="notfound text-center">
            <h1>404</h1>
            <p>Oops! Page not found</p>

            <Link href="/" className="btn">
                Go to Home
            </Link>
        </div>
    );
}