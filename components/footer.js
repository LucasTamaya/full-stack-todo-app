import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  return (
    <footer>
      <a
        href="https://github.com/LucasTamaya/full-stack-todo-app"
        target="_blank"
      >
        <GitHubIcon />
      </a>
      <a
        href="https://www.linkedin.com/in/lucas-tamaya-41a09621b/"
        target="_blank"
      >
        <LinkedInIcon />
      </a>
    </footer>
  );
};

export default Footer;
