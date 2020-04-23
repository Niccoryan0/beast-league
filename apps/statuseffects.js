function StatusEffect(name, type, duration = 1){
  this.name = name;
  this.type = type;
  this.duration = duration;
  this.tickTimer = 0;
}

// EVASION RATES ARE SET FOR EACH MONSTER AND CAN BE MODIFIED WITHIN METHODS


// Limited turn duration for each effect
// Duration 0 means permanent,
// We need a way to tick down this number each turn though, as well as max duration and "current tick timer", which counts up to reach max duration

