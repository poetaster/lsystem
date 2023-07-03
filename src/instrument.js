import * as Tone from 'tone';

export default function getAudioModel(scene) {
    const conga = new Tone.MembraneSynth({
			pitchDecay: 0.008,
			octaves: 2,
			envelope: {
				attack: 0.0006,
				decay: 0.3,
				sustain: 0
			}
    });
    conga.toDestination();

    const congaPart = new Tone.Sequence(((time, pitch) => {
		conga.triggerAttack(pitch, time, Math.random()*0.5 + 0.5);
    }), ["G3", "C4", "C4", "C4"], "4n");

    const bell = new Tone.MetalSynth({
            harmonicity: 12,           
            resonance: 800,            
            modulationIndex: 20,       
            envelope: { decay: 0.3, },                         
            volume: -15
    });

    bell.toDestination();
    const bellPart = new Tone.Sequence(((time, freq) => {        
      bell.triggerAttack(freq, time, Math.random()*0.5 + 0.5); 
            }), [[300, null, 200],                                       
                [null, 200, 200],                                        
                [null, 200, null],                                       
                [200, null, 200]                                         
            ], "4n");
    let model = {
        conga,
        congaPart,
        bell,
        bellPart,
    }
    return model;
}
