import Link from "next/link";
import { Fragment } from "react";

export default function NavBar() {
  return (
    <Fragment>
      <Link href="/" className="flex items-center gap-2 hover:underline hover:underline-offset-4">
        Home
      </Link>
      <Link href="/players" className="flex items-center gap-2 hover:underline hover:underline-offset-4">
        Players
      </Link>
      <Link href="/weekly_score" className="flex items-center gap-2 hover:underline hover:underline-offset-4">
        Weekly Score
      </Link>
    </Fragment>
  );
}
