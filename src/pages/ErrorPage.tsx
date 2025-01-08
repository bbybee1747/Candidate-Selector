// ErrorPage.tsx
import { useNavigate } from "react-router-dom";
import styles from "./ErrorPage.module.css";

interface ErrorPageProps {
  message?: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ message }) => {
  const navigate = useNavigate();

  return (
    <section className={styles["error-page"]}>
      <h1>404: Page Not Found</h1>
      <p className={styles["error-message"]}>¯\_(ツ)_/¯</p>
      {message && <p className={styles["detailed-error"]}>{message}</p>}
      <button className={styles["back-button"]} onClick={() => navigate(-1)}>
        Go Back
      </button>
      <button className={styles["home-button"]} onClick={() => navigate("/")}>
        Go to Home
      </button>
    </section>
  );
};

export default ErrorPage;
