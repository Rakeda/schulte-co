import styles from "./FigureHeader.module.css";

type Props = {
  no: string;
  title: string;
  refText: string;
  night?: boolean;
};

/** The ruled figure header every section opens with: FIG. № · title · cross-reference. */
export default function FigureHeader({ no, title, refText, night }: Props) {
  return (
    <header className={`${styles.figH} ${night ? styles.night : ""}`.trim()}>
      <span className={styles.no}>{no}</span>
      <h2 className={`${styles.title} wipe`}>{title}</h2>
      <span className={styles.ref}>{refText}</span>
    </header>
  );
}
