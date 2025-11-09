import React, { useState, useEffect } from 'react';
import { EXERCISE_SECTIONS, LOGO_URL, TEXTS, WELCOME_IMAGE_URL, WILAYAS } from './constants';
import { Language, Role, User } from './types';
import Exercises from './components/ReadingExercise';

// --- Authentication Components ---

const AuthForm: React.FC<{
  language: Language;
  isLogin: boolean;
  onAuthSuccess: (user: User) => void;
  toggleForm: () => void;
}> = ({ language, isLogin, onAuthSuccess, toggleForm }) => {
  const texts = TEXTS[language];
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    workplace: '',
    wilaya: '',
    role: 'therapist' as Role,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    console.log(`${isLogin ? 'Logging in' : 'Signing up'} with:`, formData);
    const mockUser: User = {
      email: formData.email,
      firstName: isLogin ? 'Mock' : formData.firstName,
      lastName: isLogin ? 'User' : formData.lastName,
      role: formData.role,
      workplace: formData.workplace,
      wilaya: formData.wilaya
    };
    onAuthSuccess(mockUser);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 via-green-50 to-yellow-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6 transform transition-all hover:scale-105">
        <div className="text-center">
          <img src={LOGO_URL} alt="Logo" className="w-20 h-20 mx-auto mb-4 rounded-full shadow-lg" />
          <h2 className="text-3xl font-bold font-cairo text-dark">
            {isLogin ? texts.loginTitle : texts.signupTitle}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="flex gap-4">
                <input type="text" name="firstName" placeholder={texts.firstName} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" onChange={handleChange} />
                <input type="text" name="lastName" placeholder={texts.lastName} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" onChange={handleChange} />
              </div>
               <div className="flex items-center gap-2 text-dark font-semibold">
                <span>{texts.role}:</span>
                <label className="flex items-center gap-1 cursor-pointer">
                    <input type="radio" name="role" value="therapist" checked={formData.role === 'therapist'} onChange={handleChange} className="form-radio text-primary focus:ring-primary"/>
                    {texts.therapist}
                </label>
                 <label className="flex items-center gap-1 cursor-pointer">
                    <input type="radio" name="role" value="parent" checked={formData.role === 'parent'} onChange={handleChange} className="form-radio text-primary focus:ring-primary"/>
                    {texts.parent}
                </label>
              </div>
              {formData.role === 'therapist' && (
                <>
                    <input type="text" name="workplace" placeholder={texts.workplace} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" onChange={handleChange} />
                    <select name="wilaya" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" onChange={handleChange}>
                        <option value="">{texts.selectWilaya}</option>
                        {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
                    </select>
                </>
              )}
            </>
          )}
          <input type="email" name="email" placeholder={texts.email} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" onChange={handleChange} />
          <input type="password" name="password" placeholder={texts.password} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary" onChange={handleChange} />
          <button type="submit" className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-transform transform hover:scale-105">
            {isLogin ? texts.login : texts.signup}
          </button>
        </form>
        <p className="text-center text-sm text-dark">
          {isLogin ? texts.noAccount : texts.haveAccount}{' '}
          <button onClick={toggleForm} className="font-semibold text-secondary hover:underline">
            {isLogin ? texts.createAccount : texts.login}
          </button>
        </p>
      </div>
    </div>
  );
};


const WelcomeScreen: React.FC<{ onContinue: () => void, onLoginClick: () => void, language: Language }> = ({ onContinue, onLoginClick, language }) => {
    const texts = TEXTS[language];
    return (
        <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-yellow-100 via-green-50 to-yellow-100 p-4">
            <header className="w-full flex justify-between items-center p-4">
                 <img src={LOGO_URL} alt="Ortholink Logo" className="h-12 w-auto" />
                 <button onClick={onLoginClick} className="font-bold text-secondary text-lg">{texts.loginTitle}</button>
            </header>
            <main className="flex flex-col items-center text-center">
                 <img src={WELCOME_IMAGE_URL} alt="Child Learning" className="w-full max-w-lg mb-8" />
            </main>
            <footer className="w-full text-center p-4">
                 <button onClick={onContinue} className="text-2xl font-bold text-dark hover:text-secondary transition-colors">
                    {texts.letsGo}
                </button>
            </footer>
        </div>
    );
};


// --- Main App Component ---

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<Language>('ar');
  const [authScreen, setAuthScreen] = useState<'login' | 'signup'>('login');
  const [showWelcome, setShowWelcome] = useState(true);

  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'ar' ? 'en' : 'ar'));
  };
  
  const handleLogout = () => {
      setUser(null);
      setShowWelcome(true);
  };
  
  const handleAuthSuccess = (authedUser: User) => {
      setUser(authedUser);
  };

  const handleWelcomeContinue = () => {
      setShowWelcome(false);
      setAuthScreen('signup');
  };
  
  const handleLoginClick = () => {
      setShowWelcome(false);
      setAuthScreen('login');
  };
  
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);


  if (showWelcome && !user) {
      return <WelcomeScreen onContinue={handleWelcomeContinue} onLoginClick={handleLoginClick} language={language} />;
  }

  if (!user) {
    return (
      <AuthForm
        language={language}
        isLogin={authScreen === 'login'}
        onAuthSuccess={handleAuthSuccess}
        toggleForm={() => setAuthScreen(prev => (prev === 'login' ? 'signup' : 'login'))}
      />
    );
  }

  const texts = TEXTS[language];
  const isRtl = language === 'ar';

  return (
    <div className={`bg-gradient-to-br from-yellow-100 via-green-50 to-yellow-100 min-h-screen font-sans text-dark`}>
      <header className="bg-primary text-white p-4 shadow-md flex justify-between items-center sticky top-0 z-50 h-20">
        <div className="flex items-center gap-4">
          <img src={LOGO_URL} alt="Ortholink Logo" className="h-12 w-12 rounded-full bg-white p-1 shadow-md" />
          <h1 className="text-2xl font-bold font-cairo">{texts.appName}</h1>
        </div>
         <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
              {language === 'ar' ? 'English' : 'العربية'}
            </button>
            <button
              onClick={handleLogout}
              className="bg-secondary hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
            >
                {texts.logout}
            </button>
        </div>
      </header>

      <main className="p-4 md:p-8 pt-8">
        <div className="text-center mb-10">
            <h2 className="text-4xl font-bold font-cairo text-dark">{texts.welcome}, {user.firstName}!</h2>
            <p className="text-gray-600 text-lg">{user.role === 'therapist' ? texts.therapistDashboard : texts.parentDashboard}</p>
        </div>
        
        <h2 className="text-3xl font-bold text-dark text-center mb-4">{texts.readingStage}</h2>
        <Exercises language={language} />
      </main>

      <footer className="text-center p-4 bg-gray-200/50 text-gray-600 mt-8">
        <p>&copy; 2024 Ortholink. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
