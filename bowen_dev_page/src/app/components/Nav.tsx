import Link from 'next/link';
import React from 'react';

const Nav: React.FC = () => {
  return (
    <nav style={{ marginBottom: '20px' }}>
      <Link href="/">Home</Link> |{" "}
      <Link href="/about">About</Link> |{" "}
      <Link href="/contact">Contact</Link>
    </nav>
  );
};

export default Nav;
