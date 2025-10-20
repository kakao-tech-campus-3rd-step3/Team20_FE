interface UserProfileProps {
  email: string;
  nickname: string;
}

export const UserProfile = ({ email, nickname }: UserProfileProps) => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-semibold text-gray-900">{nickname}</h1>
          <p className="text-[15px] text-gray-500">{email}</p>
        </div>
      </div>
    </div>
  );
};
