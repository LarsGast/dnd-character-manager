let a = 1;

switch (a) {
    case 1:
        console.log("one");
    case 2:
        console.log("two");
        break;
}

function fn(s) {
  // No error?
  console.log(s.subtr(3));
}
fn(42);

class Album {
  download() {
    // Default behavior
  }
}
 
class SharedAlbum extends Album {
  download() {
    // Override to get info from many sources
  }
}

function lookupHeadphonesManufacturer(color: "blue" | "black"): string {

  if (color === "blue") {
    return "beats";
  } else {
    ("bose");
  }
}

class Rectangle {
  width: number;
  height: number;
 
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
 
  getAreaFunction() {
    return function () {
      return this.width * this.height;

    };
  }
}

// @errors: 4111
declare function getSettings(): GameSettings;
// ---cut---
interface GameSettings {
  // Known up-front properties
  speed: "fast" | "medium" | "slow";
  quality: "high" | "low";

  // Assume anything unknown to the interface
  // is a string.
  [key: string]: string;
}

const settings = getSettings();
settings.speed;
//       ^?
settings.quality;
//       ^?

// Unknown key accessors are allowed on
// this object, and are `string`
settings.username;
//     

interface EnvironmentVars {
  NAME: string;
  OS: string;

  // Unknown properties are covered by this index signature.
  [propName: string]: string;
}

declare const env: EnvironmentVars;

// Declared as existing
const sysName = env.NAME;
const os = env.OS;
//    ^?

// Not declared, but because of the index
// signature, then it is considered a string
const nodeEnv = env.NODE_ENV;
//    ^?

const createKeyboard = (modelID: number) => {
  const defaultModelID = 23;

  return { type: "keyboard", modelID };
};

const createDefaultKeyboard = (modelID: number) => {

  const defaultModelID = 23;
  return { type: "keyboard", modelID: defaultModelID };
};

// With strictBindCallApply on
function fn2(x: string) {
  return parseInt(x);
}
 
const n1 = fn2.call(undefined, "10");
 
const n2 = fn2.call(undefined, false);

function fn3(x: string) {
  console.log("Hello, " + x.toLowerCase());
}
 
type StringOrNumberFunc = (ns: string | number) => void;
 
// Unsafe assignment
let func: StringOrNumberFunc = fn3;
// Unsafe call - will crash
func(10);

declare const loggedInUsername: string;
 
const users = [
  { name: "Oby", age: 12 },
  { name: "Heera", age: 32 },
];
 
const loggedInUser = users.find((u) => u.name === loggedInUsername);
console.log(loggedInUser.age);

class UserAccount {
  name: string;
  accountType = "user";
 
  email: string;

  address: string | undefined;
 
  constructor(name: string) {
    this.name = name;
    // Note that this.email is not set
  }
}

try {
  // ...
} catch (err) {
  // We have to verify err is an
  // error before using it as one.
  if (err instanceof Error) {
    console.log(err.message);
  }
}

import "oops-this-module-does-not-exist";