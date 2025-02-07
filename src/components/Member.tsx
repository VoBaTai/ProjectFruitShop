import { ImgHTMLAttributes } from "react";

type imgAttribute = ImgHTMLAttributes<HTMLImageElement>;
interface Props extends imgAttribute {
  alt: string;
  src: string;
  nameMember: string;
  description: string;
}

const Member: React.FC<Props> = ({
  alt,
  src,
  nameMember,
  description,
  ...others
}) => {
  return (
    <div className="col-lg-4 py-3">
      <div className="team-member d-flex flex-column justify-content-center align-items-center">
        <img
          className="mx-auto rounded-circle"
          src={src}
          alt={alt}
          style={{ height: "200px" }}
        />
        <h4 className="text-center">{nameMember}</h4>
        <p className="text-muted">{description}</p>
        <div>
          <a
            className="btn btn-dark btn-social mx-2"
            href="#!"
            aria-label="Parveen Anand Twitter Profile"
          >
            <i className="fab fa-twitter" />
          </a>
          <a
            className="btn btn-dark btn-social mx-2"
            href="/#"
            aria-label="Parveen Anand Facebook Profile"
          >
            <i className="fab fa-facebook-f" />
          </a>
          <a
            className="btn btn-dark btn-social mx-2"
            href="/#"
            aria-label="Parveen Anand LinkedIn Profile"
          >
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
      </div>
    </div>
  );
};
export default Member;
