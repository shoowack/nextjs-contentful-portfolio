import Link from "next/link";
import ContentfulImage from './contentful-image'
import styles from './../styles/front-page.module.scss'

export default function FrontPage({
  sys: { id },
  link,
  openInNewTab,
  title,
  subscript,
  superscript,
  backgroundImage: {
    url
  }
}) {
  return (
    <>
      <Link
        href={link}
        key={id}
      >
        <a
          className={styles["section"]}
          target={openInNewTab ? "_blank" : ""}
        >
        {title && subscript && (
          <div className={styles["section-title"]}>
            {title && <h1>{title}</h1>}
            {subscript && <h3>{subscript}</h3>}
          </div>
        )}
        {superscript && (
          <div className={styles["section-description"]}>
            <p>{superscript}</p>
          </div>
        )}
        {url && <ContentfulImage
          src={url}
          layout="fill"
          // height="100%"
          // width="30%"
          // layout="responsive"
          className={styles["section-bg-img"]}
        />}
        </a>
      </Link>
    </>
  );
}
