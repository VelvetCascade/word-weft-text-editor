import { useState, useEffect } from "react";

type AnimationState = 'circle' | 'tick';
type PopupConfig = {
    circleToTickTime?: number;
    hidePopupTime?: number;
    textColor?: string;
    message?: string;
};

interface AnimatedPopupProps {
    show?: boolean;
    onFinish?: () => void;
    config?: PopupConfig;
}

const defaultConfig: PopupConfig = {
    circleToTickTime: 1500,
    hidePopupTime: 3000,
    textColor: "toolbar-icon-text",
    message: "Auto-Saved"
};

export const AnimatedPopup: React.FC<AnimatedPopupProps> = ({
                                                                show,
                                                                onFinish,
                                                                config = {}
                                                            }) => {
    const [animationState, setAnimationState] = useState<AnimationState>('circle');
    const mergedConfig = { ...defaultConfig, ...config };

    useEffect(() => {
        let circleToTickTimeout: number | undefined;
        let hidePopupTimeout: number | undefined;


        if (show) {
            // Reset animation state when popup is shown
            setAnimationState('circle');

            // Change to tick after specified time
            circleToTickTimeout = window.setTimeout(() => {
                setAnimationState('tick');
            }, mergedConfig.circleToTickTime);
            console.log("Timeout:::::::", circleToTickTimeout )

            // Hide popup after specified time
            hidePopupTimeout = window.setTimeout(() => {
                onFinish ? onFinish() : 1500;
            }, mergedConfig.hidePopupTime);
        }

        // Cleanup timeouts on unmount or when show changes
        return () => {
            if (circleToTickTimeout) clearTimeout(circleToTickTimeout);
            if (hidePopupTimeout) clearTimeout(hidePopupTimeout);
        };
    }, [show, mergedConfig.circleToTickTime, mergedConfig.hidePopupTime, onFinish]);

     if (!show) return (<div></div>) ;

    return (
        <div className={`bg-transparent ${mergedConfig.textColor} rounded flex items-center ml-auto`}>
            <div className="flex items-center">
                <div className="relative w-6 h-6">
                    {animationState === 'circle' && (
                        <svg className="w-6 h-6 animate-spin" viewBox="0 0 24 24">
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                    )}
                    {animationState === 'tick' && (
                        <svg
                            className="w-6 h-6 animate-bounce"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    )}
                </div>
                <span className="ml-2">{mergedConfig.message}</span>
            </div>
        </div>
    );
};