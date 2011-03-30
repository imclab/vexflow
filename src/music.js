// VexFlow - Music Engraving for HTML5
// Copyright Mohit Muthanna 2010
//
// This class implements some standard music theory routines.
//
// requires: vex.js

/**
 * @constructor
 */
Vex.Flow.Music = function() {
  this.init();
}

Vex.Flow.Music.NUM_TONES = 12;

Vex.Flow.Music.roots = [ "c", "d", "e", "f", "g", "a", "b" ];

Vex.Flow.Music.canonical_notes = [
  "c", "c#", "d", "d#",
  "e", "f", "f#", "g",
  "g#", "a", "a#", "b"
];

Vex.Flow.Music.diatonic_intervals = [
  "unison", "m2", "M2", "m3", "M3",
  "p4", "dim5", "p5", "aug5", "M6",
  "b7", "M7", "octave"
];

Vex.Flow.Music.intervals = {
  "u":  0, "unison": 0,
  "m2": 1, "b2": 1, "min2": 1, "S": 1, "H": 1,
  "2": 2, "M2": 2, "maj2": 2, "T": 2, "W": 2,
  "m3": 3, "b3": 3, "min3": 3,
  "M3": 4, "3": 4, "maj3": 4,
  "4":  5, "p4":  5,
  "#4": 6, "b5": 6, "aug4": 6, "dim5": 6,
  "5":  7, "p5":  7,
  "#5": 8, "b6": 8, "aug5": 8,
  "6":  9, "M6":  9, "maj6": 9,
  "b7": 10, "m7": 10, "min7": 10, "dom7": 10,
  "M7": 11, "maj7": 11,
  "8": 12, "octave": 12
};

Vex.Flow.Music.scales = {
  major: [2, 2, 1, 2, 2, 2, 1],
  dorian: [2, 1, 2, 2, 2, 1, 2]
};

Vex.Flow.Music.accidentals = [ "bb", "b", "n", "#", "##" ];

Vex.Flow.Music.noteValues = {
  'c':   { root_index: 0, int_val: 0 },
  'cn':  { root_index: 0, int_val: 0 },
  'c#':  { root_index: 0, int_val: 1 },
  'c##': { root_index: 0, int_val: 2 },
  'cb':  { root_index: 0, int_val: -1 },
  'cbb': { root_index: 0, int_val: -2 },
  'd':   { root_index: 1, int_val: 2 },
  'dn':  { root_index: 1, int_val: 2 },
  'd#':  { root_index: 1, int_val: 3 },
  'd##': { root_index: 1, int_val: 4 },
  'db':  { root_index: 1, int_val: 1 },
  'dbb': { root_index: 1, int_val: 0 },
  'e':   { root_index: 2, int_val: 4 },
  'en':  { root_index: 2, int_val: 4 },
  'e#':  { root_index: 2, int_val: 5 },
  'e##': { root_index: 2, int_val: 6 },
  'eb':  { root_index: 2, int_val: 3 },
  'ebb': { root_index: 2, int_val: 2 },
  'f':   { root_index: 3, int_val: 5 },
  'fn':  { root_index: 3, int_val: 5 },
  'f#':  { root_index: 3, int_val: 6 },
  'f##': { root_index: 3, int_val: 7 },
  'fb':  { root_index: 3, int_val: 4 },
  'fbb': { root_index: 3, int_val: 3 },
  'g':   { root_index: 4, int_val: 7 },
  'gn':  { root_index: 4, int_val: 7 },
  'g#':  { root_index: 4, int_val: 8 },
  'g##': { root_index: 4, int_val: 9 },
  'gb':  { root_index: 4, int_val: 6 },
  'gbb': { root_index: 4, int_val: 5 },
  'a':   { root_index: 5, int_val: 9 },
  'an':  { root_index: 5, int_val: 9 },
  'a#':  { root_index: 5, int_val: 10 },
  'a##': { root_index: 5, int_val: 11 },
  'ab':  { root_index: 5, int_val: 8 },
  'abb': { root_index: 5, int_val: 7 },
  'b':   { root_index: 6, int_val: 11 },
  'bn':  { root_index: 6, int_val: 11 },
  'b#':  { root_index: 6, int_val: 12 },
  'b##': { root_index: 6, int_val: 13 },
  'bb':  { root_index: 6, int_val: 10 },
  'bbb': { root_index: 6, int_val: 9 }
};

