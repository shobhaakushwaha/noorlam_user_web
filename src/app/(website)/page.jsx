'use client'

import Landing from "@/component/landing/Landing";
import { getToken } from "@/utils/cookie";
export default function Home() {
  // const token=getToken()
  // console.log('token', token)
  return (
    <>
      <Landing />
    </>
  );
}
