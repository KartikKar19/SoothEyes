import React, { useState, useEffect } from 'react';
import { Sun, Moon, Sliders } from 'lucide-react';
declare const chrome: any;

const isExtension = (): boolean => typeof chrome !== 'undefined' && chrome.storage !== undefined;

function App() {
    const [intensity, setIntensity] = useState(50);
    const [isEnabled, setIsEnabled] = useState(true);

    useEffect(() => {
        if (isExtension()) {
            chrome.storage.sync.get(['intensity', 'isEnabled'], (result) => {
                if (result.intensity !== undefined) setIntensity(result.intensity);
                if (result.isEnabled !== undefined) setIsEnabled(result.isEnabled);
            });
        }
    }, []);

    const handleIntensityChange = (newIntensity: number) => {
        setIntensity(newIntensity);
        if (isExtension()) {
            chrome.storage.sync.set({ intensity: newIntensity }, () => {
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    chrome.tabs.sendMessage(tabs[0].id, { type: 'updateSettings', intensity: newIntensity });
                });
            });
        }
    };

    const toggleExtension = () => {
        const newState = !isEnabled;
        setIsEnabled(newState);
        if (isExtension()) {
            chrome.storage.sync.set({ isEnabled: newState }, () => {
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    chrome.tabs.sendMessage(tabs[0].id, { type: 'updateSettings', isEnabled: newState });
                });
            });
        }
    };

    return (
        <div className="w-80 p-4 bg-amber-50">
            {}
        </div>
    );
}

export default App;