Vex.Flow.Music.prototype.init = function() {}

Vex.Flow.Music.prototype.getNoteParts = function(noteString) {
  if (!noteString || noteString.length < 1)
    throw new Vex.RERR("BadArguments", "Invalid note name: " + noteString);

  if (noteString.length > 3)
    throw new Vex.RERR("BadArguments", "Invalid note name: " + noteString);

  var note = noteString.toLowerCase();

  var regex = /^([cdefgab])(b|bb|n|#|##)?$/;
  var match = regex.exec(note);

  if (match != null) {
    var root = match[1];
    var accidental = match[2];

    return {
      'root': root,
      'accidental': accidental,
    }
  } else {
    throw new Vex.RERR("BadArguments", "Invalid note name: " + noteString);
  }
}

Vex.Flow.Music.prototype.getNoteValue = function(noteString) {
  var value = Vex.Flow.Music.noteValues[noteString];
  if (value == null)
    throw new Vex.RERR("BadArguments", "Invalid note name: " + noteString);

  return value.int_val;
}

Vex.Flow.Music.prototype.getIntervalValue = function(intervalString) {
  var value = Vex.Flow.Music.intervals[intervalString];
  if (value == null)
    throw new Vex.RERR("BadArguments",
                       "Invalid interval name: " + intervalString);

  return value;
}

Vex.Flow.Music.prototype.getCanonicalNoteName = function(noteValue) {
  if (noteValue == null || noteValue < 0 ||
      noteValue > (Vex.Flow.Music.NUM_TONES - 1))
    throw new Vex.RERR("BadArguments",
                       "Invalid note value: " + noteValue);

  return Vex.Flow.Music.canonical_notes[noteValue];
}

Vex.Flow.Music.prototype.getCanonicalIntervalName = function(intervalValue) {
  if (intervalValue == null || intervalValue < 0 ||
      intervalValue > (Vex.Flow.Music.NUM_TONES - 1))
    throw new Vex.RERR("BadArguments",
                       "Invalid interval value: " + intervalValue);

  return Vex.Flow.Music.diatonic_intervals[intervalValue];
}

/* Given a note, interval, and interval direction, product the
 * relative note.
 */
Vex.Flow.Music.prototype.getRelativeNoteValue =
  function(noteValue, intervalValue, direction) {
  if (direction == null) direction = 1;
  if (direction != 1 && direction != -1)
    throw new Vex.RERR("BadArguments", "Invalid direction: " + direction);

  var sum = (noteValue + (direction * intervalValue)) %
    Vex.Flow.Music.NUM_TONES;
  if (sum < 0) sum += Vex.Flow.Music.NUM_TONES;

  return sum;
}

Vex.Flow.Music.prototype.getScaleTones = function(key, intervals) {
  var tones = [];
  tones.push(key);

  var nextNote = key;
  for (var i = 0; i < intervals.length; ++i) {
    nextNote = this.getRelativeNoteValue(nextNote,
                                         intervals[i]);
    tones.push(nextNote);
  }

  return tones;
}

/* Returns the interval of a note, given a diatonic scale.
 *
 * E.g., Given the scale C, and the note E, returns M3
 */
Vex.Flow.Music.prototype.getIntervalBetween = function(note1, note2) {
  var difference = note2 - note1;
  if (difference < 0) difference += Vex.Flow.Music.NUM_TONES;
  return difference;
}
