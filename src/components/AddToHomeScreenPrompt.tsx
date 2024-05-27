import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const AddToHomeScreenPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any | null>(null);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        setDeferredPrompt(null);
        setShowPrompt(false);
      });
    }
  };

  const handleCloseClick = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="a2hs-prompt">
      <div className="a2hs-content">
        <span className="icon">
          <Image width={70} height={70} alt="icon" src="/assets/img/perfect.png" />
        </span>
        <p className="body-1">홈 화면에 '신조어 배우기' 앱을 추가하고 학습해보세요.</p>
        <button className="btn" onClick={handleInstallClick}>설치없이 앱으로 열기</button>
        <button className="caption" onClick={handleCloseClick}>오늘은 그냥 볼게요.</button>
      </div>
    </div>
  );
};

export default AddToHomeScreenPrompt;
