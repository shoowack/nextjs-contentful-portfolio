import {useRouter} from "next/router";
import Link from "next/link";

export default function Custom404() {
  const router = useRouter();

  return (<div className="d-flex flex-column w-100 vh-100 justify-content-center align-items-center">
    <p>Something went wrong, we have nothing on:</p>
    <p>
      <code className="font-weight-bold d-inline">{router.asPath}</code>
    </p>
    <p>
      You may find what you were looking for on our{" "}
      <Link href="/">Homepage</Link>
    </p>
  </div>);
}
