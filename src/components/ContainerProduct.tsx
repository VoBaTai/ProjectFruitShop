import { ImgHTMLAttributes } from "react";
import { Link } from "react-router-dom";
type imageAttribute = ImgHTMLAttributes<HTMLImageElement>;
interface PropsImage extends imageAttribute {
  alt: string;
  src: string;
  price: string;
  name: string;
  className?: string;
  lienKet?: string;
}
const ContainerProducts: React.FC<PropsImage> = ({
  alt,
  src,
  price,
  name,
  lienKet = "",
  className = "",
  ...others
}) => {
  const classNameImage = `card-img-top ${className}`;
  return (
    <div className="col mb-5">
      <div className="card h-100">
        {/* Product image*/}
        <Link to="/detail">
          <img
            className={classNameImage}
            src={src}
            alt={alt}
            style={{ height: "200px" }}
          />
        </Link>

        {/* Product details*/}
        <div className="card-body p-4">
          <div className="text-center">
            {/* Product name*/}
            <Link
              to="/detail"
              className="text-decoration-none text-secondary hover:text-success"
            >
              <h5 className="fw-bolder ">{name}</h5>
            </Link>
            {/* Product price*/}
            {price} VNĐ
          </div>
        </div>
        {/* Product actions*/}
        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
          <div className="text-center">
            <button className="btn btn-outline-success mt-auto">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContainerProducts;
