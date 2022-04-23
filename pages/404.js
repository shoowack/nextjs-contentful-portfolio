import { useRouter } from "next/router";
import Link from "next/link";

export default function Custom404({fullUrl}) {
    const router = useRouter();

    console.log(fullUrl);

    return (
        <>
            <p className="mb-2">Something went wrong, we have nothing on:</p>
            {/* <mark className="font-weight-bold d-inline">{window.location.href}</mark> */}
            <p className="mt-5">
                You may find what you were looking for on our{' '}
                <Link href="/">
                    Homepage
                </Link>
            </p>
        </>
    )
}

// function getFullUrl(req, fallback) {
//     //server side request object(req)
//     if(req) {
//       return req.protocol + '://' + req.get('host') + req.originalUrl
      
//     } //making sure we are on the client side
//     else if(!(typeof window === 'undefined')) {
//       return window.location.href
      
//     } else {
//       return fallback
//     }
//   }

//   Custom404.getInitialProps = async ({ req }) => {
//      let fullUrl = getFullUrl(req, "")//gets the full url or fallback to ""
//       return { fullUrl: fullUrl }
//   }