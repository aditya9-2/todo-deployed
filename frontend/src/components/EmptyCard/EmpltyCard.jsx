/* eslint-disable react/prop-types */

const EmpltyCard = ({ imgSrc, message }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src={imgSrc} alt="no notes" className="w-80 opacity-35" />
      <p className="w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5">
        {message}
      </p>
    </div>
  );
};

export default EmpltyCard;
