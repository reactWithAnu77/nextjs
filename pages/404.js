import Link from "next/link";
const ErrorPage=()=>{
    return <>
    <h1>404 Error Found</h1>
    <Link href="/">
      <button>Back to home</button> 
    </Link>
    </>
}
export default ErrorPage;