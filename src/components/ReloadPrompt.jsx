import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { RefreshCw, X } from 'lucide-react';

export function ReloadPrompt() {
    const {
        offlineReady: [offlineReady, setOfflineReady],
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegistered(r) {
            // eslint-disable-next-line
            console.log('SW Registered: ' + r);
        },
        onRegisterError(error) {
            // eslint-disable-next-line
            console.log('SW registration error', error);
        },
    });

    const close = () => {
        setOfflineReady(false);
        setNeedRefresh(false);
    };

    if (!offlineReady && !needRefresh) {
        return null;
    }

    return (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-[90%] max-w-sm bg-indigo-900 text-white p-4 rounded-xl shadow-2xl z-50 flex flex-col gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h3 className="font-bold text-sm mb-1">
                        {offlineReady ? 'App is ready for offline use' : 'New content available!'}
                    </h3>
                    <p className="text-xs text-indigo-200">
                        {offlineReady
                            ? 'You can use the app without an internet connection.'
                            : 'Click the button below to update to the latest version.'}
                    </p>
                </div>
                <button
                    onClick={close}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                    aria-label="Close"
                >
                    <X size={16} />
                </button>
            </div>

            {needRefresh && (
                <button
                    onClick={() => updateServiceWorker(true)}
                    className="bg-white text-indigo-900 px-4 py-2 rounded-lg text-sm font-bold active:scale-95 transition-transform flex items-center justify-center gap-2"
                >
                    <RefreshCw size={16} />
                    Refresh & Update
                </button>
            )}
        </div>
    );
}
