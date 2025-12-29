import { usePWAInstall } from '@/hooks/usePWAInstall';
import { IconX, IconDownload } from '@tabler/icons-react';

const PWAInstallPrompt = () => {
  const { showPrompt, handleInstallClick, handleDismiss } = usePWAInstall();

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:bottom-6 md:left-6 md:max-w-sm">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
        {/* Header dengan close button */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-base">Install Yokila</h3>
            <p className="text-gray-600 text-sm mt-1">
              Tambahkan aplikasi ke layar utama untuk akses lebih cepat
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="ml-2 p-1 hover:bg-gray-100 rounded-lg transition flex-shrink-0"
            aria-label="Close"
          >
            <IconX size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleDismiss}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition font-medium text-sm"
          >
            Nanti
          </button>
          <button
            onClick={handleInstallClick}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm flex items-center justify-center gap-2"
          >
            <IconDownload size={16} />
            Install
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
