import Link from 'next/link';
import Container from '@components/Container';
import HeaderInfoLink from '@components/header-info-link';

export default function Navigation({ headerItems }) {
  return (
    <div className="aboutme py-md-5 py-4">
      <Container>
        <div className="flex flex-col justify-between md:flex-row">
          <div className="flex items-center justify-between">
            <Link href="/" passHref>
              <img
                src="./back_arrow.svg"
                alt="Go back"
                className="back-button mr-2 h-10 w-10 rounded p-2 opacity-30 transition-all duration-200 ease-in-out hover:cursor-pointer hover:bg-white/10 hover:opacity-70 md:mr-4"
              />
            </Link>
            <div className="flex items-center">
              <h1 className="text-[2rem] font-black md:text-7xl">Ivan Suvak Martinovic</h1>
            </div>
          </div>
          <div className="header-info-links mt-2 flex items-center justify-end">
            {headerItems?.map((headerLink) => (
              <HeaderInfoLink {...headerLink} key={headerLink.sys.id} />
            ))}
          </div>
        </div>
        <p className="mt-4">
          Front-End Web Designer, iOS and Android Mobile App Designer, UX/UI, WordPress,
          Photographer Currently in Ottawa, Canada, looking for a new and challenging position as a
          Front-end developer or UI/UX designer where I can create digital magic and elevate user
          experience to the next level.
        </p>
        <p className="mt-4">
          <strong>Closed work permit holder</strong> willing to relocate anywhere in Canada.
        </p>
      </Container>
    </div>
  );
}
