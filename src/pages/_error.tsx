'use clinet'

import Layout from "@/components/Layout";
import { NextPageContext } from "next";

interface ErrorProps {
  statusCode?: number;
}

function Error({ statusCode, reset }:{ statusCode : ErrorProps, reset: ()=> void }) {
  return (
    <Layout>
      <p>
        {statusCode
          ? `에러 코드${statusCode}`
          : '클라이언트 에러'}
      </p>
      <button onClick={()=> reset()}></button>
    </Layout>
    
  )
}
 
Error.getInitialProps = ({ res, err } : NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}
 
export default Error