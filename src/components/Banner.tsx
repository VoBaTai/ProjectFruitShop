interface Prop {
  nameWeb: string;
  description?: string;
  style?: React.CSSProperties;
}
const Banner: React.FC<Prop> = ({
  nameWeb,
  description = "",
  style = {},
  ...others
}) => {
  return (
    <>
      <div className="container px-4 px-lg-5">
        <header className="py-5" style={style}>
          <div className="container px-4 px-lg-5 my-5">
            <div className="text-center text-white">
              <h1 className="display-4 fw-bolder">{nameWeb}</h1>
              <p className="lead fw-normal text-white-50 mb-0">{description}</p>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};
export default Banner;
