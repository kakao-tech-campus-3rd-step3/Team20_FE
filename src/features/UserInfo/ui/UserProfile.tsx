interface UserProfileProps {
  email: string;
  nickname: string;
}

export const UserProfile = ({ email, nickname }: UserProfileProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50">
      <div className="relative max-w-7xl mx-auto px-8 py-12">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/5 to-brand-tertiary/5"></div>
        <div className="relative flex items-center gap-6">
          <div className="w-20 h-20 bg-gradient-to-br from-brand-primary to-brand-tertiary rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {nickname.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{nickname}</h1>
            <p className="text-gray-600 text-lg">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
