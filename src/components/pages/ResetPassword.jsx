import { useEffect } from 'react';

const ResetPassword = () => {
    useEffect(() => {
        const { ApperUI } = window.ApperSDK;
        ApperUI.showResetPassword('#authentication-reset-password');
    }, []);

    return (
        <div className="flex-1 py-12 px-5 flex justify-center items-center min-h-screen bg-gradient-to-br dark:from-[#0f0e17] dark:via-[#1a1625] dark:to-[#0f0e17] light:from-white light:via-purple-50 light:to-purple-100">
            <div id="authentication-reset-password" className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm shadow-2xl mx-auto w-[400px] max-w-full p-10 rounded-2xl"></div>
        </div>
    );
};

export default ResetPassword;