// Procedural Web Audio Ambient Sound Generator (Zero External Audio Files)

class AmbientSoundEngine {
  private ctx: AudioContext | null = null
  private masterGain: GainNode | null = null
  private windGain: GainNode | null = null
  private chordGain: GainNode | null = null
  private isPlaying: boolean = false
  private windSource: AudioBufferSourceNode | null = null
  private oscillators: OscillatorNode[] = []

  private initContext() {
    if (this.ctx) return
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    this.ctx = new AudioContextClass()

    this.masterGain = this.ctx.createGain()
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime)
    this.masterGain.connect(this.ctx.destination)

    this.setupWind()
    this.setupChords()
  }

  // Pink noise generator for organic wind breeze
  private setupWind() {
    if (!this.ctx || !this.masterGain) return

    const bufferSize = this.ctx.sampleRate * 4
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate)
    const output = buffer.getChannelData(0)

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      b0 = 0.99886 * b0 + white * 0.0555179
      b1 = 0.99332 * b1 + white * 0.0750759
      b2 = 0.96900 * b2 + white * 0.1538520
      b3 = 0.86650 * b3 + white * 0.3104856
      b4 = 0.55000 * b4 + white * 0.5329522
      b5 = -0.7616 * b5 - white * 0.0168980
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.03
      b6 = white * 0.115926
    }

    const filter = this.ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(280, this.ctx.currentTime)
    filter.Q.setValueAtTime(1.8, this.ctx.currentTime)

    // LFO to slowly modulate filter frequency for wind swells
    const lfo = this.ctx.createOscillator()
    const lfoGain = this.ctx.createGain()
    lfo.frequency.setValueAtTime(0.18, this.ctx.currentTime)
    lfoGain.gain.setValueAtTime(120, this.ctx.currentTime)
    lfo.connect(lfoGain)
    lfoGain.connect(filter.frequency)
    lfo.start()

    this.windGain = this.ctx.createGain()
    this.windGain.gain.setValueAtTime(0.45, this.ctx.currentTime)

    filter.connect(this.windGain)
    this.windGain.connect(this.masterGain)

    // Loop source buffer
    const playBuffer = () => {
      if (!this.ctx) return
      const src = this.ctx.createBufferSource()
      src.buffer = buffer
      src.loop = true
      src.connect(filter)
      src.start()
      this.windSource = src
    }

    playBuffer()
  }

  // Soft resonant harmonic drone chords (D minor / warm earth tones)
  private setupChords() {
    if (!this.ctx || !this.masterGain) return

    this.chordGain = this.ctx.createGain()
    this.chordGain.gain.setValueAtTime(0.12, this.ctx.currentTime)
    this.chordGain.connect(this.masterGain)

    // Frequencies: D2 (73.42Hz), A2 (110Hz), F3 (174.61Hz), C4 (261.63Hz)
    const freqs = [73.42, 110.0, 174.61, 261.63]

    freqs.forEach((freq, idx) => {
      if (!this.ctx || !this.chordGain) return
      const osc = this.ctx.createOscillator()
      const toneGain = this.ctx.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime)

      // Slight detune for natural warmth
      osc.detune.setValueAtTime((idx - 1.5) * 4, this.ctx.currentTime)

      const lfo = this.ctx.createOscillator()
      const lfoGain = this.ctx.createGain()
      lfo.frequency.setValueAtTime(0.08 + idx * 0.03, this.ctx.currentTime)
      lfoGain.gain.setValueAtTime(0.04, this.ctx.currentTime)
      lfo.connect(lfoGain)

      toneGain.gain.setValueAtTime(0.08, this.ctx.currentTime)
      lfoGain.connect(toneGain.gain)

      osc.connect(toneGain)
      toneGain.connect(this.chordGain)

      osc.start()
      lfo.start()
      this.oscillators.push(osc)
    })
  }

  public toggle(): boolean {
    if (!this.ctx) {
      this.initContext()
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume()
    }

    if (!this.masterGain || !this.ctx) return false

    const now = this.ctx.currentTime

    if (this.isPlaying) {
      // Fade out smoothly
      this.masterGain.gain.cancelScheduledValues(now)
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now)
      this.masterGain.gain.linearRampToValueAtTime(0, now + 1.2)
      this.isPlaying = false
    } else {
      // Fade in smoothly
      this.masterGain.gain.cancelScheduledValues(now)
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now)
      this.masterGain.gain.linearRampToValueAtTime(0.8, now + 1.8)
      this.isPlaying = true
    }

    return this.isPlaying
  }

  public getStatus(): boolean {
    return this.isPlaying
  }
}

let instance: AmbientSoundEngine | null = null

export function getAmbientSoundEngine(): AmbientSoundEngine {
  if (!instance && typeof window !== 'undefined') {
    instance = new AmbientSoundEngine()
  }
  return instance!
}

