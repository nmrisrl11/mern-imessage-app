// audio setup
const keyStrokeSounds: HTMLAudioElement[] = [
	new Audio("/sounds/keystroke1.mp3"),
	new Audio("/sounds/keystroke2.mp3"),
	new Audio("/sounds/keystroke3.mp3"),
	new Audio("/sounds/keystroke4.mp3"),
];

interface UseKeyboardSoundReturn {
	playRandomKeyStrokeSound: () => void;
}

function useKeyboardSound(): UseKeyboardSoundReturn {
	const playRandomKeyStrokeSound = (): void => {
		const randomSound: HTMLAudioElement = keyStrokeSounds[Math.floor(Math.random() * keyStrokeSounds.length)];

		randomSound.currentTime = 0;

		randomSound.play().catch((error: unknown) => {
			if (error instanceof Error) {
				console.error("Audio play failed:", error.message);
			} else {
				console.error("Audio play failed:", error);
			}
		});
	};

	return { playRandomKeyStrokeSound };
}

export default useKeyboardSound;
