/* eslint-disable react/prop-types */
import { getInitialName } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
  if (!userInfo) return null;

  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        {getInitialName(userInfo.fullName)}
      </div>

      <div className="flex items-center gap-3">
        <p className="text-sm font-medium">{userInfo.fullName}</p>
        <button
          className="text-sm text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded cursor-pointer"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
